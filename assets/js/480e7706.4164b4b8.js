"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[678],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),f=a,b=m["".concat(s,".").concat(f)]||m[f]||u[f]||i;return n?r.createElement(b,o(o({ref:t},c),{},{components:n})):r.createElement(b,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},38103:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var r=n(83117),a=n(80102),i=(n(67294),n(3905)),o=["components"],l={title:"Interpretability - Text Explainers",hide_title:!0,status:"stable",name:"Interpretability - Text Explainers"},s=void 0,p={unversionedId:"features/responsible_ai/Interpretability - Text Explainers",id:"version-0.11.0/features/responsible_ai/Interpretability - Text Explainers",title:"Interpretability - Text Explainers",description:"Interpretability - Text Explainers",source:"@site/versioned_docs/version-0.11.0/features/responsible_ai/Interpretability - Text Explainers.md",sourceDirName:"features/responsible_ai",slug:"/features/responsible_ai/Interpretability - Text Explainers",permalink:"/SynapseML/docs/features/responsible_ai/Interpretability - Text Explainers",draft:!1,tags:[],version:"0.11.0",frontMatter:{title:"Interpretability - Text Explainers",hide_title:!0,status:"stable"},sidebar:"docs",previous:{title:"Interpretability - Tabular SHAP explainer",permalink:"/SynapseML/docs/features/responsible_ai/Interpretability - Tabular SHAP explainer"},next:{title:"Model Interpretation on Spark",permalink:"/SynapseML/docs/features/responsible_ai/Model Interpretation on Spark"}},c={},u=[{value:"Interpretability - Text Explainers",id:"interpretability---text-explainers",level:2}],m={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"interpretability---text-explainers"},"Interpretability - Text Explainers"),(0,i.kt)("p",null,"In this example, we use LIME and Kernel SHAP explainers to explain a text classification model."),(0,i.kt)("p",null,"First we import the packages and define some UDFs and a plotting function we will need later."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"from pyspark.sql.functions import *\nfrom pyspark.sql.types import *\nfrom pyspark.ml.feature import StopWordsRemover, HashingTF, IDF, Tokenizer\nfrom pyspark.ml import Pipeline\nfrom pyspark.ml.classification import LogisticRegression\nfrom synapse.ml.explainers import *\nfrom synapse.ml.featurize.text import TextFeaturizer\nfrom pyspark.sql import SparkSession\n\n# Bootstrap Spark Session\nspark = SparkSession.builder.getOrCreate()\n\nfrom synapse.ml.core.platform import *\n\nfrom synapse.ml.core.platform import materializing_display as display\nvec2array = udf(lambda vec: vec.toArray().tolist(), ArrayType(FloatType()))\nvec_access = udf(lambda v, i: float(v[i]), FloatType())\n")),(0,i.kt)("p",null,"Load training data, and convert rating to binary label."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'data = (\n    spark.read.parquet("wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet")\n    .withColumn("label", (col("rating") > 3).cast(LongType()))\n    .select("label", "text")\n    .cache()\n)\n\ndisplay(data)\n')),(0,i.kt)("p",null,"We train a text classification model, and randomly sample 10 rows to explain."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'train, test = data.randomSplit([0.60, 0.40])\n\npipeline = Pipeline(\n    stages=[\n        TextFeaturizer(\n            inputCol="text",\n            outputCol="features",\n            useStopWordsRemover=True,\n            useIDF=True,\n            minDocFreq=20,\n            numFeatures=1 << 16,\n        ),\n        LogisticRegression(maxIter=100, regParam=0.005, labelCol="label", featuresCol="features"),\n    ]\n)\n\nmodel = pipeline.fit(train)\n\nprediction = model.transform(test)\n\nexplain_instances = prediction.orderBy(rand()).limit(10)\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'def plotConfusionMatrix(df, label, prediction, classLabels):\n    from synapse.ml.plot import confusionMatrix\n    import matplotlib.pyplot as plt\n\n    fig = plt.figure(figsize=(4.5, 4.5))\n    confusionMatrix(df, label, prediction, classLabels)\n    if running_on_synapse():\n        plt.show()\n    else:\n        display(fig)\n\n\nplotConfusionMatrix(model.transform(test), "label", "prediction", [0, 1])\n')),(0,i.kt)("p",null,"First we use the LIME text explainer to explain the model's predicted probability for a given observation."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'lime = TextLIME(\n    model=model,\n    outputCol="weights",\n    inputCol="text",\n    targetCol="probability",\n    targetClasses=[1],\n    tokensCol="tokens",\n    samplingFraction=0.7,\n    numSamples=2000,\n)\n\nlime_results = (\n    lime.transform(explain_instances)\n    .select("tokens", "weights", "r2", "probability", "text")\n    .withColumn("probability", vec_access("probability", lit(1)))\n    .withColumn("weights", vec2array(col("weights").getItem(0)))\n    .withColumn("r2", vec_access("r2", lit(0)))\n    .withColumn("tokens_weights", arrays_zip("tokens", "weights"))\n)\n\ndisplay(lime_results.select("probability", "r2", "tokens_weights", "text").orderBy(col("probability").desc()))\n')),(0,i.kt)("p",null,"Then we use the Kernel SHAP text explainer to explain the model's predicted probability for a given observation."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Notice that we drop the base value from the SHAP output before displaying the SHAP values. The base value is the model output for an empty string.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'shap = TextSHAP(\n    model=model,\n    outputCol="shaps",\n    inputCol="text",\n    targetCol="probability",\n    targetClasses=[1],\n    tokensCol="tokens",\n    numSamples=5000,\n)\n\nshap_results = (\n    shap.transform(explain_instances)\n    .select("tokens", "shaps", "r2", "probability", "text")\n    .withColumn("probability", vec_access("probability", lit(1)))\n    .withColumn("shaps", vec2array(col("shaps").getItem(0)))\n    .withColumn("shaps", slice(col("shaps"), lit(2), size(col("shaps"))))\n    .withColumn("r2", vec_access("r2", lit(0)))\n    .withColumn("tokens_shaps", arrays_zip("tokens", "shaps"))\n)\n\ndisplay(shap_results.select("probability", "r2", "tokens_shaps", "text").orderBy(col("probability").desc()))\n')))}f.isMDXComponent=!0}}]);