package com.microsoft.azure.synapse.ml.causal

import com.microsoft.azure.synapse.ml.codegen.Wrappable
import org.apache.spark.ml.{ComplexParamsReadable, ComplexParamsWritable}
import org.apache.spark.ml.util.Identifiable
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.{BooleanType, IntegerType}
import org.apache.spark.sql.{Dataset, Row}

class SyntheticDiffInDiffEstimator(override val uid: String)
  extends BaseDiffInDiffEstimator(uid)
    with SyntheticEstimator
    with SyntheticEstimatorParams
    with ComplexParamsWritable
    with Wrappable {

  logClass()

  import SyntheticEstimator._

  def this() = this(Identifiable.randomUID("syndid"))

  override def fit(dataset: Dataset[_]): DiffInDiffModel = logFit({
    val df = dataset
      .withColumn(getTreatmentCol, treatment.cast(BooleanType))
      .withColumn(getPostTreatmentCol, postTreatment.cast(BooleanType))
      .toDF
    val controlDf = df.filter(not(treatment)).cache
    val preDf = df.filter(not(postTreatment)).cache
    val timeIdx = createIndex(preDf, getTimeCol, TimeIdxCol).cache
    timeIdx.show(100, false)
    val unitIdx = createIndex(controlDf, getUnitCol, UnitIdxCol).cache
    unitIdx.show(100, false)
    val size = (unitIdx.count, timeIdx.count)

    // indexing
    val indexedControlDf = controlDf.join(timeIdx, controlDf(getTimeCol) === timeIdx(getTimeCol), "left_outer")
      .join(unitIdx, controlDf(getUnitCol) === unitIdx(getUnitCol), "left_outer")
      .select(UnitIdxCol, TimeIdxCol, getTreatmentCol, getPostTreatmentCol, getOutcomeCol)
      .localCheckpoint(true)

    val indexedPreDf = preDf.join(timeIdx, preDf(getTimeCol) === timeIdx(getTimeCol), "left_outer")
      .join(unitIdx, preDf(getUnitCol) === unitIdx(getUnitCol), "left_outer")
      .select(UnitIdxCol, TimeIdxCol, getTreatmentCol, getPostTreatmentCol, getOutcomeCol)
      .localCheckpoint(true)

    // fit time weights

    val (timeWeights, timeIntercept, lossHistoryTimeWeights) = fitTimeWeights(
      handleMissingOutcomes(indexedControlDf, timeIdx.count.toInt), size
    )

    // fit unit weights
    val zeta = calculateRegularization(df)
    val (unitWeights, unitIntercept, lossHistoryUnitWeights) = fitUnitWeights(
      handleMissingOutcomes(indexedPreDf, timeIdx.count.toInt),
      zeta,
      fitIntercept = true,
      size.swap
    )

    // join weights
    val Row(t: Long, u: Long) = df.agg(
      countDistinct(when(postTreatment, col(getTimeCol))),
      countDistinct(when(treatment, col(getUnitCol))),
    ).head

    val indexedDf = df.join(timeIdx, df(getTimeCol) === timeIdx(getTimeCol), "left_outer")
      .join(unitIdx, df(getUnitCol) === unitIdx(getUnitCol), "left_outer")

    val didData = indexedDf.select(
        col(UnitIdxCol),
        col(TimeIdxCol),
        postTreatment.cast(IntegerType).as(getPostTreatmentCol),
        treatment.cast(IntegerType).as(getTreatmentCol),
        outcome
      ).as("l")
      .join(timeWeights.as("t"), col(s"l.$TimeIdxCol") === col("t.i"), "left_outer")
      .join(unitWeights.as("u"), col(s"l.$UnitIdxCol") === col("u.i"), "left_outer")
      .select(
        postTreatment,
        treatment,
        outcome,
        (
          coalesce(col("t.value"), lit(1d / t)) * // time weights
            coalesce(col("u.value"), lit(1d / u)) + // unit weights
            lit(epsilon) // avoid zero weights
          ).as(weightsCol),
        (treatment * postTreatment).as(interactionCol)
      )

    val linearModel = fitLinearModel(
      didData,
      Array(getPostTreatmentCol, getTreatmentCol, interactionCol),
      fitIntercept = true,
      Some(weightsCol)
    )

    val treatmentEffect = linearModel.coefficients(2)
    val standardError = linearModel.summary.coefficientStandardErrors(2)

    val summary = DiffInDiffSummary(
      treatmentEffect,
      standardError,
      timeWeights = Some(timeWeights),
      timeIntercept = Some(timeIntercept),
      unitWeights = Some(unitWeights),
      unitIntercept = Some(unitIntercept),
      lossHistoryTimeWeights = Some(lossHistoryTimeWeights.toList),
      lossHistoryUnitWeights = Some(lossHistoryUnitWeights.toList)
    )

    copyValues(new DiffInDiffModel(this.uid))
      .setSummary(Some(summary))
      .setParent(this)
      .setTimeIndex(timeIdx)
      .setUnitIndex(unitIdx)
  }, dataset.columns.length)
}

object SyntheticDiffInDiffEstimator extends ComplexParamsReadable[SyntheticDiffInDiffEstimator]