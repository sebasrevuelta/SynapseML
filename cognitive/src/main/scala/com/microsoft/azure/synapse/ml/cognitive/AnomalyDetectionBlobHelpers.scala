// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.azure.synapse.ml.cognitive

import com.azure.storage.blob.sas.{BlobSasPermission, BlobServiceSasSignatureValues}
import com.azure.storage.blob.{BlobContainerClient, BlobServiceClientBuilder}
import com.azure.storage.common.StorageSharedKeyCredential
import org.apache.spark.sql.types.StructField
import org.apache.spark.sql.{DataFrame, Row}

import java.io.{ByteArrayInputStream, ByteArrayOutputStream, OutputStream, PrintWriter}
import java.time.format.DateTimeFormatter
import java.time.{Instant, OffsetDateTime, ZoneId, ZoneOffset}
import java.util.UUID
import java.util.zip.{ZipEntry, ZipOutputStream}

/** Helper to upload data from dataframe to Azure Blob storage. Stored as CSV and zipped.
  *
  * @param blobContainerClient configured with credentials.
  */
class AnomalyDetectionBlobHelpers(blobContainerClient: BlobContainerClient) {

  var blobName = ""
  var timestampCol = "timestamp"

  def this(storageConnectionString: String, containerName: String) =
    this {
      val blobContainerClient = new BlobServiceClientBuilder()
        .connectionString(storageConnectionString)
        .credential(StorageSharedKeyCredential.fromConnectionString(storageConnectionString))
        .buildClient()
        .getBlobContainerClient(containerName.toLowerCase())
      if (!blobContainerClient.exists()) {
        blobContainerClient.create()
      }
      blobContainerClient
    }

  def this(storageName: String, storageKey: String, endpoint: String, sasToken: String, containerName: String) =
    this {
      val blobContainerClient = new BlobServiceClientBuilder()
        .endpoint(endpoint)
        .sasToken(sasToken)
        .credential(new StorageSharedKeyCredential(storageName, storageKey))
        .buildClient()
        .getBlobContainerClient(containerName.toLowerCase())
      if (!blobContainerClient.exists()) {
        blobContainerClient.create()
      }
      blobContainerClient
    }

  def setTimestampCol(v: String): this.type = {
    timestampCol = v
    this
  }

  def deleteBlob(): Unit =
    blobContainerClient.getBlobClient(blobName).delete()

  def upload(df: DataFrame): String = {
    val timestampColumn = df.schema
      .find(p => p.name == timestampCol)
      .get

    upload(df, timestampColumn)
  }

  def upload(df: DataFrame, timestampCol: StructField): String = {
    val timestampColIdx = df.schema.indexOf(timestampCol)

    val rows = df.collect

    val zipTargetStream = new ByteArrayOutputStream()

    val zipOut = new ZipOutputStream(zipTargetStream)

    // loop over all features
    for (feature <- df.schema.filter(p => p != timestampCol).zipWithIndex) {
      val featureIdx = df.schema.indexOf(feature._1)

      // create zip entry. must be named series_{idx}
      zipOut.putNextEntry(new ZipEntry(s"series_${feature._2}.csv"))

      // write CSV
      storeFeatureInCsv(rows, timestampColIdx, featureIdx, zipOut)

      zipOut.closeEntry
    }

    zipOut.close()

    // upload zip file
    val zipInBytes = zipTargetStream.toByteArray

    // upload blob
    val formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd").withZone(ZoneId.from(ZoneOffset.UTC))
    blobName = s"${formatter.format(Instant.now())}/${UUID.randomUUID()}.zip"
    val blobClient = blobContainerClient.getBlobClient(blobName)

    blobClient.upload(new ByteArrayInputStream(zipInBytes), zipInBytes.length, true)

    // generate SAS
    val sas = blobClient.generateSas(new BlobServiceSasSignatureValues(
      OffsetDateTime.now().plusHours(2),
      new BlobSasPermission().setReadPermission(true)
    ))

    s"${blobClient.getBlobUrl}?${sas}"
  }

  private def storeFeatureInCsv(rows: Array[Row], timestampColIdx: Int, featureIdx: Int, out: OutputStream): Unit = {
    // create CSV file per feature
    val pw = new PrintWriter(out)

    // CSV header
    pw.println("timestamp,value")

    for (row <- rows) {
      // <timestamp>,<value>
      // make sure it's ISO8601. e.g. 2021-01-01T00:00:00Z
      val timestamp = DateTimeFormatter.ISO_INSTANT.parse(row.getString(timestampColIdx))

      pw.print(DateTimeFormatter.ISO_INSTANT.format(timestamp))
      pw.write(',')

      // TODO: do we have to worry about locale?
      // pw.format(Locale.US, "%f", row.get(featureIdx))
      pw.println(row.get(featureIdx))
    }
    pw.flush
  }
}
