package com.microsoft.ml.spark.cognitive
import com.azure.ai.textanalytics.models.{AssessmentSentiment, DetectLanguageInput, DocumentSentiment,
  SentenceSentiment, SentimentConfidenceScores, TargetSentiment, TextDocumentInput}
import com.azure.ai.textanalytics.{TextAnalyticsClient, TextAnalyticsClientBuilder}
import com.azure.core.credential.AzureKeyCredential
import com.microsoft.ml.spark.core.contracts.{HasConfidenceScoreCol, HasInputCol, HasOutputCol, HasTextCol, HasLangCol}
import com.microsoft.ml.spark.core.schema.{SparkBindings}
import com.microsoft.ml.spark.io.http.{HasErrorCol}
import com.microsoft.ml.spark.logging.BasicLogging
import org.apache.spark.ml.param.{ParamMap}
import org.apache.spark.ml.util.Identifiable._
import org.apache.spark.ml.{ComplexParamsReadable, ComplexParamsWritable, Transformer}
import org.apache.spark.sql.types.{DataTypes, StructType}
import org.apache.spark.sql.{DataFrame, Dataset, Row}
import com.azure.core.util.Context
import org.apache.spark.sql.catalyst.encoders.RowEncoder
import scala.collection.JavaConverters._

abstract class TextAnalyticsSDKBase[T](val textAnalyticsOptions: Option[TextAnalyticsRequestOptionsV4] = None)
  extends Transformer
    with HasInputCol with HasErrorCol
    with HasEndpoint with HasSubscriptionKey
    with HasTextCol with HasLangCol
    with HasOutputCol
    with ComplexParamsWritable with BasicLogging {

  protected def outputSchema: StructType

  val responseTypeBinding: SparkBindings[TAResponseV4[T]]

  def invokeTextAnalytics(text: Seq[String], lang: Seq[String]): TAResponseV4[T]

  protected lazy val textAnalyticsClient: TextAnalyticsClient =
    new TextAnalyticsClientBuilder()
      .credential(new AzureKeyCredential(getSubscriptionKey))
      .endpoint(getEndpoint)
      .buildClient()

  protected def transformTextRows(toRow: TAResponseV4[T] => Row)
                                 (rows: Iterator[Row]): Iterator[Row] = {
    rows.map { row =>
      val results = invokeTextAnalytics(getValue(row, text), getValue(row,lang))
      Row.fromSeq(row.toSeq ++ Seq(toRow(results))) // Adding a new column
    }}

  override def transform(dataset: Dataset[_]): DataFrame = {
    logTransform[DataFrame]({
      val df = dataset.toDF
      val schema = dataset.schema
      val enc = RowEncoder(df.schema.add(getOutputCol, responseTypeBinding.schema))
      val toRow = responseTypeBinding.makeToRowConverter
      df.mapPartitions(transformTextRows(
        toRow,
      ))(enc)
    })
  }

  override def transformSchema(schema: StructType): StructType = {
    // Validate input schema
    val inputType = schema($(inputCol)).dataType
    require(inputType.equals(DataTypes.StringType), s"The input column must be of type String, but got $inputType")
    schema.add(getOutputCol, outputSchema)
  }

  override def copy(extra: ParamMap): Transformer = defaultCopy(extra)
}

object TextAnalyticsLanguageDetection extends ComplexParamsReadable[TextAnalyticsLanguageDetection]
class TextAnalyticsLanguageDetection(override val textAnalyticsOptions: Option[TextAnalyticsRequestOptionsV4] = None,
                                     override val uid: String = randomUID("TextAnalyticsLanguageDetection"))
  extends TextAnalyticsSDKBase[DetectedLanguageV4](textAnalyticsOptions)
    with HasConfidenceScoreCol {
  logClass()

  override def outputSchema: StructType = DetectLanguageResponseV4.schema

  override val responseTypeBinding: SparkBindings[TAResponseV4[DetectedLanguageV4]] = DetectLanguageResponseV4

  override def invokeTextAnalytics(input: Seq[String], hints: Seq[String]): TAResponseV4[DetectedLanguageV4] = {
    val r = scala.util.Random
    var docs = (input, hints).zipped.map { (inp, hint) =>
      new DetectLanguageInput(r.nextInt.abs.toString, inp, hint)}.asJava

    val resultCollection = textAnalyticsClient.detectLanguageBatchWithResponse(docs,
      null,Context.NONE).getValue

    val detectLanguageResultCollection = resultCollection.asScala

    val languageResult = detectLanguageResultCollection.map(result =>
      if (result.isError) {
        None
      } else {
      Some(DetectedLanguageV4(result.getPrimaryLanguage.getName, result.getPrimaryLanguage.getIso6391Name,
        result.getPrimaryLanguage.getConfidenceScore))
      }).filter(_ != None).toList


    val error = detectLanguageResultCollection.map(result =>
      if (result.isError) {
      Some(TAErrorV4(result.getError.toString, result.getError.getMessage,
        result.getError.getTarget))
    } else {
      None
    }).filter(_ != None).toList

    val stats = detectLanguageResultCollection.map(result => Option(result.getStatistics) match {
      case Some(s) => Some(DocumentStatistics(s.getCharacterCount, s.getTransactionCount))
      case None => None
    }).filter(_ != None).toList

    TAResponseV4[DetectedLanguageV4](
      languageResult,
      error,
      stats,
      Some(resultCollection.getModelVersion))
  }
}

object TextAnalyticsKeyphraseExtraction extends ComplexParamsReadable[TextAnalyticsKeyphraseExtraction]
class TextAnalyticsKeyphraseExtraction (override val textAnalyticsOptions: Option[TextAnalyticsRequestOptionsV4] = None,
                                        override val uid: String = randomUID("TextAnalyticsKeyphraseExtraction"))
  extends TextAnalyticsSDKBase[KeyphraseV4](textAnalyticsOptions) {
  logClass()

  override val responseTypeBinding: SparkBindings[TAResponseV4[KeyphraseV4]]
  = KeyPhraseResponseV4

  override def invokeTextAnalytics(input: Seq[String], lang: Seq[String]): TAResponseV4[KeyphraseV4] = {
    val r = scala.util.Random
    var docs = (input, lang).zipped.map { (inp, la) =>
      new TextDocumentInput(r.nextInt.abs.toString,inp).setLanguage(la)}.asJava

    val resultCollection = textAnalyticsClient.extractKeyPhrasesBatchWithResponse(docs,
      null,Context.NONE).getValue

    val keyPhraseExtractionResultCollection = resultCollection.asScala

    val keyphraseResult = keyPhraseExtractionResultCollection.map (phrases => if (phrases.isError) {
      None
    } else {
      Some(KeyphraseV4(
        phrases.getKeyPhrases.asScala.toList,
        phrases.getKeyPhrases.getWarnings.asScala.toList.map(
          item => TAWarningV4(item.getWarningCode.toString,item.getMessage))
        ))
    }).filter(_ != None).toList

    val error = keyPhraseExtractionResultCollection.map(phrases => if (phrases.isError) {
      Some(TAErrorV4(phrases.getError.getErrorCode.toString,
        phrases.getError.getMessage, phrases.getError.getTarget))
    } else {
      None
    }).filter(_ != None).toList

    val stats = keyPhraseExtractionResultCollection.map(phrases => Option(phrases.getStatistics) match {
      case Some(s) => Some(DocumentStatistics(s.getCharacterCount, s.getTransactionCount))
      case None => None
    }).filter(_ != None).toList

    TAResponseV4[KeyphraseV4](
      keyphraseResult,
      error,
      stats,
      Some(resultCollection.getModelVersion))
  }
  override def outputSchema: StructType = KeyPhraseResponseV4.schema
}

object TextSentimentV4 extends ComplexParamsReadable[TextSentimentV4]
class TextSentimentV4(override val textAnalyticsOptions: Option[TextAnalyticsRequestOptionsV4] = None,
                      override val uid: String = randomUID("TextSentimentV4"))
  extends TextAnalyticsSDKBase[SentimentScoredDocumentV4](textAnalyticsOptions)
    with HasConfidenceScoreCol {
  logClass()

  override val responseTypeBinding: SparkBindings[TAResponseV4[SentimentScoredDocumentV4]]
  = SentimentResponseV4
  override def invokeTextAnalytics(input: Seq[String], lang: Seq[String]):
  TAResponseV4[SentimentScoredDocumentV4] = {
    val r = scala.util.Random
    var docs = (input, lang).zipped.map { (inp, la) =>
      new TextDocumentInput(r.nextInt.abs.toString,inp).setLanguage(la)}.asJava

    val resultCollection = textAnalyticsClient.analyzeSentimentBatchWithResponse(docs,
      null,Context.NONE).getValue

    val textSentimentResultCollection = resultCollection.asScala

    def getConfidenceScore(score: SentimentConfidenceScores): SentimentConfidenceScoreV4 = {
      SentimentConfidenceScoreV4(
        score.getNegative,
        score.getNeutral,
        score.getPositive)
    }

    def getTarget(target: TargetSentiment): TargetV4 = {
      TargetV4(
        target.getText,
        target.getSentiment.toString,
        getConfidenceScore(target.getConfidenceScores),
        target.getOffset,
        target.getLength)
    }

    def getAssessment(assess: AssessmentSentiment): AssessmentV4 = {
      AssessmentV4(
        assess.getText,
        assess.getSentiment.toString,
        getConfidenceScore(assess.getConfidenceScores),
        assess.isNegated,
        assess.getOffset,
        assess.getLength)
    }

    def getSentenceSentiment(sentencesent: SentenceSentiment): SentimentSentenceV4 = {
      SentimentSentenceV4(
        sentencesent.getText,
        sentencesent.getSentiment.toString,
        getConfidenceScore(sentencesent.getConfidenceScores),
        Option(sentencesent.getOpinions).map(sentmap =>
          sentmap.asScala.toList.map(op =>
            OpinionV4(getTarget(op.getTarget)
              , op.getAssessments.asScala.toList.map(assessment =>
                getAssessment(assessment))))),
        sentencesent.getOffset,
        sentencesent.getLength)
    }

    def getDocumentSentiment(doc: DocumentSentiment): SentimentScoredDocumentV4 = {
      SentimentScoredDocumentV4(
        doc.getSentiment.toString,
        getConfidenceScore(doc.getConfidenceScores),
        doc.getSentences.asScala.toList.map(sentenceSentiment =>
          getSentenceSentiment(sentenceSentiment)),
        doc.getWarnings.asScala.toList.map(warnings =>
          WarningsV4(warnings.getMessage, warnings.getWarningCode.toString)))
    }

    val sentimentResult = textSentimentResultCollection.map(sentiment => if(sentiment.isError) {
      None
    } else {
      Some(getDocumentSentiment(sentiment.getDocumentSentiment))
    }).filter(_ != None).toList

    val error = textSentimentResultCollection.map(sentiment => if (sentiment.isError) {
      Some(TAErrorV4(sentiment.getError.getErrorCode.toString,
              sentiment.getError.getMessage, sentiment.getError.getTarget))
          } else {
            None
          }).filter(_ != None).toList

    val stats = textSentimentResultCollection.map(sentiment => Option(sentiment.getStatistics) match {
      case Some(s) => Some(DocumentStatistics(s.getCharacterCount, s.getTransactionCount))
      case None => None
    }).filter(_ != None).toList

    TAResponseV4[SentimentScoredDocumentV4](
      sentimentResult,
      error,
      stats,
      Some(resultCollection.getModelVersion))
  }
  override def outputSchema: StructType = SentimentResponseV4.schema
}
