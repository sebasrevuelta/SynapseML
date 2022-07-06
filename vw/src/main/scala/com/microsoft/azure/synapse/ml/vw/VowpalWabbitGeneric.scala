package com.microsoft.azure.synapse.ml.vw

import com.microsoft.azure.synapse.ml.codegen.Wrappable
import com.microsoft.azure.synapse.ml.logging.BasicLogging

import reflect.runtime.universe.TypeTag
import org.apache.spark.ml.{ComplexParamsReadable, ComplexParamsWritable, Estimator, Model}
import org.apache.spark.ml.param.{Param, ParamMap, Params}
import org.apache.spark.ml.util.Identifiable
import org.apache.spark.sql.{DataFrame, Dataset, Encoders, Row}
import org.apache.spark.sql.types.{ArrayType, FloatType, IntegerType, StringType, StructField, StructType}
import org.vowpalwabbit.spark.prediction.ScalarPrediction
import vowpalWabbit.responses.{ActionProbs, ActionScores, DecisionScores, Multilabels, PDF, PDFValue}

import java.io.Serializable

trait HasInputCol extends Params {
  val inputCol = new Param[String](this, "inputCol", "The name of the input column")
  def setInputCol(value: String): this.type = set(inputCol, value)
  def getInputCol: String = $(inputCol)
}

class VowpalWabbitGeneric(override val uid: String) extends Estimator[VowpalWabbitGenericModel]
  with VowpalWabbitBase
  with HasInputCol
  with BasicLogging {
  logClass()

  override protected lazy val pyInternalWrapper = true

  def this() = this(Identifiable.randomUID("VowpalWabbitGeneric"))

  setDefault(inputCol -> "input")

  override def copy(extra: ParamMap): this.type = defaultCopy(extra)

  protected def getInputColumns(): Seq[String] = Seq(getInputCol)

  protected def trainRow(schema: StructType,
                         inputRows: Iterator[Row],
                         ctx: TrainContext
                        ): Unit = {

    val featureIdx = schema.fieldIndex(getInputCol)

    // learn from all rows
    for (row <- inputRows) {
      // ingestion and learning is collapsed
      // TODO: should we also measure here?
      //  ctx.nativeIngestTime.measure {
      ctx.learnTime.measure {
        ctx.vw.learnFromString(row.getString(featureIdx))
      }
    }
  }

  def fit(dataset: org.apache.spark.sql.Dataset[_]): VowpalWabbitGenericModel = {
    // TODO: copied from predictor. should we merge train in here?
    copyValues(train(dataset)
      .setParent(this))
  }

  def transformSchema(schema: StructType): StructType = {
    // validate the input column is here
    // TODO: is this the right way of doing it?
    schema.fieldIndex(getInputCol)

    schema
  }

  protected def train(dataset: Dataset[_]): VowpalWabbitGenericModel = {
    logTrain({
      val model = new VowpalWabbitGenericModel(uid)
        .setInputCol(getInputCol)

      trainInternal(dataset.toDF, model)
    })
  }
}

object VowpalWabbitGeneric extends ComplexParamsReadable[VowpalWabbitGeneric]

class VowpalWabbitGenericModel(override val uid: String)
  extends Model[VowpalWabbitGenericModel]
    with VowpalWabbitBaseModel
    with HasInputCol
    with ComplexParamsWritable with Wrappable with BasicLogging {
  logClass()

  override protected lazy val pyInternalWrapper = true

  def this() = this(Identifiable.randomUID("VowpalWabbitGenericModel"))

  override def copy(extra: ParamMap): this.type = defaultCopy(extra)

  private def schemaForPredictionType(): StructType = {
    val fields = vw.getOutputPredictionType match {
      case "prediction_type_t::scalars" => Seq(StructField("predictions", ArrayType(FloatType), false))
      case "prediction_type_t::multiclass" => Seq(StructField("prediction", IntegerType, false))
      case "prediction_type_t::prob"=> Seq(StructField("prediction", FloatType, false))
      case "prediction_type_t::multilabels" => Seq(StructField("prediction", ArrayType(IntegerType), false))
      case "prediction_type_t::scalar" => Seq(
        StructField("prediction", FloatType, false),
          StructField("confidence", FloatType, false))
      case "prediction_type_t::action_scores" => Seq(
        StructField("predictions", ArrayType(StructType(Seq(
          StructField("action", IntegerType, false),
          StructField("score", FloatType, false)
        ))))
      )
      case "prediction_type_t::action_probs" => Seq(
        StructField("predictions", ArrayType(StructType(Seq(
          StructField("action", IntegerType, false),
          StructField("probability", FloatType, false)
        ))))
      )
      case "prediction_type_t::decision_probs" => Seq(
        StructField("predictions",
          ArrayType(
            ArrayType(
              StructType(Seq(
                StructField("action", IntegerType, false),
                StructField("score", FloatType, false)
              ))))))
      case "prediction_type_t::action_pdf_value" => Seq(
        StructField("action", FloatType, false),
        StructField("pdf", FloatType, false)
      )
      case "prediction_type_t::pdf" => Seq(
        StructField("segments", ArrayType(
          StructType(Seq(
              StructField("left", FloatType, false),
              StructField("right", FloatType, false),
              StructField("pdfValue", FloatType, false)
            )))))

      case x => throw new NotImplementedError(s"Prediction type '${x}' not supported")
      // TODO: the java wrapper would have to support them too
      // CASE(prediction_type_t::multiclassprobs)
      // CASE(prediction_type_t::active_multiclass)
      // CASE(prediction_type_t::nopred)
    }

    // always return the the input column
    StructType(StructField(getInputCol, StringType, false) +: fields)
  }

  private class PredictTuple(df: DataFrame) extends Serializable {
    // fancy signature needed to make sure the right Encoder is automatically found
    def predict[T <: Product: TypeTag, S](predictionToTuple: (String, S) => T): DataFrame = {
      import df.sparkSession.implicits._

      val inputColIdx = df.schema.fieldIndex(getInputCol)

      df.mapPartitions(inputRows => {
        inputRows.map { row => {
          val input = row.getString(inputColIdx)
          predictionToTuple(input, vw.predictFromString(input).asInstanceOf[S])
        }}
      })
      .toDF(schemaForPredictionType().fields.map(_.name): _*)
    }
  }

  private implicit def dataFrameToPredictTuple(df: DataFrame) = new PredictTuple(df)

  override def transform(dataset: Dataset[_]): DataFrame = {
    // this is doing predict, but lightgbm also logs logTransform in the model...
    logTransform {
      val df = dataset.toDF()

      vw.getOutputPredictionType match {
        case "prediction_type_t::scalar" =>
          df.predict((input, pred: ScalarPrediction) => (input, pred.getValue, pred.getConfidence))
        case "prediction_type_t::scalars" =>
          df.predict((input, pred: Array[java.lang.Float]) => (input, pred))
        case "prediction_type_t::action_scores" =>
          df.predict((input, pred: ActionScores) =>
            (input, pred.getActionScores.map({ a_s => (a_s.getAction, a_s.getScore) })))
        case "prediction_type_t::action_probs" =>
          df.predict((input, pred: ActionProbs) =>
            (input, pred.getActionProbs.map { a_s => (a_s.getAction, a_s.getProbability) }))
        case "prediction_type_t::decision_probs" =>
          df.predict((input, pred: DecisionScores) => (input,
            pred.getDecisionScores.map({ ds => {
              ds.getActionScores.map { a_s => (a_s.getAction, a_s.getScore) }
            }
            })))
        case "prediction_type_t::multilabels" =>
          df.predict((input, pred: Multilabels) => (input, pred.getLabels))
        case "prediction_type_t::multiclass" =>
          df.predict((input, pred: java.lang.Integer) => (input, pred.toInt))
        case "prediction_type_t::prob" =>
          df.predict((input, pred: java.lang.Float) => (input, pred.toFloat))
        case "prediction_type_t::action_pdf_value" =>
          df.predict((input, pred: PDFValue) => (input, pred.getAction, pred.getPDFValue))
        case "prediction_type_t::pdf" =>
          df.predict((input, pred: PDF) => (input,
            pred.getPDFSegments.map { s => (s.getLeft, s.getRight, s.getPDFValue) }))
        case x => throw new NotImplementedError(s"Prediction type '${x}' not supported")
        // TODO: the java wrapper would have to support them too
        // CASE(prediction_type_t::pdf)
        // CASE(prediction_type_t::multiclassprobs)
        // CASE(prediction_type_t::action_pdf_value)
        // CASE(prediction_type_t::active_multiclass)
        // CASE(prediction_type_t::nopred)
      }
    }
  }

  override def transformSchema(schema: StructType): StructType = {
    // validate the inputCol is present
    // TODO: is this the right way of doing it?
    schema.fieldIndex(getInputCol)

    StructType(schemaForPredictionType)
  }
}

object VowpalWabbitGenericModel extends ComplexParamsReadable[VowpalWabbitGenericModel]
