// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.ml.spark.schema

import org.apache.spark.sql.{DataFrame, Row}
import org.apache.spark.sql.types._

object BinaryFileSchema {

  /** Schema for the binary file column: Row(String, Array[Byte]) */
  val columnSchema = StructType(Seq(
    StructField("path",  StringType, true),
    StructField("bytes", BinaryType, true)   // raw file bytes
  ))

  /** Schema for the binary file column: Row(String, Array[Byte]) */
  val schema = StructType(StructField("value", columnSchema, true) :: Nil)

  def getPath(row: Row): String = row.getString(0)
  def getBytes(row: Row): Array[Byte] = row.getAs[Array[Byte]](1)

  /** Check if the dataframe column contains binary file data (i.e. has BinaryFileSchema) */
  def isBinaryFile(dt: DataType): Boolean =
    dt == columnSchema

  def isBinaryFile(sf: StructField): Boolean =
    isBinaryFile(sf.dataType)
}
