package com.microsoft.ml.spark.explainers

import breeze.stats.distributions.RandBasis
import com.microsoft.ml.spark.io.image.ImageUtils
import com.microsoft.ml.spark.lime.{HasCellSize, HasModifier}
import org.apache.spark.injections.UDFUtils
import org.apache.spark.ml.image.ImageSchema
import org.apache.spark.ml.linalg.SQLDataTypes
import org.apache.spark.ml.param.Param
import org.apache.spark.ml.param.shared.HasInputCol
import org.apache.spark.ml.util.Identifiable
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.{col, explode}
import org.apache.spark.sql.types.{ArrayType, DoubleType, StructField, StructType}

trait ImageLIMEParams extends LIMEParams with HasCellSize with HasModifier with HasSamplingFraction with HasInputCol {
  self: ImageLIME =>

  val superpixelCol = new Param[String](this, "superpixelCol", "The column holding the superpixel decompositions")

  def getSuperpixelCol: String = $(superpixelCol)

  def setSuperpixelCol(v: String): this.type = set(superpixelCol, v)

  def setInputCol(value: String): this.type = this.set(inputCol, value)

  setDefault(numSamples -> 900, cellSize -> 16, modifier -> 130, regularization -> 0.0,
    samplingFraction -> 0.3, superpixelCol -> "superpixels")
}

class ImageLIME(override val uid: String)
  extends LIMEBase(uid) with ImageLIMEParams {

  def this() = {
    this(Identifiable.randomUID("ImageLIME"))
  }

  override protected def createSamples(df: DataFrame,
                                       featureStats: Seq[FeatureStats[_, _]],
                                       idCol: String,
                                       featureCol: String,
                                       distanceCol: String
                                      ): DataFrame = {

    val numSamples = this.getNumSamples

    val sampler = featureStats.head.asInstanceOf[ImageFeatureSampler]

    val sampleType = ArrayType(
      StructType(Seq(
        StructField("sample", ImageSchema.columnSchema),
        StructField("feature", SQLDataTypes.VectorType),
        StructField("distance", DoubleType)
      ))
    )

    val samplesUdf = UDFUtils.oldUdf(
      {
        image: ImageFormat =>
          implicit val randBasis: RandBasis = RandBasis.mt0
          (1 to numSamples).map(_ => sampler.sample(image))
      },
      sampleType
    )

    df.withColumn("samples", explode(samplesUdf(col(getInputCol))))
      .select(
        col(idCol),
        col("samples.distance").alias(distanceCol),
        col("samples.feature").alias(featureCol),
        col("samples.sample").alias(getInputCol)
      )
  }

  override protected def createFeatureStats(df: DataFrame): Seq[FeatureStats[_, _]] = {
    Seq(
      ImageFeature(this.getCellSize, this.getModifier, this.getSamplingFraction)
    )
  }
}
