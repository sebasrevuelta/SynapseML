"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[3195],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(n),u=a,h=c["".concat(l,".").concat(u)]||c[u]||m[u]||o;return n?r.createElement(h,i(i({ref:t},d),{},{components:n})):r.createElement(h,i({ref:t},d))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},35071:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=n(83117),a=(n(67294),n(3905));const o={title:"Quickstart - OpenAI Embedding",hide_title:!0,status:"stable"},i="Embedding Text with Azure OpenAI",s={unversionedId:"Explore Algorithms/OpenAI/Quickstart - OpenAI Embedding",id:"version-1.0.1/Explore Algorithms/OpenAI/Quickstart - OpenAI Embedding",title:"Quickstart - OpenAI Embedding",description:"The Azure OpenAI service can be used to solve a large number of natural language tasks through prompting the completion API. To make it easier to scale your prompting workflows from a few examples to large datasets of examples we have integrated the Azure OpenAI service with the distributed machine learning library SynapseML. This integration makes it easy to use the Apache Spark distributed computing framework to process millions of prompts with the OpenAI service. This tutorial shows how to apply large language models to generate embeddings for large datasets of text.",source:"@site/versioned_docs/version-1.0.1/Explore Algorithms/OpenAI/Quickstart - OpenAI Embedding.md",sourceDirName:"Explore Algorithms/OpenAI",slug:"/Explore Algorithms/OpenAI/Quickstart - OpenAI Embedding",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/OpenAI/Quickstart - OpenAI Embedding",draft:!1,tags:[],version:"1.0.1",frontMatter:{title:"Quickstart - OpenAI Embedding",hide_title:!0,status:"stable"},sidebar:"docs",previous:{title:"OpenAI",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/OpenAI/"},next:{title:"Quickstart - Understand and Search Forms",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/OpenAI/Quickstart - Understand and Search Forms"}},l={},p=[{value:"Step 1: Prerequisites",id:"step-1-prerequisites",level:2},{value:"Step 2: Import this guide as a notebook",id:"step-2-import-this-guide-as-a-notebook",level:2},{value:"Step 3: Fill in your service information",id:"step-3-fill-in-your-service-information",level:2},{value:"Step 4: Load Data",id:"step-4-load-data",level:2},{value:"Step 5: Generate Embeddings",id:"step-5-generate-embeddings",level:2},{value:"Step 6: Reduce Embedding dimensionality for Visualization",id:"step-6-reduce-embedding-dimensionality-for-visualization",level:2},{value:"Step 7: Plot the embeddings",id:"step-7-plot-the-embeddings",level:2},{value:"Step 8: Build a fast vector index to over review embeddings",id:"step-8-build-a-fast-vector-index-to-over-review-embeddings",level:2},{value:"Step 8: Build the retrieval model pipeline",id:"step-8-build-the-retrieval-model-pipeline",level:2},{value:"Step 9: Retrieve results",id:"step-9-retrieve-results",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"embedding-text-with-azure-openai"},"Embedding Text with Azure OpenAI"),(0,a.kt)("p",null,"The Azure OpenAI service can be used to solve a large number of natural language tasks through prompting the completion API. To make it easier to scale your prompting workflows from a few examples to large datasets of examples we have integrated the Azure OpenAI service with the distributed machine learning library ",(0,a.kt)("a",{parentName:"p",href:"https://www.microsoft.com/en-us/research/blog/synapseml-a-simple-multilingual-and-massively-parallel-machine-learning-library/"},"SynapseML"),". This integration makes it easy to use the ",(0,a.kt)("a",{parentName:"p",href:"https://spark.apache.org/"},"Apache Spark")," distributed computing framework to process millions of prompts with the OpenAI service. This tutorial shows how to apply large language models to generate embeddings for large datasets of text. "),(0,a.kt)("h2",{id:"step-1-prerequisites"},"Step 1: Prerequisites"),(0,a.kt)("p",null,"The key prerequisites for this quickstart include a working Azure OpenAI resource, and an Apache Spark cluster with SynapseML installed. We suggest creating a Synapse workspace, but an Azure Databricks, HDInsight, or Spark on Kubernetes, or even a python environment with the ",(0,a.kt)("inlineCode",{parentName:"p"},"pyspark")," package will work. "),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"An Azure OpenAI resource \u2013 request access ",(0,a.kt)("a",{parentName:"li",href:"https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUOFA5Qk1UWDRBMjg0WFhPMkIzTzhKQ1dWNyQlQCN0PWcu"},"here")," before ",(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource"},"creating a resource")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/synapse-analytics/get-started-create-workspace"},"Create a Synapse workspace")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/synapse-analytics/get-started-analyze-spark#create-a-serverless-apache-spark-pool"},"Create a serverless Apache Spark pool"))),(0,a.kt)("h2",{id:"step-2-import-this-guide-as-a-notebook"},"Step 2: Import this guide as a notebook"),(0,a.kt)("p",null,"The next step is to add this code into your Spark cluster. You can either create a notebook in your Spark platform and copy the code into this notebook to run the demo. Or download the notebook and import it into Synapse Analytics"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/microsoft/SynapseML/blob/master/notebooks/features/cognitive_services/CognitiveServices%20-%20OpenAI%20Embedding.ipynb"},"Download this demo as a notebook")," (click Raw, then save the file)"),(0,a.kt)("li",{parentName:"ol"},"Import the notebook ",(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#create-a-notebook"},"into the Synapse Workspace")," or if using Databricks ",(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/databricks/notebooks/notebooks-manage#create-a-notebook"},"into the Databricks Workspace")),(0,a.kt)("li",{parentName:"ol"},"Install SynapseML on your cluster. Please see the installation instructions for Synapse at the bottom of ",(0,a.kt)("a",{parentName:"li",href:"https://microsoft.github.io/SynapseML/"},"the SynapseML website"),". Note that this requires pasting an additional cell at the top of the notebook you just imported"),(0,a.kt)("li",{parentName:"ol"},"Connect your notebook to a cluster and follow along, editing and rnnung the cells below.")),(0,a.kt)("h2",{id:"step-3-fill-in-your-service-information"},"Step 3: Fill in your service information"),(0,a.kt)("p",null,"Next, please edit the cell in the notebook to point to your service. In particular set the ",(0,a.kt)("inlineCode",{parentName:"p"},"service_name"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"deployment_name"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"location"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"key")," variables to match those for your OpenAI service:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.core.platform import find_secret\n\n# Fill in the following lines with your service information\n# Learn more about selecting which embedding model to choose: https://openai.com/blog/new-and-improved-embedding-model\nservice_name = "synapseml-openai"\ndeployment_name_embeddings = "text-embedding-ada-002"\n\nkey = find_secret(\n    secret_name="openai-api-key", keyvault="mmlspark-build-keys"\n)  # please replace this with your key as a string\n\nassert key is not None and service_name is not None\n')),(0,a.kt)("h2",{id:"step-4-load-data"},"Step 4: Load Data"),(0,a.kt)("p",null,"In this demo we will explore a dataset of fine food reviews"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import pyspark.sql.functions as F\n\ndf = (\n    spark.read.options(inferSchema="True", delimiter=",", header=True)\n    .csv("wasbs://publicwasb@mmlspark.blob.core.windows.net/fine_food_reviews_1k.csv")\n    .repartition(5)\n)\n\ndf = df.withColumn(\n    "combined",\n    F.format_string("Title: %s; Content: %s", F.trim(df.Summary), F.trim(df.Text)),\n)\n\ndisplay(df)\n')),(0,a.kt)("h2",{id:"step-5-generate-embeddings"},"Step 5: Generate Embeddings"),(0,a.kt)("p",null,"We will first generate embeddings for the reviews using the SynapseML OpenAIEmbedding client."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.services.openai import OpenAIEmbedding\n\nembedding = (\n    OpenAIEmbedding()\n    .setSubscriptionKey(key)\n    .setDeploymentName(deployment_name_embeddings)\n    .setCustomServiceName(service_name)\n    .setTextCol("combined")\n    .setErrorCol("error")\n    .setOutputCol("embeddings")\n)\n\ncompleted_df = embedding.transform(df).cache()\ndisplay(completed_df)\n')),(0,a.kt)("h2",{id:"step-6-reduce-embedding-dimensionality-for-visualization"},"Step 6: Reduce Embedding dimensionality for Visualization"),(0,a.kt)("p",null,"We reduce the dimensionality to 2 dimensions using t-SNE decomposition."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import pandas as pd\nfrom sklearn.manifold import TSNE\nimport numpy as np\n\ncollected = list(completed_df.collect())\nmatrix = np.array([[r["embeddings"]] for r in collected])[:, 0, :].astype(np.float64)\nscores = np.array([[r["Score"]] for r in collected]).reshape(-1)\n\ntsne = TSNE(n_components=2, perplexity=15, random_state=42, init="pca")\nvis_dims = tsne.fit_transform(matrix)\nvis_dims.shape\n')),(0,a.kt)("h2",{id:"step-7-plot-the-embeddings"},"Step 7: Plot the embeddings"),(0,a.kt)("p",null,"We now use t-SNE to reduce the dimensionality of the embeddings from 1536 to 2. Once the embeddings are reduced to two dimensions, we can plot them in a 2D scatter plot. We colour each review by its star rating, ranging from red for negative reviews, to green for positive reviews. We can observe a decent data separation even in the reduced 2 dimensions."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import matplotlib.pyplot as plt\nimport matplotlib\nimport numpy as np\n\ncolors = ["red", "darkorange", "gold", "turquoise", "darkgreen"]\nx = [x for x, y in vis_dims]\ny = [y for x, y in vis_dims]\ncolor_indices = scores - 1\n\ncolormap = matplotlib.colors.ListedColormap(colors)\nplt.scatter(x, y, c=color_indices, cmap=colormap, alpha=0.3)\nfor score in [0, 1, 2, 3, 4]:\n    avg_x = np.array(x)[scores - 1 == score].mean()\n    avg_y = np.array(y)[scores - 1 == score].mean()\n    color = colors[score]\n    plt.scatter(avg_x, avg_y, marker="x", color=color, s=100)\n\nplt.title("Amazon ratings visualized in language using t-SNE")\n')),(0,a.kt)("h2",{id:"step-8-build-a-fast-vector-index-to-over-review-embeddings"},"Step 8: Build a fast vector index to over review embeddings"),(0,a.kt)("p",null,"We will use SynapseML's KNN estimator to build a fast cosine-similarity retrieval engine."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.nn import *\n\nknn = (\n    KNN()\n    .setFeaturesCol("embeddings")\n    .setValuesCol("id")\n    .setOutputCol("output")\n    .setK(10)\n)\n\nknn_index = knn.fit(completed_df)\n')),(0,a.kt)("h2",{id:"step-8-build-the-retrieval-model-pipeline"},"Step 8: Build the retrieval model pipeline"),(0,a.kt)("p",null,'Note: The data types of the ID columns in the document and query dataframes should be the same. For some OpenAI models, users should use separate models for embedding documents and queries. These models are denoted by the "-doc" and "-query" suffixes respectively.'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from pyspark.ml import PipelineModel\n\nembedding_query = (\n    OpenAIEmbedding()\n    .setSubscriptionKey(key)\n    .setDeploymentName(deployment_name_embeddings)\n    .setCustomServiceName(service_name)\n    .setTextCol("query")\n    .setErrorCol("error")\n    .setOutputCol("embeddings")\n)\n\nretrieval_model = PipelineModel(stages=[embedding_query, knn_index])\n')),(0,a.kt)("h2",{id:"step-9-retrieve-results"},"Step 9: Retrieve results"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'query_df = (\n    spark.createDataFrame(\n        [\n            (\n                0,\n                "desserts",\n            ),\n            (\n                1,\n                "disgusting",\n            ),\n        ]\n    )\n    .toDF("id", "query")\n    .withColumn("id", F.col("id").cast("int"))\n)\n\n\ndf_matches = retrieval_model.transform(query_df).cache()\n\ndf_result = (\n    df_matches.withColumn("match", F.explode("output"))\n    .join(df, df["id"] == F.col("match.value"))\n    .select("query", F.col("combined"), "match.distance")\n)\n\ndisplay(df_result)\n')))}m.isMDXComponent=!0}}]);