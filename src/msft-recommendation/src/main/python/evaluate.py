# Copyright (C) Microsoft Corporation.
#
# Microsoft Corporation ("Microsoft") grants you a nonexclusive, perpetual, royalty-free right to use, 
# copy, and modify the software code provided by us ("Software Code"). You may not sublicense the 
# Software Code or any use of it (except to your affiliates and to vendors to perform work on your behalf)
# through distribution, network access, service agreement, lease, rental, or otherwise. This license does
# not purport to express any claim of ownership over data you may have shared with Microsoft in the creation
# of the Software Code. Unless applicable law gives you more rights, Microsoft reserves all other rights not 
# expressly granted herein, whether by implication, estoppel or otherwise. 
#
# THE SOFTWARE CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
# LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO 
# EVENT SHALL MICROSOFT OR ITS LICENSORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
# OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS 
# OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
# IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE 
# USE OF THE SAMPLE CODE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import numpy as np
import pandas as pd

class TopK:
    '''
    Evaluation methods for top-k evaluation.
    '''
    def __init__(self, k, rating_true, rating_pred):
        '''
        :param spark: configured Spark SQL session.
        :param k: number of items for each user.
        :param rating_true: Spark DataFrame of customerID-itemID-rating tuple for true rating.
        :param rating_pred: Spark DataFrame of customerID-itemID-rating tuple for prediction (recommendation).
        '''
        from pyspark.mllib.evaluation import RankingMetrics
        from pyspark.sql.functions import expr

        self.k = k
        self.rating_true = rating_true
        self.rating_pred = rating_pred

        self._items_for_user_true = self.top_k_recommendation(k, rating_true) \
            .groupBy('customerID') \
            .agg(expr('collect_list(itemID)')) \
            .select('customerID', 'collect_list(itemID)') \
            .withColumnRenamed('collect_list(itemID)', 'true')
            
        self._items_for_user_pred = self.top_k_recommendation(k, rating_pred) \
            .groupBy('customerID') \
            .agg(expr('collect_list(itemID)')) \
            .select('customerID', 'collect_list(itemID)') \
            .withColumnRenamed('collect_list(itemID)', 'prediction')

        self._items_for_user_all = self._items_for_user_pred.join(self._items_for_user_true, on='customerID').drop('customerID')

        self._metrics = RankingMetrics(self._items_for_user_all.rdd)

    def top_k_recommendation(self, k, rating):
        '''
        Get the input customer-item-rating tuple in the format of Spark DataFrame, output a Spark DataFrame in the dense format of top k items for each user.
        :param spark: configured Spark SQL session.
        :param k: number of items for each user.
        :param rating: Spark DataFrame of rating data (in the format of customerID-itemID-rating tuple). 
        Note if it is implicit rating, just append a column of constants.
        '''
        from pyspark.sql import Window
        from pyspark.sql.functions import col, expr, row_number

        window_spec = Window.partitionBy('customerID').orderBy(col('rating').desc())

        # TODO: this does not work for rating of the same value.
        
        items_for_user = rating \
            .select('customerID', 'itemID', 'rating', row_number().over(window_spec).alias('rank')) \
            .where(col('rank') <= k)

        return items_for_user

class RankingEvaluation(TopK):
    '''
    Evaluation with ranking metrics on given data sets.
    '''
    def __init__(self, k, rating_true, rating_pred):
        '''
        Initialization.
        '''
        TopK.__init__(self, k, rating_true, rating_pred)
    
    def precision_at_k(self):
        '''
        Get precision@k.
        More details can be found at http://spark.apache.org/docs/2.1.1/api/python/pyspark.mllib.html#pyspark.mllib.evaluation.RankingMetrics.precisionAt
        '''
        precision = self._metrics.precisionAt(self.k)
        
        return(precision)
        
    def ndcg_at_k(self):
        '''
        Get Normalized Discounted Cumulative Gain (NDCG)@k.
        More details can be found at http://spark.apache.org/docs/2.1.1/api/python/pyspark.mllib.html#pyspark.mllib.evaluation.RankingMetrics.ndcgAt
        '''
        ndcg = self._metrics.ndcgAt(self.k)
        
        return(ndcg)
    
    def map_at_k(self):
        '''
        Get mean average precision at k. 
        More details can be found at http://spark.apache.org/docs/2.1.1/api/python/pyspark.mllib.html#pyspark.mllib.evaluation.RankingMetrics.meanAveragePrecision
        '''
        maprecision = self._metrics.meanAveragePrecision
        
        return(maprecision)
        
    def recall_at_k(self):
        '''
        Get mean average precision at k. 
        More details can be found at http://spark.apache.org/docs/2.1.1/api/python/pyspark.mllib.html#pyspark.mllib.evaluation.RankingMetrics.meanAveragePrecision
        '''
        recall = self._items_for_user_all.rdd.map(lambda x: len(set(x[0]).intersection(set(x[1]))) / len(x[1])).mean()
        
        return(recall)

    def rank(self):
        '''
        This is the metric used in the paper of "collaborative filtering for implicit feedback datasets".
        If the average rank is larger than 0.5, it indicates that the recommendation results are no better than random guess.
        More details can be found at http://yifanhu.net/PUB/cf.pdf.
        '''
        from pyspark.sql import Window
        from pyspark.sql.functions import dense_rank, percent_rank, desc, col
        
        top_k_rec = self.top_k_recommendation(self.k, self.rating_pred)
        
        top_k_rank = top_k_rec \
            .withColumn('percentile', percent_rank().over(Window.partitionBy("customerID").orderBy(desc("rating")))) 
            
        top_k_rank = top_k_rank \
            .withColumn('product', col('rating') * col('percentile').cast('float')) \
            .groupBy('customerID') \
            .agg({'rating': "sum", 'product': "sum"}) \
            .withColumn('ranking', col("sum(product)") / col("sum(rating)")) 
        
        average_ranking = top_k_rank \
            .agg({'ranking': 'avg'}) \
            .head()[0]
                    
        return(average_ranking)
        
class DistributionEvaluation(TopK):
    '''
    Evaluation with distribution-related metrics on given data sets.
    '''
    def __init__(self, k, rating_true, rating_pred):
        '''
        Initialization.
        :param spark: configured Spark SQL session.
        :param k: number of items for each user.
        :param rating_true: Spark DataFrame of customerID-itemID-rating tuple for true rating.
        :param rating_pred: Spark DataFrame of customerID-itemID-rating tuple for predicted rating.
        '''
        TopK.__init__(self, k, rating_true, rating_pred)

    def diversity_at_k(self):
        unique_rating_true = self.rating_true.select('itemID').distinct().count()
        unique_items_recommended = self._items_for_user_all.rdd.map(lambda row: row[0]) \
            .reduce(lambda x,y: set(x).union(set(y)))
        diversity = len(unique_items_recommended) / unique_rating_true
        
        return(diversity)
        
    def max_diversity(self):
        unique_rating_true = self.rating_true.select('itemID').distinct().count()
        unique_items_actual = self._items_for_user_true.rdd.map(lambda row: row[1]).reduce(lambda x,y: set(x).union(set(y)))
        max_diversity = len(unique_items_actual) / unique_rating_true
        
        return(max_diversity)

    def diversity_aggregated(self):
        '''
        Something we may consider for evaluation novelty which is reverse of diversity. 
        Check paper titled "novelty and diversity in top-N recommendation - analysis and evaluation" for more info.
        '''

    def popularity_at_k(self, n_bin=10):
        '''
        Calculate percentile of items falling in each bin of true items binned by popularity.
        It's called "diversity-at-k" in SAR solution, whose implementation can be found at
        https://github.com/Microsoft/Product-Recommendations/blob/master/doc/model-evaluation.md#diversity.  

        :param n_bin: number of ratings in each bin.
        '''
        from pyspark.sql import Window
        from pyspark.sql.functions import col, bround, row_number, percent_rank

        # TODO: refactor diversity measure for SAR.

        rating_item_count = self.rating_true \
            .groupBy('itemID') \
            .agg({"customerID": "count"}) \
            .withColumnRenamed('count(customerID)', 'count') 

        if (rating_item_count.count() < n_bin):
            print("Total number of items should be at least n_bin.")
            return -1

        rating_item_percentile = rating_item_count \
            .withColumn('percentile', percent_rank().over(Window.orderBy("count")))

        rating_joined = self.rating_pred.join(rating_item_percentile, "itemID") \
            .groupBy('percentile') \
            .agg({"itemID": "count"}) \
            .withColumnRenamed('count(itemID)', 'itemCounts') \

        return(rating_joined)

    def preference_at_k(self, filter_option):
        '''
        The method calculates average-user-preference on the recommended items.
        It's called "precision-at-k" in SAR solution, whose implementation is detailed at
        https://github.com/Microsoft/Product-Recommendations/blob/master/doc/model-evaluation.md#diversity.  
        '''
    
class RatingEvaluation:
    '''
    Evaluation with ranking metrics on given data sets.
    '''
    def __init__(self, rating_true, rating_pred):
        '''
        Initialization.
        :param spark: configured Spark SQL session.
        :param k: number of items for each user.
        :param rating_true: Spark DataFrame of customerID-itemID-rating tuple for true rating.
        :param rating_pred: Spark DataFrame of customerID-itemID-rating tuple for predicted rating.
        '''
        from pyspark.mllib.evaluation import RegressionMetrics
        from pyspark.sql.functions import col 

        rating_true = rating_true.select(
            col("customerID").alias("customerID"), 
            col("itemID").alias("itemID"), 
            col("rating").cast('double').alias("label")
        )
        
        rating_pred = rating_pred.select(
            col("customerID").alias("customerID"), 
            col("itemID").alias("itemID"), 
            col("rating").cast('double').alias("prediction")
        )
        
        rating_pred_true = rating_true.join(
            rating_pred, 
            ['customerID', 'itemID'],
            "inner" 
        ).drop('customerID').drop('itemID')

        metrics = RegressionMetrics(rating_pred_true.rdd)
        
        self.rsquared = metrics.r2
        self.exp_var = metrics.explainedVariance
        self.mae = metrics.meanAbsoluteError
        self.rmse = metrics.rootMeanSquaredError

if __name__ == "__main__":
    print("Evaluation")
