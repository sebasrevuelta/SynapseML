# Copyright (C) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See LICENSE in the project root for information.

import sys

if sys.version >= '3':
    basestring = str

from pyspark.ml.param.shared import *
from pyspark import keyword_only

from pyspark.ml.wrapper import JavaEvaluator
from pyspark.ml.param.shared import HasLabelCol, HasPredictionCol, HasRawPredictionCol, HasFeaturesCol
from pyspark.ml.util import JavaMLReadable, JavaMLWritable

from pyspark.ml.common import inherit_doc
from mmlspark.Utils import *


@inherit_doc
class MsftRecommendationEvaluator(JavaEvaluator, HasLabelCol, HasPredictionCol, \
        JavaMLReadable, JavaMLWritable):
    @keyword_only
    def __init__(self, rawPredictionCol="rawPrediction", labelCol="label",
                 metricName="ndcgAt"):
        """
        __init__(self, rawPredictionCol="rawPrediction", labelCol="label", \
                 metricName="ndcgAt")
        """
        super(MsftRecommendationEvaluator, self).__init__()
        self._java_obj = self._new_java_obj(
            "com.microsoft.ml.spark.MsftRecommendationEvaluator", self.uid)
        self._setDefault(metricName="ndcgAt")
        kwargs = self._input_kwargs
        self._set(**kwargs)

    def setMetricName(self, value):
        """
        Sets the value of :py:attr:`metricName`.
        """
        return self._set(metricName=value)

    def getMetricName(self):
        """
        Gets the value of metricName or its default value.
        """
        return self.getOrDefault(self.metricName)

    def setK(self, value):
        """
        Sets the value of :py:attr:`metricName`.
        """
        return self._set(k=value)

    def getK(self):
        """
        Gets the value of metricName or its default value.
        """
        return self.getOrDefault(self.k)

    @keyword_only
    def setParams(self, rawPredictionCol="rawPrediction", labelCol="label",
                  metricName="ndcgAt"):
        """
        setParams(self, rawPredictionCol="rawPrediction", labelCol="label", \
                  metricName="areaUnderROC")
        Sets params for binary classification evaluator.
        """
        kwargs = self._input_kwargs
        return self._set(**kwargs)
