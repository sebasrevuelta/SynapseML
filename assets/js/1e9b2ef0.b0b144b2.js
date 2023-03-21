"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[7118],{3905:function(e,n,i){i.d(n,{Zo:function(){return c},kt:function(){return m}});var t=i(67294);function a(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function r(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function o(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?r(Object(i),!0).forEach((function(n){a(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function s(e,n){if(null==e)return{};var i,t,a=function(e,n){if(null==e)return{};var i,t,a={},r=Object.keys(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||(a[i]=e[i]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var l=t.createContext({}),p=function(e){var n=t.useContext(l),i=n;return e&&(i="function"==typeof e?e(n):o(o({},n),e)),i},c=function(e){var n=p(e.components);return t.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var i=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(i),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||r;return i?t.createElement(h,o(o({ref:n},c),{},{components:i})):t.createElement(h,o({ref:n},c))}));function m(e,n){var i=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=i.length,o=new Array(r);o[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<r;p++)o[p]=i[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,i)}d.displayName="MDXCreateElement"},22599:function(e,n,i){i.r(n),i.d(n,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var t=i(83117),a=i(80102),r=(i(67294),i(3905)),o=["components"],s={title:"Simple Deep Learning with SynapseML",sidebar_label:"About",name:"about"},l=void 0,p={unversionedId:"features/simple_deep_learning/about",id:"features/simple_deep_learning/about",title:"Simple Deep Learning with SynapseML",description:"Why Simple Deep Learning",source:"@site/docs/features/simple_deep_learning/about.md",sourceDirName:"features/simple_deep_learning",slug:"/features/simple_deep_learning/about",permalink:"/SynapseML/docs/next/features/simple_deep_learning/about",draft:!1,tags:[],version:"current",frontMatter:{title:"Simple Deep Learning with SynapseML",sidebar_label:"About"},sidebar:"docs",previous:{title:"DeepLearning - Deep Vision Classification",permalink:"/SynapseML/docs/next/features/simple_deep_learning/DeepLearning - Deep Vision Classification"},next:{title:"Installation Guidance for Deep Vision Classification",permalink:"/SynapseML/docs/next/features/simple_deep_learning/installation"}},c={},u=[{value:"Why Simple Deep Learning",id:"why-simple-deep-learning",level:3},{value:"SynapseML&#39;s Simple DNN",id:"synapsemls-simple-dnn",level:3},{value:"Why Horovod",id:"why-horovod",level:3},{value:"Why Pytorch Lightning",id:"why-pytorch-lightning",level:3},{value:"Sample usage with DeepVisionClassifier",id:"sample-usage-with-deepvisionclassifier",level:3},{value:"Examples",id:"examples",level:2}],d={toc:u};function m(e){var n=e.components,i=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,t.Z)({},d,i,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"why-simple-deep-learning"},"Why Simple Deep Learning"),(0,r.kt)("p",null,"Creating a Spark-compatible deep learning system can be challenging for users who may not have a\nthorough understanding of deep learning and distributed systems. Additionally, writing custom deep learning\nscripts may be a cumbersome and time-consuming task.\nSynapseML aims to simplify this process by building on top of the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/horovod/horovod"},"Horovod")," Estimator, a general-purpose\ndistributed deep learning model that is compatible with SparkML, and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Lightning-AI/lightning"},"Pytorch-lightning"),",\na lightweight wrapper around the popular PyTorch deep learning framework."),(0,r.kt)("p",null,"SynapseML's simple deep learning toolkit makes it easy to use modern deep learning methods in Apache Spark.\nBy providing a collection of Estimators, SynapseML enables users to perform distributed transfer learning on\nspark clusters to solve custom machine learning tasks without requiring in-depth domain expertise.\nWhether you're a data scientist, data engineer, or business analyst this project aims to make modern deep-learning methods easy to use for new domain-specific problems."),(0,r.kt)("h3",{id:"synapsemls-simple-dnn"},"SynapseML's Simple DNN"),(0,r.kt)("p",null,"SynapseML goes beyond the limited support for deep networks in SparkML and provides out-of-the-box solutions for various common scenarios:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Visual Classification: Users can apply transfer learning for image classification tasks, using pretrained models and fine-tuning them to solve custom classification problems."),(0,r.kt)("li",{parentName:"ul"},"Text Classification: SynapseML simplifies the process of implementing natural language processing tasks such as sentiment analysis, text classification, and language modeling by providing prebuilt models and tools."),(0,r.kt)("li",{parentName:"ul"},"And more coming soon")),(0,r.kt)("h3",{id:"why-horovod"},"Why Horovod"),(0,r.kt)("p",null,"Horovod is a distributed deep learning framework developed by Uber, which has become popular for its ability to scale\ndeep learning tasks across multiple GPUs and compute nodes efficiently. It's designed to work with TensorFlow, Keras, PyTorch, and Apache MXNet."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Scalability: Horovod uses efficient communication algorithms like ring-allreduce and hierarchical all reduce, which allow it to scale the training process across multiple GPUs and nodes without significant performance degradation."),(0,r.kt)("li",{parentName:"ul"},"Easy Integration: Horovod can be easily integrated into existing deep learning codebases with minimal changes, making it a popular choice for distributed training."),(0,r.kt)("li",{parentName:"ul"},"Fault Tolerance: Horovod provides fault tolerance features like elastic training. It can dynamically adapt to changes in the number of workers or recover from failures."),(0,r.kt)("li",{parentName:"ul"},"Community Support: Horovod has an active community and is widely used in the industry, which ensures that the framework is continually updated and improved.")),(0,r.kt)("h3",{id:"why-pytorch-lightning"},"Why Pytorch Lightning"),(0,r.kt)("p",null,"PyTorch Lightning is a lightweight wrapper around the popular PyTorch deep learning framework, designed to make it\neasier to write clean, modular, and scalable deep learning code. PyTorch Lightning has several advantages that\nmake it an excellent choice for SynapseML's Simple Deep Learning:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Code Organization: PyTorch Lightning promotes a clean and organized code structure by separating the research code from the engineering code. This property makes it easier to maintain, debug, and share deep learning models."),(0,r.kt)("li",{parentName:"ul"},"Flexibility: PyTorch Lightning retains the flexibility and expressiveness of PyTorch while adding useful abstractions to simplify the training loop and other boilerplate code."),(0,r.kt)("li",{parentName:"ul"},"Built-in Best Practices: PyTorch Lightning incorporates many best practices for deep learning, such as automatic optimization, gradient clipping, and learning rate scheduling, making it easier for users to achieve optimal performance."),(0,r.kt)("li",{parentName:"ul"},"Compatibility: PyTorch Lightning is compatible with a wide range of popular tools and frameworks, including Horovod, which allows users to easily use distributed training capabilities."),(0,r.kt)("li",{parentName:"ul"},"Rapid Development: With PyTorch Lightning, users can quickly experiment with different model architectures and training strategies without worrying about low-level implementation details.")),(0,r.kt)("h3",{id:"sample-usage-with-deepvisionclassifier"},"Sample usage with DeepVisionClassifier"),(0,r.kt)("p",null,"DeepVisionClassifier incorporates all models supported by ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pytorch/vision"},"torchvision"),". "),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"The current version is based on pytorch_lightning v1.5.0 and torchvision v0.12.0")),(0,r.kt)("p",null,"By providing a spark dataframe that contains an 'imageCol' and 'labelCol', you could directly apply 'transform' function\non it with DeepVisionClassifier."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'train_df = spark.createDataframe([\n    ("PATH_TO_IMAGE_1.jpg", 1),\n    ("PATH_TO_IMAGE_2.jpg", 2)\n], ["image", "label"])\n\ndeep_vision_classifier = DeepVisionClassifier(\n    backbone="resnet50", # Put your backbone here\n    store=store, # Corresponding store\n    callbacks=callbacks, # Optional callbacks\n    num_classes=17,\n    batch_size=16,\n    epochs=epochs,\n    validation=0.1,\n)\n\ndeep_vision_model = deep_vision_classifier.fit(train_df)\n')),(0,r.kt)("p",null,"DeepVisionClassifier does distributed-training on spark with Horovod under the hood, after this fitting process it returns\na DeepVisionModel. With this code you could use the model for inference directly:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"pred_df = deep_vision_model.transform(test_df)\n")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../DeepLearning%20-%20Deep%20Vision%20Classification"},"DeepLearning - Deep Vision Classification")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../DeepLearning%20-%20Deep%20Text%20Classification"},"DeepLearning - Deep Text Classification"))))}m.isMDXComponent=!0}}]);