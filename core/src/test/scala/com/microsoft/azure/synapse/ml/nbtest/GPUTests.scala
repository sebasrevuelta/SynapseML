// Copyright (C) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in project root for information.

package com.microsoft.azure.synapse.ml.nbtest

import com.microsoft.azure.synapse.ml.build.BuildInfo
import com.microsoft.azure.synapse.ml.core.env.FileUtilities
import com.microsoft.azure.synapse.ml.nbtest.DatabricksUtilities._

import java.io.File
import scala.collection.mutable.ListBuffer

class GPUTests extends DatabricksTestHelper {

  val horovodInstallationScript: File = FileUtilities.join(
    BuildInfo.baseDirectory.getParent, "python", "horovod_installation.sh").getCanonicalFile
  uploadFileToDBFS(horovodInstallationScript, "/FileStore/horovod/horovod_installation.sh")
  val clusterId: String = createClusterInPool(GPUClusterName, AdbGpuRuntime, PoolId, GPUInitScripts)
  val jobIdsToCancel: ListBuffer[Int] = databricksTestHelper(clusterId, GPULibraries, GPUNotebooks)

  protected override def afterAll(): Unit = {
    afterAllHelper(jobIdsToCancel, clusterId)

    super.afterAll()
  }

}
