// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.ml.spark

import org.apache.spark.ml.param._
import org.apache.spark.ml.recommendation.{ALS, ALSModel}
import org.apache.spark.ml.util._
import org.apache.spark.ml.{Estimator, Model, Transformer}
import org.apache.spark.sql.types.{ArrayType, FloatType, IntegerType, StructType}
import org.apache.spark.sql.{DataFrame, Dataset}

import scala.language.existentials

class RankingAdapter(override val uid: String)
  extends Estimator[RankingAdapterModel] with ComplexParamsWritable with RankingFunctions {

  def this() = this(Identifiable.randomUID("RecommenderAdapter"))

  val recommender = new EstimatorParam(this, "recommender", "estimator for selection", { x: Estimator[_] => true })

  /** @group getParam */
  def getRecommender: Estimator[_ <: Model[_]] = $(recommender)

  /** @group setParam */
  def setRecommender(value: Estimator[_ <: Model[_]]): this.type = set(recommender, value)

  val mode: Param[String] = new Param(this, "mode", "recommendation mode")

  /** @group getParam */
  def getMode: String = $(mode)

  /** @group setParam */
  def setMode(value: String): this.type = set(mode, value)

  val nItems: IntParam = new IntParam(this, "nItems", "recommendation mode")

  /** @group getParam */
  def getNItems: Int = $(nItems)

  /** @group setParam */
  def setNItems(value: Int): this.type = set(nItems, value)

  def transformSchema(schema: StructType): StructType = {
    val model = getRecommender.asInstanceOf[ALS]
    getMode match {
      case "allUsers" => new StructType()
        .add("userCol", IntegerType)
        .add("recommendations", ArrayType(
          new StructType().add("itemCol", IntegerType).add("rating", FloatType))
        )
      case "allItems" => new StructType()
        .add("itemCol", IntegerType)
        .add("recommendations", ArrayType(
          new StructType().add("userCol", IntegerType).add("rating", FloatType))
        )
      case "normal" => model.transformSchema(schema)
    }
  }

  def fit(dataset: Dataset[_]): RankingAdapterModel = {
    new RankingAdapterModel()
      .setRecommenderModel(getRecommender.fit(dataset))
      .setMode(getMode)
      .setNItems(getNItems)
      .setUserCol(getUserCol)
      .setItemCol(getItemCol)
      .setRatingCol(getRatingCol)
  }

  override def copy(extra: ParamMap): RankingAdapter = {
    defaultCopy(extra)
  }

}

object RankingAdapter extends ComplexParamsReadable[RankingAdapter]

/**
  * Model from train validation split.
  *
  * @param uid Id.
  */
class RankingAdapterModel private[ml](val uid: String)
  extends Model[RankingAdapterModel] with ComplexParamsWritable with Wrappable with RankingFunctions {

  def recommendForAllUsers(i: Int): DataFrame = getRecommenderModel.asInstanceOf[ALSModel].recommendForAllUsers(3)

  def recommendForAllItems(i: Int): DataFrame = getRecommenderModel.asInstanceOf[ALSModel].recommendForAllItems(3)

  def this() = this(Identifiable.randomUID("RecommenderAdapterModel"))

  val recommenderModel = new TransformerParam(this, "recommenderModel", "recommenderModel", { x: Transformer => true })

  def setRecommenderModel(m: Model[_]): this.type = set(recommenderModel, m)

  def getRecommenderModel: Model[_] = $(recommenderModel).asInstanceOf[Model[_]]

  val mode: Param[String] = new Param(this, "mode", "recommendation mode")

  /** @group getParam */
  def getMode: String = $(mode)

  /** @group setParam */
  def setMode(value: String): this.type = set(mode, value)

  val nItems: IntParam = new IntParam(this, "nItems", "recommendation mode")

  /** @group getParam */
  def getNItems: Int = $(nItems)

  /** @group setParam */
  def setNItems(value: Int): this.type = set(nItems, value)

  val nUsers: IntParam = new IntParam(this, "nUsers", "recommendation mode")

  /** @group getParam */
  def getNUsers: Int = $(nUsers)

  /** @group setParam */
  def setNUsers(value: Int): this.type = set(nUsers, value)

  def transform(dataset: Dataset[_]): DataFrame = {
    transformSchema(dataset.schema)
    val model = getRecommenderModel.asInstanceOf[ALSModel]
    getMode match {
      case "allUsers" => {
        val recs = model.recommendForAllUsers(getNItems)
        prepareTestData(getUserCol, getItemCol, dataset.toDF(), recs, 10).toDF()
      }
      case "allItems" => {
        val recs = model.recommendForAllItems(getNUsers)
        prepareTestData(getItemCol, getUserCol, dataset.toDF(), recs, 10).toDF()
      }
      case "normal" => model.transform(dataset)
    }
  }

  def transformSchema(schema: StructType): StructType = {
    val model = getRecommenderModel.asInstanceOf[ALSModel]
    getMode match {
      case "allUsers" => new StructType()
        .add("userCol", IntegerType)
        .add("recommendations", ArrayType(
          new StructType().add("itemCol", IntegerType).add("rating", FloatType))
        )
      case "allItems" => new StructType()
        .add("itemCol", IntegerType)
        .add("recommendations", ArrayType(
          new StructType().add("userCol", IntegerType).add("rating", FloatType))
        )
      case "normal" => model.transformSchema(schema)
    }
  }

  override def copy(extra: ParamMap): RankingAdapterModel = {
    defaultCopy(extra)
  }

}

object RankingAdapterModel extends ComplexParamsReadable[RankingAdapterModel]
