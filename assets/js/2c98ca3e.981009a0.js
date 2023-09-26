"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[2106],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6036:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var r=n(3117),a=n(102),i=(n(7294),n(3905)),o=["components"],s={title:"Quickstart - Deploying a Classifier",hide_title:!0,status:"stable"},l=void 0,p={unversionedId:"Deploy Models/Quickstart - Deploying a Classifier",id:"Deploy Models/Quickstart - Deploying a Classifier",title:"Quickstart - Deploying a Classifier",description:"Model Deployment with Spark Serving",source:"@site/docs/Deploy Models/Quickstart - Deploying a Classifier.md",sourceDirName:"Deploy Models",slug:"/Deploy Models/Quickstart - Deploying a Classifier",permalink:"/SynapseML/docs/next/Deploy Models/Quickstart - Deploying a Classifier",draft:!1,tags:[],version:"current",frontMatter:{title:"Quickstart - Deploying a Classifier",hide_title:!0,status:"stable"},sidebar:"docs",previous:{title:"About",permalink:"/SynapseML/docs/next/Deploy Models/Overview"},next:{title:"Contributor Guide",permalink:"/SynapseML/docs/next/Reference/Contributor Guide"}},c={},u=[{value:"Model Deployment with Spark Serving",id:"model-deployment-with-spark-serving",level:2}],m={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"model-deployment-with-spark-serving"},"Model Deployment with Spark Serving"),(0,i.kt)("p",null,"In this example, we try to predict incomes from the ",(0,i.kt)("em",{parentName:"p"},"Adult Census")," dataset. Then we will use Spark serving to deploy it as a realtime web service.\nFirst, we import needed packages:"),(0,i.kt)("p",null,"Now let's read the data and split it to train and test sets:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'data = spark.read.parquet(\n    "wasbs://publicwasb@mmlspark.blob.core.windows.net/AdultCensusIncome.parquet"\n)\ndata = data.select(["education", "marital-status", "hours-per-week", "income"])\ntrain, test = data.randomSplit([0.75, 0.25], seed=123)\ntrain.limit(10).toPandas()\n')),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"TrainClassifier")," can be used to initialize and fit a model, it wraps SparkML classifiers.\nYou can use ",(0,i.kt)("inlineCode",{parentName:"p"},"help(synapse.ml.TrainClassifier)")," to view the different parameters."),(0,i.kt)("p",null,"Note that it implicitly converts the data into the format expected by the algorithm. More specifically it:\ntokenizes, hashes strings, one-hot encodes categorical variables, assembles the features into a vector\netc.  The parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"numFeatures")," controls the number of hashed features."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.train import TrainClassifier\nfrom pyspark.ml.classification import LogisticRegression\n\nmodel = TrainClassifier(\n    model=LogisticRegression(), labelCol="income", numFeatures=256\n).fit(train)\n')),(0,i.kt)("p",null,"After the model is trained, we score it against the test dataset and view metrics."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"from synapse.ml.train import ComputeModelStatistics, TrainedClassifierModel\n\nprediction = model.transform(test)\nprediction.printSchema()\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"metrics = ComputeModelStatistics().transform(prediction)\nmetrics.limit(10).toPandas()\n")),(0,i.kt)("p",null,"First, we will define the webservice input/output.\nFor more information, you can visit the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Microsoft/SynapseML/blob/master/docs/mmlspark-serving.md"},"documentation for Spark Serving")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'from pyspark.sql.types import *\nfrom synapse.ml.io import *\nimport uuid\n\nserving_inputs = (\n    spark.readStream.server()\n    .address("localhost", 8898, "my_api")\n    .option("name", "my_api")\n    .load()\n    .parseRequest("my_api", test.schema)\n)\n\nserving_outputs = model.transform(serving_inputs).makeReply("prediction")\n\nserver = (\n    serving_outputs.writeStream.server()\n    .replyTo("my_api")\n    .queryName("my_query")\n    .option("checkpointLocation", "file:///tmp/checkpoints-{}".format(uuid.uuid1()))\n    .start()\n)\n')),(0,i.kt)("p",null,"Test the webservice"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'import requests\n\ndata = \'{"education":" 10th","marital-status":"Divorced","hours-per-week":40.0}\'\nr = requests.post(data=data, url="http://localhost:8898/my_api")\nprint("Response {}".format(r.text))\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'import requests\n\ndata = \'{"education":" Masters","marital-status":"Married-civ-spouse","hours-per-week":40.0}\'\nr = requests.post(data=data, url="http://localhost:8898/my_api")\nprint("Response {}".format(r.text))\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"import time\n\ntime.sleep(20)  # wait for server to finish setting up (just to be safe)\nserver.stop()\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"")))}d.isMDXComponent=!0}}]);