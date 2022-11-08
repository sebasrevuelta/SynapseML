# Copyright (C) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See LICENSE in project root for information.
import os
from pyspark.sql import DataFrame

PLATFORM_SYNAPSE_INTERNAL = "synapse_internal"
PLATFORM_SYNAPSE = "synapse"
PLATFORM_BINDER = "binder"
PLATFORM_DATABRICKS = "databricks"
PLATFORM_UNKNOWN = "unknown"
SECRET_STORE = "mmlspark-build-keys"
SYNAPSE_PROJECT_NAME = "Microsoft.ProjectArcadia"


def current_platform():
    if os.environ.get("AZURE_SERVICE", None) == SYNAPSE_PROJECT_NAME:
        from pyspark.sql import SparkSession

        sc = SparkSession.builder.getOrCreate().sparkContext
        cluster_type = sc.getConf().get("spark.cluster.type")
        if cluster_type == "synapse":
            return PLATFORM_SYNAPSE
        else:
            return PLATFORM_SYNAPSE_INTERNAL
    elif "dbfs" in os.listdir("/"):
        return PLATFORM_DATABRICKS
    elif os.environ.get("BINDER_LAUNCH_HOST", None) is not None:
        return PLATFORM_BINDER
    else:
        return PLATFORM_UNKNOWN


def running_on_synapse_internal():
    return current_platform() is PLATFORM_SYNAPSE_INTERNAL


def running_on_synapse():
    return current_platform() is PLATFORM_SYNAPSE


def running_on_binder():
    return current_platform() is PLATFORM_BINDER


def running_on_databricks():
    return current_platform() is PLATFORM_DATABRICKS


def find_secret(secret_name, keyvault=SECRET_STORE, override=None):
    if override is not None:
        return override

    if running_on_synapse():
        from notebookutils.mssparkutils.credentials import getSecret

        return getSecret(keyvault, secret_name)
    elif running_on_databricks():
        from pyspark.sql import SparkSession
        from pyspark.dbutils import DBUtils

        spark = SparkSession.builder.getOrCreate()
        dbutils = DBUtils(spark)
        return dbutils.secrets.get(scope=keyvault, key=secret_name)
    else:
        raise RuntimeError(
            f"Could not find {secret_name} in keyvault or overrides. If you are running this demo "
            f"and would like to manually specify your key for Azure KeyVault or Databricks Secrets,"
            f'please add the override="YOUR_KEY_HERE" to the arguments of the find_secret() method'
        )


def materializing_display(data):
    if running_on_synapse() or running_on_synapse_internal():
        from notebookutils.visualization import display

        if isinstance(data, DataFrame):
            data.collect()
        display(data)
    else:
        display(data)
