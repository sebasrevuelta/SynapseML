package com.microsoft.azure.synapse.ml.causal

import org.apache.spark.ml.util.Identifiable
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.IntegerType
import org.apache.spark.sql.{Dataset, Row}

class SyntheticControlEstimator(override val uid: String)
  extends BaseDiffInDiffEstimator(uid)
    with SyntheticEstimator
    with DiffInDiffEstimatorParams
    with SyntheticEstimatorParams {

  import SyntheticEstimator._

  def this() = this(Identifiable.randomUID("sc"))

  override def fit(dataset: Dataset[_]): DiffInDiffModel = {
    val df = dataset.toDF
    val controlDf = df.filter(not(treatment)).cache
    val preDf = df.filter(not(postTreatment)).cache
    val controlPreDf = controlDf.filter(not(postTreatment)).cache
    val timeIdx = createIndex(controlPreDf, getTimeCol, TimeIdxCol).cache
    val unitIdx = createIndex(controlPreDf, getUnitCol, UnitIdxCol).cache

    // indexing
    val indexedPreDf = preDf.join(timeIdx, preDf(getTimeCol) === timeIdx(getTimeCol), "left_outer")
      .join(unitIdx, preDf(getUnitCol) === unitIdx(getUnitCol), "left_outer")
      .select(UnitIdxCol, TimeIdxCol, getTreatmentCol, getPostTreatmentCol, getOutcomeCol)
      .localCheckpoint(true)

    val (unitWeights, unitIntercept) = fitUnitWeights(
      handleMissingOutcomes(indexedPreDf, timeIdx.count.toInt),
      zeta = 0d,
      fitIntercept = false,
      seed = 47
    )

    // join weights
    val Row(_: Long, u: Long) = df.agg(
      countDistinct(when(postTreatment, col(getTimeCol))),
      countDistinct(when(treatment, col(getUnitCol))),
    ).head

    val indexedDf = df.join(unitIdx, df(getUnitCol) === unitIdx(getUnitCol), "left_outer")

    val didData = indexedDf.select(
        col(UnitIdxCol),
        postTreatment.cast(IntegerType).as(getPostTreatmentCol),
        treatment.cast(IntegerType).as(getTreatmentCol),
        outcome
      ).as("l")
      .join(unitWeights.as("u"), col(s"l.$UnitIdxCol") === col("u.i"), "left_outer")
      .select(
        postTreatment,
        treatment,
        outcome,
        (
          coalesce(col("u.value"), lit(1d / u)) + // unit weights
            lit(epsilon) // avoid zero weights
          ).as(weightsCol),
        (treatment * postTreatment).as(interactionCol)
      )

    val linearModel = fitLinearModel(didData, Some(weightsCol))

    val treatmentEffect = linearModel.coefficients(2)
    val standardError = linearModel.summary.coefficientStandardErrors(2)

    val summary = DiffInDiffSummary(
      treatmentEffect,
      standardError,
      None,
      None,
      Some(unitWeights),
      Some(unitIntercept)
    )

    val model = new DiffInDiffModel(this.uid, summary).setParent(this)
    copyValues(model)
  }
}
