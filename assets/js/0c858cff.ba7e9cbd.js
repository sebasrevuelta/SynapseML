"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[4723],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return k}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(n),k=a,d=m["".concat(s,".").concat(k)]||m[k]||u[k]||l;return n?r.createElement(d,o(o({ref:t},p),{},{components:n})):r.createElement(d,o({ref:t},p))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},94571:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return u}});var r=n(83117),a=n(80102),l=(n(67294),n(3905)),o=["components"],i={title:"Mlflow Installation",description:"install Mlflow on different environments"},s=void 0,c={unversionedId:"mlflow/installation",id:"version-0.11.0/mlflow/installation",title:"Mlflow Installation",description:"install Mlflow on different environments",source:"@site/versioned_docs/version-0.11.0/mlflow/installation.md",sourceDirName:"mlflow",slug:"/mlflow/installation",permalink:"/SynapseML/docs/mlflow/installation",draft:!1,tags:[],version:"0.11.0",frontMatter:{title:"Mlflow Installation",description:"install Mlflow on different environments"},sidebar:"docs",previous:{title:"Introduction",permalink:"/SynapseML/docs/mlflow/introduction"},next:{title:"Examples",permalink:"/SynapseML/docs/mlflow/examples"}},p={},u=[{value:"Installation",id:"installation",level:2},{value:"Install Mlflow on Databricks",id:"install-mlflow-on-databricks",level:3},{value:"Install Mlflow on Synapse",id:"install-mlflow-on-synapse",level:3},{value:"Create Azure Machine Learning Workspace",id:"create-azure-machine-learning-workspace",level:4},{value:"Create an Azure ML Linked Service",id:"create-an-azure-ml-linked-service",level:4},{value:"Auth Synapse Workspace",id:"auth-synapse-workspace",level:4},{value:"Use Mlflow in Synapse",id:"use-mlflow-in-synapse",level:4},{value:"Alternative (Don&#39;t need Linked Service)",id:"alternative-dont-need-linked-service",level:4}],m={toc:u};function k(e){var t=e.components,n=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)("p",null,"Install MLflow from PyPI via ",(0,l.kt)("inlineCode",{parentName:"p"},"pip install mlflow")),(0,l.kt)("p",null,"MLflow requires ",(0,l.kt)("inlineCode",{parentName:"p"},"conda")," to be on the ",(0,l.kt)("inlineCode",{parentName:"p"},"PATH")," for the projects feature."),(0,l.kt)("p",null,"Learn more about MLflow on their ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/mlflow/mlflow"},"GitHub page"),"."),(0,l.kt)("h3",{id:"install-mlflow-on-databricks"},"Install Mlflow on Databricks"),(0,l.kt)("p",null,"If you're using Databricks, install Mlflow with this command:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"# run this so that Mlflow is installed on workers besides driver\n%pip install mlflow\n")),(0,l.kt)("h3",{id:"install-mlflow-on-synapse"},"Install Mlflow on Synapse"),(0,l.kt)("p",null,"To log model with Mlflow, you need to create an Azure Machine Learning workspace and link it with your Synapse workspace."),(0,l.kt)("h4",{id:"create-azure-machine-learning-workspace"},"Create Azure Machine Learning Workspace"),(0,l.kt)("p",null,"Follow this document to create ",(0,l.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/azure/machine-learning/quickstart-create-resources#create-the-workspace"},"AML workspace"),". You don't need to create compute instance and compute clusters."),(0,l.kt)("h4",{id:"create-an-azure-ml-linked-service"},"Create an Azure ML Linked Service"),(0,l.kt)("img",{src:"https://mmlspark.blob.core.windows.net/graphics/Documentation/ml_linked_service_1.png",width:"600"}),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"In the Synapse workspace, go to ",(0,l.kt)("strong",{parentName:"li"},"Manage")," -> ",(0,l.kt)("strong",{parentName:"li"},"External connections")," -> ",(0,l.kt)("strong",{parentName:"li"},"Linked services"),", select ",(0,l.kt)("strong",{parentName:"li"},"+ New")),(0,l.kt)("li",{parentName:"ul"},"Select the workspace you want to log the model in and create the linked service. You need the ",(0,l.kt)("strong",{parentName:"li"},"name of the linked service")," to set up connection.")),(0,l.kt)("h4",{id:"auth-synapse-workspace"},"Auth Synapse Workspace"),(0,l.kt)("img",{src:"https://mmlspark.blob.core.windows.net/graphics/Documentation/ml_linked_service_2.png",width:"600"}),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Go to the ",(0,l.kt)("strong",{parentName:"li"},"Azure Machine Learning workspace")," resource -> ",(0,l.kt)("strong",{parentName:"li"},"access control (IAM)")," -> ",(0,l.kt)("strong",{parentName:"li"},"Role assignment"),", select ",(0,l.kt)("strong",{parentName:"li"},"+ Add"),", choose ",(0,l.kt)("strong",{parentName:"li"},"Add role assignment")),(0,l.kt)("li",{parentName:"ul"},"Choose ",(0,l.kt)("strong",{parentName:"li"},"contributor"),", select next"),(0,l.kt)("li",{parentName:"ul"},"In members page, choose ",(0,l.kt)("strong",{parentName:"li"},"Managed identity"),", select  ",(0,l.kt)("strong",{parentName:"li"},"+ select members"),". Under ",(0,l.kt)("strong",{parentName:"li"},"managed identity"),", choose Synapse workspace. Under ",(0,l.kt)("strong",{parentName:"li"},"Select"),", choose the workspace you run your experiment on. Click ",(0,l.kt)("strong",{parentName:"li"},"Select"),", ",(0,l.kt)("strong",{parentName:"li"},"Review + assign"),".")),(0,l.kt)("h4",{id:"use-mlflow-in-synapse"},"Use Mlflow in Synapse"),(0,l.kt)("p",null,"Set up connection"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-python"},'\n#AML\xa0workspace\xa0authentication\xa0using\xa0linked\xa0service\nfrom\xa0notebookutils.mssparkutils\xa0import\xa0azureML\nlinked_service_name = "YourLinkedServiceName"\nws\xa0=\xa0azureML.getWorkspace(linked_service_name)\nmlflow.set_tracking_uri(ws.get_mlflow_tracking_uri())\n\n#Set\xa0MLflow\xa0experiment.\xa0\nexperiment_name\xa0=\xa0"synapse-mlflow-experiment"\nmlflow.set_experiment(experiment_name)\xa0\n')),(0,l.kt)("h4",{id:"alternative-dont-need-linked-service"},"Alternative (Don't need Linked Service)"),(0,l.kt)("p",null,"Once you create an AML workspace, you can obtain the MLflow tracking URL directly. The AML start page is where you can locate the MLflow tracking URL."),(0,l.kt)("img",{src:"https://mmlspark.blob.core.windows.net/graphics/Documentation/mlflow_tracking_url.png",width:"600"}),'You can set it tracking url with ```python mlflow.set_tracking_uri("your mlflow tracking url") ```')}k.isMDXComponent=!0}}]);