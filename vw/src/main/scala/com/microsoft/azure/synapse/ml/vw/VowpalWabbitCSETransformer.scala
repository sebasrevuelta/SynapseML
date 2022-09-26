package com.microsoft.azure.synapse.ml.vw

import com.microsoft.azure.synapse.ml.codegen.Wrappable
import com.microsoft.azure.synapse.ml.logging.BasicLogging
import com.microsoft.azure.synapse.ml.policyeval.PolicyEvalUDAFUtil
import org.apache.spark.ml.param.{FloatParam, ParamMap, StringArrayParam}
import org.apache.spark.ml.util.Identifiable
import org.apache.spark.ml.{ComplexParamsWritable, Transformer}
import org.apache.spark.sql.types.StructType
import org.apache.spark.sql.{Column, DataFrame, Dataset, functions => F, types => T}

/**
  * Emits continuous success ev? metrics for contextual bandit style predicitons and logs.
  */
class VowpalWabbitCSETransformer(override val uid: String)
  extends Transformer
    with BasicLogging
    with Wrappable
    with ComplexParamsWritable {

  import VowpalWabbitDSJsonTransformer._
  import VowpalWabbitCSETransformer._

  logClass()

  def this() = this(Identifiable.randomUID("VowpalWabbitEvalTransformer"))

  override def copy(extra: ParamMap): Transformer = defaultCopy(extra)

  val minImportanceWeight = new FloatParam(
    this, "dsJsonColumn", "Cap importance weight at this lower bound. Defaults to 0.")

  def getMinImportanceWeight: Float = $(minImportanceWeight)
  def getMinImportanceWeight(value: Float): this.type = set(minImportanceWeight, value)

  val maxImportanceWeight = new FloatParam(
    this, "dsJsonColumn", "Cap importance weight at this upper bound. Defaults to 100.")

  def getMaxImportanceWeight: Float = $(maxImportanceWeight)
  def getMaxImportanceWeight(value: Float): this.type = set(maxImportanceWeight, value)

  val metricsStratificationCols = new StringArrayParam(
    this, "metricsStratificationCols", "Optional list of column names to stratify rewards by.")

  def getMetricsStratificationCols: Array[String] = $(metricsStratificationCols)
  def getMetricsStratificationCols(value: Array[String]): this.type = set(metricsStratificationCols, value)

  setDefault(minImportanceWeight -> 0, maxImportanceWeight -> 100, metricsStratificationCols -> Array.empty)

  // define reward independent metrics
  val globalMetrics: Seq[Column] = Seq(
    F.count("*").alias(ExampleCountName),
    F.sum(F.when(F.expr(s"$ProbabilityPredictedColName > 0"), 1).otherwise(0))
      .alias(ProbabilityPredictedNonZeroCount),
    F.min("w").alias(MinimumImportanceWeight),
    F.max("w").alias(MaximumImportanceWeight),
    F.expr("avg(w)").alias(AverageImportanceWeight),
    F.expr("avg(w * w)").alias(AverageSquaredImportanceWeight),
    F.expr("max(w)/count(*)").alias(PropOfMaximumImportanceWeight),
    F.expr("approx_percentile(w, array(0.25, 0.5, 0.75, 0.95))")
      .alias(ImportanceWeightQuantiles))

  case class RewardColumn(name: String, col: String, idx: Int) {
    def minRewardCol: String = s"min_reward_$idx"

    def maxRewardCol: String = s"max_reward_$idx"
  }

  def rewardColumns(schema: T.StructType): Seq[RewardColumn] =
    schema(RewardsColName)
      .dataType.asInstanceOf[T.StructType]
      .fields
      .zipWithIndex
      .map({ case (rewardField, idx) =>
        RewardColumn(rewardField.name, s"$RewardsColName.${rewardField.name}", idx)
      })
      .toSeq


  def perRewardMetrics(rewardsCol: Seq[RewardColumn],
                       minImportanceWeight: Float = 0,
                       maxImportanceWeight: Float = 100): Seq[Column] =
    rewardsCol
      .map({ rewardCol => {
        F.struct(
          F.first(F.col(rewardCol.minRewardCol)).alias(MinReward),
          F.first(F.col(rewardCol.maxRewardCol)).alias(MaxReward),
          F.expr(s"snips($ProbabilityLoggedColName, ${rewardCol.col}, $ProbabilityPredictedColName, count)")
            .alias(Snips),
          F.expr(s"ips($ProbabilityLoggedColName, ${rewardCol.col}, $ProbabilityPredictedColName, count)")
            .alias(Ips),
          F.expr(s"cressieRead($ProbabilityLoggedColName, ${rewardCol.col}, $ProbabilityPredictedColName, count, " +
            s"$minImportanceWeight, $maxImportanceWeight)")
            .alias(CressieRead),
          F.expr(s"cressieReadInterval($ProbabilityLoggedColName, ${rewardCol.col}, " +
            s"$ProbabilityPredictedColName, count, " +
            s"$minImportanceWeight, $maxImportanceWeight, ${rewardCol.minRewardCol}, ${rewardCol.maxRewardCol})")
            .alias(CressieReadInterval),
          F.expr(s"cressieReadIntervalEmpirical($ProbabilityLoggedColName, ${rewardCol.col}, " +
            s"$ProbabilityPredictedColName, count, " +
            s"$minImportanceWeight, $maxImportanceWeight, ${rewardCol.minRewardCol}, ${rewardCol.maxRewardCol})")
            .alias(CressieReadIntervalEmp)
        ).alias(rewardCol.name)
      }
      })

  override def transform(dataset: Dataset[_]): DataFrame = {
    logTransform[DataFrame]({
      val df = dataset.toDF

      // fetch reward columns out of nested structured
      val rewardsCol = rewardColumns(df.schema)

      // calculate min/max for each reward
      val minMaxes = rewardsCol
        .flatMap({ rewardCol =>
          Seq(F.min(rewardCol.col).alias(rewardCol.minRewardCol),
            F.max(rewardCol.col).alias(rewardCol.maxRewardCol))
        })

      val minMaxRewards = df.agg(minMaxes.head, minMaxes.drop(1): _*)

      // register contextual bandit policy evaluation aggregates
      PolicyEvalUDAFUtil.registerUdafs()

      val metrics = globalMetrics ++ perRewardMetrics(rewardsCol, getMinImportanceWeight, getMaxImportanceWeight)

      df.crossJoin(minMaxRewards.hint("broadcast"))
        // probability predicted = 1 if top action matches observed action, otherwise 0
        // Note: using the probability distribution produces by cb_adf_explore only increases variance
        // and doesn't help model selection. also the offline policy can't influence what data is getting
        // collected offline
        .withColumn(ProbabilityPredictedColName,
          F.when(F.expr(s"element_at(predictions, 1).action == $ChosenActionIndexColName"), 1f)
            .otherwise(0f))
        // example weight, defaults to 1
        .withColumn("count", F.lit(1))
        .withColumn("w", F.col(ProbabilityPredictedColName) / F.col(ProbabilityLoggedColName))
        // optional stratification
        .groupBy(getMetricsStratificationCols.map(F.col): _*)
        .agg(metrics.head, metrics.drop(1): _*)
    })
  }

  override def transformSchema(schema: StructType): StructType =
    T.StructType(
      // groupBy
      getMetricsStratificationCols.map(T.StructField(_, T.StringType, true)) ++
      Seq(
        // global metrics
        T.StructField(ExampleCountName, T.IntegerType, false),
        T.StructField(ProbabilityPredictedNonZeroCount, T.LongType, false),
        T.StructField(MinimumImportanceWeight, T.DoubleType, false),
        T.StructField(MaximumImportanceWeight, T.DoubleType, false),
        T.StructField(AverageImportanceWeight, T.DoubleType, false),
        T.StructField(AverageSquaredImportanceWeight, T.DoubleType, false),
        T.StructField(PropOfMaximumImportanceWeight, T.DoubleType, false),
        T.StructField(ImportanceWeightQuantiles, T.ArrayType(T.FloatType, false), false),
      ) ++
      // perRewardMetric
      schema(RewardsColName).dataType.asInstanceOf[T.StructType].fields.map { f =>
        T.StructField(f.name,
          T.StructType(Seq(
            T.StructField(MinReward, T.FloatType, false),
            T.StructField(MaxReward, T.FloatType, false),
            T.StructField(Snips, T.FloatType, false),
            T.StructField(Ips, T.FloatType, false),
            T.StructField(Snips, T.FloatType, false),
            T.StructField(CressieRead, T.DoubleType, false),
            T.StructField(CressieReadInterval,
              T.StructType(Seq(
                T.StructField("lower", T.DoubleType, false),
                T.StructField("upper", T.DoubleType, false),
              )),
              true),
            T.StructField(CressieReadIntervalEmp,
              T.StructType(Seq(
                T.StructField("lower", T.DoubleType, false),
                T.StructField("upper", T.DoubleType, false),
              )),
              true)
          )),
          false)
      }
    )
}

object VowpalWabbitCSETransformer {
  val ExampleCountName = "exampleCount"
  val ProbabilityPredictedNonZeroCount = "probPredNonZeroCount"
  val MinimumImportanceWeight = "minimumImportanceWeight"
  val MaximumImportanceWeight = "maximumImportanceWeight"
  val AverageImportanceWeight = "averageImportanceWeight"
  val AverageSquaredImportanceWeight = "averageSquaredImportanceWeight"
  val PropOfMaximumImportanceWeight = "proportionOfMaximumImportanceWeight"
  val ImportanceWeightQuantiles = "importance weight quantiles (0.25, 0.5, 0.75, 0.95)"

  val MinReward = "minReward"
  val MaxReward = "maxReward"
  val Snips = "snips"
  val Ips = "ips"
  val CressieRead = "cressieRead"
  val CressieReadInterval = "cressieReadInterval"
  val CressieReadIntervalEmp = "cressieReadIntervalEmpirical"
}