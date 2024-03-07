package com.microsoft.azure.synapse.ml.fabric

import spray.json.{JsValue, JsString}

trait OpenAIFabricSetting extends RESTUtils {

  private def getHeaders: Map[String, String] = {
    Map(
      "Authorization" -> s"Bearer ${TokenLibrary.getAccessToken}",
      "Content-Type" -> "application/json"
    )
  }

  def usagePost(url: String, body: String): JsValue = {
    usagePost(url, body, getHeaders);
  }

  def getModelStatus(modelName: String): Boolean = {

    val payload =
      s"""["${modelName}"]"""

    val mlWorkloadEndpointML = FabricClient.MLWorkloadEndpointML
    val url = mlWorkloadEndpointML + "cognitive/openai/tenantsetting"
    val modelStatus = usagePost(url, payload).asJsObject.fields.get(modelName.toLowerCase).get

    // Allowed, Disallowed, DisallowedForCrossGeo, ModelNotFound, InvalidResult
    val resultString: String = modelStatus match {
      case JsString(value) => value
      case _ => throw new RuntimeException("Unexpected result from type conversion " +
        "when checking the fabric tenant settings API.")
    }

    resultString match {
      case "Disallowed" => throw new RuntimeException(s"Default OpenAI model ${modelName} is Disallowed, " +
        s"please contact your admin if you want to use default fabric LLM model. " +
        s"Or you can set your Azure OpenAI credentials.")
      case "DisallowedForCrossGeo" => throw new RuntimeException(s"Default OpenAI model ${modelName} is Disallowed " +
        s"for Cross Geo, please contact your admin if you want to use default fabric LLM model. " +
        s"Or you can set your Azure OpenAI credentials.")
      case "ModelNotFound" => throw new RuntimeException(s"Default OpenAI model ${modelName} not found, " +
        s"please check your deployment name.")
      case "InvalidResult" => throw new RuntimeException("Cannot get tenant admin setting status correctly")
      case "Allowed" => true
      case _ => throw new RuntimeException("Unexpected result from checking the Fabric tenant settings API.")
    }
  }

}
