// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.azure.synapse.ml.vw

import com.microsoft.azure.synapse.ml.core.test.benchmarks.Benchmarks
import com.microsoft.azure.synapse.ml.core.test.fuzzing.{EstimatorFuzzing, TestObject}
import org.apache.spark.ml.util.MLReadable
import org.apache.spark.sql.{Encoders, SaveMode, functions => F, types => T}

class VerifyVowpalWabbitGeneric extends Benchmarks with EstimatorFuzzing[VowpalWabbitGeneric] {
  lazy val moduleName = "vw"
  val numPartitions = 2

  test ("Verify VowpalWabbitGeneric from string") {
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setNumPasses(2)

    val dataset = Seq("1 |a b c", "0 |d e f").map(StringFeatures).toDF

    val classifier = vw.fit(dataset)

    val predictionDF = classifier.transform(dataset)

    predictionDF.show()

    val labelOneCnt = predictionDF.where($"prediction" > 0.5).count()
    assert(labelOneCnt == 1)
  }

  test ("Verify VowpalWabbitGeneric using csoaa") {

    // https://github.com/VowpalWabbit/vowpal_wabbit/wiki/Cost-Sensitive-One-Against-All-(csoaa)-multi-class-example
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setPassThroughArgs("--csoaa 4")

    val dataset = Seq(
      "1:0 2:1 3:1 4:1 | a b c",
      "1:1 2:1 3:0 4:1 | b c d"
    ).map(StringFeatures).toDF

    val classifier = vw.fit(dataset)

    val predictionDF = classifier.transform(dataset)

    predictionDF.show()
  }

  test ("Verify VowpalWabbitGeneric using oaa") {

    // https://github.com/VowpalWabbit/vowpal_wabbit/wiki/Multiclass-classification
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setPassThroughArgs("--oaa 4")
      .setNumPasses(4)

    val dataset = Seq(
      "1 | a b c",
      "3 | b c d",
      "1 | a c e",
      "4 | b d f",
      "2 | d e f"
    ).map(StringFeatures).toDF

    val classifier = vw.fit(dataset)

    val predictionDF = classifier.transform(dataset)

    predictionDF.show()

    // TODO: compare output
  }

  test ("Verify VowpalWabbitGeneric using oaa w/ probs") {

    // https://github.com/VowpalWabbit/vowpal_wabbit/wiki/Multiclass-classification
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setPassThroughArgs("--oaa 4")
      .setNumPasses(4)

    val dataset = Seq(
      "1 | a b c",
      "3 | b c d",
      "1 | a c e",
      "4 | b d f",
      "2 | d e f"
    ).map(StringFeatures).toDF

    val classifier = vw.fit(dataset)

    val predictionDF = classifier
      .setTestArgs("--probabilities")
      .transform(dataset)

    predictionDF.show()

    // TODO: compare output
  }



  test ("Verify VowpalWabbitGeneric using CATS") {

    // https://github.com/VowpalWabbit/vowpal_wabbit/wiki/CATS,-CATS-pdf-for-Continuous-Actions
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setPassThroughArgs("--cats_pdf 3 --bandwidth 5000 --min_value 0 --max_value 20000")
      .setUseBarrierExecutionMode(false)

    val dataset = Seq(
      "ca 185.121:0.657567:6.20426e-05 | a b",
      "ca 772.592:0.458316:6.20426e-05 | b c",
      "ca 15140.6:0.31791:6.20426e-05 | d"
    ).map(StringFeatures).toDF.coalesce(2)

    val classifier = vw.fit(dataset)

    val predictionDF = classifier.transform(dataset)

    predictionDF.show()
  }

  test ("Verify VowpalWabbitGeneric Complex stratify") {
    val dataset = spark.read.text("/home/marcozo/vw_complex/split-newline/*")
      .withColumnRenamed("value", "input")

    val extractSchema = T.StructType(Seq(
      T.StructField("Timestamp", T.StringType, false),
      T.StructField("EventId", T.StringType, false)
    ))

    dataset
      .select(
        F.col("input"),
        F.from_json(F.col("input"), extractSchema).alias("json"))
      .withColumn("Timestamp", F.to_timestamp(F.col("json.Timestamp")))
      .repartition(10, F.col("json.EventId"))
      .sortWithinPartitions(F.col("Timestamp"))
      .select(
        F.col("input")
        // F.col("json.Timestamp").alias("Timestamp")
      )
      .write
      .option("header", "false")
      .option("compression", "gzip")
      .mode(SaveMode.Overwrite)
      .text("/home/marcozo/vw_complex/cmplx-stratified")
  }

  test ("Verify VowpalWabbitGeneric Complex") {
    import spark.implicits._

    spark.udf.register("snips", F.udaf(new BanditEstimatorSnips(), Encoders.product[BanditEstimatorSnipsInput]))
    spark.udf.register("ips", F.udaf(new BanditEstimatorIps(), Encoders.product[BanditEstimatorIpsInput]))
    spark.udf.register("cressieRead",
      F.udaf(new BanditEstimatorCressieRead(), Encoders.product[BanditEstimatorCressieReadInput]))
    spark.udf.register("cressieReadInterval",
      F.udaf(new BanditEstimatorCressieReadInterval(false), Encoders.product[BanditEstimatorCressieReadIntervalInput]))
    spark.udf.register("cressieReadIntervalEmpirical",
      F.udaf(new BanditEstimatorCressieReadInterval(true), Encoders.product[BanditEstimatorCressieReadIntervalInput]))
    spark.udf.register("bernstein",
      F.udaf(new BanditEstimatorEmpiricalBernsteinCS(), Encoders.product[BanditEstimatorEmpiricalBernsteinCSInput]))

    val time = System.currentTimeMillis()

    val vw = new VowpalWabbitGenericProgressive()
      // .setPassThroughArgs("--cb_adf --cb_type mtr --coin --clip_p 0.1 -q GT -q MS -q GR -q OT -q MT -q OS --dsjson")
      .setPassThroughArgs("--cb_explore_adf --cb_type mtr --clip_p 0.1 -q GT -q MS -q GR -q OT -q MT -q OS --dsjson")
      .setNumSyncsPerPass(30)

    val extractSchema = T.StructType(Seq(
      T.StructField("_label_cost", T.FloatType, false),
      T.StructField("_label_probability", T.FloatType, false),
      T.StructField("_label_Action", T.IntegerType, false)
    ))

    val dataset = spark.read.text("/home/marcozo/vw_complex/cmplx-stratified/*")
      .withColumnRenamed("value", "input")
      .withColumn("json", F.from_json(F.col("input"), extractSchema))
      .withColumn("probLog", F.col("json._label_probability"))
      .withColumn("reward", F.col("json._label_cost"))

    vw.transform(dataset)
      // .withColumn("probPred", F.expr("element_at(predictions, json._label_Action).score"))
      .withColumn("probPred", F.expr("element_at(predictions, json._label_Action).probability"))
      .withColumn("count", F.lit(1))
      .agg(
        F.expr("snips(probLog, reward, probPred, count)").as("snips"),
        F.expr("ips(probLog, reward, probPred, count)").as("ips"),
        // TODO: not sure what to pass for wmin/wmax
        F.expr("cressieRead(probLog, reward, probPred, count, -1, 0)").as("cressieRead"),
        F.expr("cressieReadInterval(probLog, reward, probPred, count, -1, 0, -1, 0)")
          .as("cressieReadInterval"),
        F.expr("cressieReadIntervalEmpirical(probLog, reward, probPred, count, -1, 0, -1, 0)")
          .as("cressieReadIntervalEmpirical"),
        // TODO: fails
//        F.expr("bernstein(probLog, reward, probPred, count)").alias("bernstein")
      )
      .show(false)

    // dataset.show()

//    val classifier = vw.fit(dataset)
//
//    classifier.getPerformanceStatistics.show()
//
//    println(s"Time: ${(System.currentTimeMillis() - time)/1000}s")
//
//    val predictionDF = classifier
//      .setTestArgs("--dsjson")
//      .transform(dataset)
  }



  test ("Verify VowpalWabbitGeneric using dsjson") {
    import spark.implicits._

    val vw = new VowpalWabbitGeneric()
      .setPassThroughArgs("--cb_explore_adf --dsjson")

    val dataset = Seq(
      "{\"_label_cost\":-0.0,\"_label_probability\":0.05000000074505806,\"_label_Action\":4,\"_labelIndex\":3,\"o\":[{\"v\":0.0,\"EventId\":\"13118d9b4c114f8485d9dec417e3aefe\",\"ActionTaken\":false}],\"Timestamp\":\"2021-02-04T16:31:29.2460000Z\",\"Version\":\"1\",\"EventId\":\"13118d9b4c114f8485d9dec417e3aefe\",\"a\":[4,2,1,3],\"c\":{\"FromUrl\":[{\"timeofday\":\"Afternoon\",\"weather\":\"Sunny\",\"name\":\"Cathy\"}],\"_multi\":[{\"_tag\":\"Cappucino\",\"i\":{\"constant\":1,\"id\":\"Cappucino\"},\"j\":[{\"type\":\"hot\",\"origin\":\"kenya\",\"organic\":\"yes\",\"roast\":\"dark\"}]},{\"_tag\":\"Cold brew\",\"i\":{\"constant\":1,\"id\":\"Cold brew\"},\"j\":[{\"type\":\"cold\",\"origin\":\"brazil\",\"organic\":\"yes\",\"roast\":\"light\"}]},{\"_tag\":\"Iced mocha\",\"i\":{\"constant\":1,\"id\":\"Iced mocha\"},\"j\":[{\"type\":\"cold\",\"origin\":\"ethiopia\",\"organic\":\"no\",\"roast\":\"light\"}]},{\"_tag\":\"Latte\",\"i\":{\"constant\":1,\"id\":\"Latte\"},\"j\":[{\"type\":\"hot\",\"origin\":\"brazil\",\"organic\":\"no\",\"roast\":\"dark\"}]}]},\"p\":[0.05,0.05,0.05,0.85],\"VWState\":{\"m\":\"ff0744c1aa494e1ab39ba0c78d048146/550c12cbd3aa47f09fbed3387fb9c6ec\"},\"_original_label_cost\":-0.0}",
      "{\"_label_cost\":-1.0,\"_label_probability\":0.8500000238418579,\"_label_Action\":1,\"_labelIndex\":0,\"o\":[{\"v\":1.0,\"EventId\":\"bf50a49c34b74937a81e8d6fc95faa99\",\"ActionTaken\":false}],\"Timestamp\":\"2021-02-04T16:31:29.9430000Z\",\"Version\":\"1\",\"EventId\":\"bf50a49c34b74937a81e8d6fc95faa99\",\"a\":[1,3,2,4],\"c\":{\"FromUrl\":[{\"timeofday\":\"Evening\",\"weather\":\"Snowy\",\"name\":\"Alice\"}],\"_multi\":[{\"_tag\":\"Cappucino\",\"i\":{\"constant\":1,\"id\":\"Cappucino\"},\"j\":[{\"type\":\"hot\",\"origin\":\"kenya\",\"organic\":\"yes\",\"roast\":\"dark\"}]},{\"_tag\":\"Cold brew\",\"i\":{\"constant\":1,\"id\":\"Cold brew\"},\"j\":[{\"type\":\"cold\",\"origin\":\"brazil\",\"organic\":\"yes\",\"roast\":\"light\"}]},{\"_tag\":\"Iced mocha\",\"i\":{\"constant\":1,\"id\":\"Iced mocha\"},\"j\":[{\"type\":\"cold\",\"origin\":\"ethiopia\",\"organic\":\"no\",\"roast\":\"light\"}]},{\"_tag\":\"Latte\",\"i\":{\"constant\":1,\"id\":\"Latte\"},\"j\":[{\"type\":\"hot\",\"origin\":\"brazil\",\"organic\":\"no\",\"roast\":\"dark\"}]}]},\"p\":[0.85,0.05,0.05,0.05],\"VWState\":{\"m\":\"ff0744c1aa494e1ab39ba0c78d048146/550c12cbd3aa47f09fbed3387fb9c6ec\"},\"_original_label_cost\":-1.0}"
    ).map(StringFeatures).toDF

    import org.apache.spark.sql.functions

//    spark.udf.register("snips", functions.udaf(new BanditEstimatorSnips(), Encoders.LONG))

    dataset
      .withColumn("json",
        F.from_json(
          F.col("input"),
          T.StructType(Seq(
            T.StructField("_label_cost", T.FloatType, false),
            T.StructField("_label_probability", T.FloatType, false),
            T.StructField("_label_Action", T.IntegerType, false),
          ))
        ))
      .show()

//    val classifier = vw.fit(dataset)
//
//    val predictionDF = classifier
//      .setTestArgs("--dsjson")
//      .transform(dataset)
//
//    predictionDF
//      .withColumn("rowId", F.monotonically_increasing_id())
//      .withColumn("pred_action", F.explode(F.col("predictions")))
//      .show()

//
//    val labelOneCnt = predictionDF.where($"prediction" > 0.5).count()
//    assert(labelOneCnt == 1)
  }

  override def reader: MLReadable[_] = VowpalWabbitGeneric
  override def modelReader: MLReadable[_] = VowpalWabbitGenericModel

  override def testObjects(): Seq[TestObject[VowpalWabbitGeneric]] = {
    import spark.implicits._

    val dataset = Seq("1 |a b c", "0 |d e f").map(StringFeatures).toDF
    Seq(new TestObject(
      new VowpalWabbitGeneric(),
      dataset))
  }
}

case class StringFeatures(input: String)
