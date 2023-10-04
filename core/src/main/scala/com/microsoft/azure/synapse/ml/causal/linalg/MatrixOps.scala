package com.microsoft.azure.synapse.ml.causal.linalg

import breeze.linalg.{DenseMatrix => BDM, DenseVector => BDV}
import breeze.stats.mean
import org.apache.spark.sql.functions.{col, lit, sum}
import org.apache.spark.sql.types.LongType
import org.apache.spark.sql.{Encoder, Encoders, Row}

case class MatrixEntry(i: Long, j: Long, value: Double)

trait MatrixOps[TMatrix, TVector] {
  /**
    * alpha*A*x + beta*y
    */
  def gemv(A: TMatrix,
           x: TVector,
           yOpt: Option[TVector] = None,
           alpha: Double = 1.0,
           beta: Double = 1.0,
           aTranspose: Boolean = false): TVector

  def transpose(matrix: TMatrix): TMatrix

  def centerColumns(matrix: TMatrix): TMatrix

  /**
    * Computes the mean of each column. The result is transposed into a vector.
    */
  def colMean(matrix: TMatrix): TVector

  def size(matrix: TMatrix): (Long, Long)
}

object DMatrixOps extends MatrixOps[DMatrix, DVector] {
  private implicit val MatrixEntryEncoder: Encoder[MatrixEntry] = Encoders.product[MatrixEntry]
  private implicit val VectorEntryEncoder: Encoder[VectorEntry] = Encoders.product[VectorEntry]

  /**
    * alpha*A*x + beta*y
    */
  def gemv(A: DMatrix,
           x: DVector,
           yOpt: Option[DVector] = None,
           alpha: Double = 1.0,
           beta: Double = 1.0,
           aTranspose: Boolean = false): DVector = {

    val alphaAx = (if (aTranspose) transpose(A) else A).as("l")
      .join(x.as("r"), col("l.j") === col("r.i"), "inner")
      .groupBy(col("l.i"))
      .agg(sum(lit(alpha) * col("l.value") * col("r.value")).as("value"))
      .as[VectorEntry]

    yOpt.map {
        y =>
          DVectorOps.axpy(y, Some(alphaAx), beta)
      }.getOrElse(alphaAx)
      .as[VectorEntry]
  }

  def transpose(matrix: DMatrix): DMatrix = {
    matrix.select(
      col("j").as("i"),
      col("i").as("j"),
      col("value")
    ).as[MatrixEntry]
  }

  override def centerColumns(matrix: DMatrix): DMatrix = {
    val colMean = matrix.groupBy(col("j")).agg(
      org.apache.spark.sql.functions.mean(col("value")).as("value")
    )

    matrix.as("l").join(colMean.as("r"), col("l.j") === col("r.j"), "inner")
      .select(
        col("l.i").as("i"),
        col("l.j").as("j"),
        (col("l.value") - col("r.value")).as("value")
      ).as[MatrixEntry]
  }

  /**
    * Computes the mean of each column. The result is transposed into a vector.
    */
  override def colMean(matrix: DMatrix): DVector = {
    matrix.groupBy(col("j")).agg(
      org.apache.spark.sql.functions.mean(col("value")).as("value")
    ).select(
      col("j").as("i"),
      col("value")
    ).as[VectorEntry]
  }

  override def size(matrix: DMatrix): (Long, Long) = {
    val Row(m: Long, n: Long) = matrix.agg(
      org.apache.spark.sql.functions.max(col("i")).cast(LongType) + 1,
      org.apache.spark.sql.functions.max(col("j")).cast(LongType) + 1
    ).head

    (m, n)
  }
}

object BzMatrixOps extends MatrixOps[BDM[Double], BDV[Double]] {
  /**
    * alpha*A*x + beta*y
    */
  override def gemv(A: BDM[Double],
                    x: BDV[Double],
                    yOpt: Option[BDV[Double]] = None,
                    alpha: Double = 1.0,
                    beta: Double = 1.0,
                    aTranspose: Boolean = false): BDV[Double] = {
    val alphaAx = (if (aTranspose) A.t else A) * x * alpha
    yOpt.map(_ * beta + alphaAx).getOrElse(alphaAx)
  }

  override def transpose(matrix: BDM[Double]): BDM[Double] = {
    matrix.t
  }

  override def centerColumns(matrix: BDM[Double]): BDM[Double] = {
    val copy = matrix.copy
    0 until copy.cols map {
      i =>
        copy(::, i) -= mean(copy(::, i))
    }

    copy
  }

  /**
    * Computes the mean of each column. The result is transposed into a vector.
    */
  override def colMean(matrix: BDM[Double]): BDV[Double] = {
    BDV.tabulate(matrix.cols) {
      i => mean(matrix(::, i))
    }
  }

  override def size(matrix: BDM[Double]): (Long, Long) = (matrix.rows, matrix.cols)
}