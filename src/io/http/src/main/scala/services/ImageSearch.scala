// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.ml.spark

import java.net.URL

import org.apache.commons.io.IOUtils
import org.apache.http.client.methods.HttpGet
import org.apache.spark.binary.ConfUtils
import org.apache.spark.ml.param.VectorizableParam
import org.apache.spark.ml.util._
import org.apache.spark.sql.catalyst.encoders.RowEncoder
import org.apache.spark.sql.functions.{col, explode, udf}
import org.apache.spark.sql.types._
import org.apache.spark.sql.{DataFrame, Row}

import scala.concurrent.duration.Duration
import scala.concurrent.{ExecutionContext, Future}
import spray.json.DefaultJsonProtocol._

object BingImageSearch extends ComplexParamsReadable[BingImageSearch] with Serializable {
  def getInputFunc(url: String,
                   subscriptionKey: String,
                   staticParams: Map[String, String]): Row => HttpGet = {
    { dynamicParamRow: Row =>
      val allParams = staticParams ++ dynamicParamRow.getValuesMap(dynamicParamRow.schema.fieldNames)
      val fullURL = url + "?" + URLEncodingUtils.format(allParams)
      val get = new HttpGet(fullURL)
      get.setHeader("Ocp-Apim-Subscription-Key", subscriptionKey)
      get
    }
  }

  def getUrlTransformer(imageCol: String, urlCol: String): Lambda = {
    val fromRow = BingImagesResponse.makeFromRowConverter
    Lambda(_
      .withColumn(urlCol, explode(
        udf({ r: Row => fromRow(r).value.map(_.contentUrl)}, ArrayType(StringType))(col(imageCol))))
      .select(urlCol)
    )
  }

  def downloadFromUrls(df: DataFrame,
                       pathCol: String,
                       bytesCol: String,
                       concurrency: Int,
                       timeout: Int
                      ): DataFrame = {
    val outputSchema = df.schema.add(bytesCol, BinaryType, nullable = true)
    val encoder = RowEncoder(outputSchema)
    val hconf = ConfUtils.getHConf(df.toDF())
    df.toDF().mapPartitions { rows =>
      val futures = rows.map { row: Row =>
        (Future {
          IOUtils.toByteArray(new URL(row.getAs[String](pathCol)))
        }(ExecutionContext.global), row)
      }
      AsyncUtils.bufferedAwaitSafeWithContext(
        futures, concurrency, Duration.fromNanos(timeout * 1e6.toLong))(ExecutionContext.global)
        .map {
          case (bytesOpt, row) => Row.merge(row, Row(bytesOpt.orNull))
        }
    }(encoder)
  }
}

@InternalWrapper
class BingImageSearch(override val uid: String)
  extends CognitiveServicesBase(uid)
  with HasInternalCustomInputParser with HasInternalJsonOutputParser {

  def this() = this(Identifiable.randomUID("BingImageSearch"))

  setDefault(url -> "https://api.cognitive.microsoft.com/bing/v7.0/images/search")

  override def inputFunc(schema: StructType): Row => HttpGet = {row =>
    val allParams = getValueMap(row, Set(subscriptionKey)).mapValues(_.toString)
    val fullURL = url + "?" + URLEncodingUtils.format(allParams)
    val get = new HttpGet(fullURL)
    getValueOpt(row, subscriptionKey).foreach(get.setHeader("Ocp-Apim-Subscription-Key", _))
    get
  }

  override def responseDataType: DataType = BingImagesResponse.schema

  val offset = new VectorizableParam[Int](this, "offset", "where to start searching from")
  def setOffsetCol(v: String): this.type = setVectorParam(offset, v)
  def setOffset(v: Int): this.type = setScalarParam(offset, v)

  val query = new VectorizableParam[String](this, "query", "what to query bing for")
  def setQuery(v: String): this.type = setScalarParam(query, v)
  def setQueryCol(v: String): this.type = setVectorParam(query, v)

  val count = new VectorizableParam[Int](this, "count", "how many images to return")
  def setCount(v: Int): this.type = setScalarParam(count, v)
  def setCountCol(v: String): this.type = setVectorParam(count, v)

  val imageType = new VectorizableParam[String](this, "imageType", "the type of image")
  def setImageType(v: String): this.type = setScalarParam(imageType, v)
  def setImageTypeCol(v: String): this.type = setVectorParam(imageType, v)

}
