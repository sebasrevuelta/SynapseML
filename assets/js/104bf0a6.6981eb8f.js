"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[8314],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,b=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(b,a(a({ref:t},c),{},{components:n})):r.createElement(b,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,a[1]=u;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5734:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return u},metadata:function(){return s},toc:function(){return p}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],u={title:"Contributor Guide",hide_title:!0,sidebar_label:"Contributor Guide",description:"Contributor Guide"},l=void 0,s={unversionedId:"Reference/Contributor Guide",id:"Reference/Contributor Guide",title:"Contributor Guide",description:"Contributor Guide",source:"@site/docs/Reference/Contributor Guide.md",sourceDirName:"Reference",slug:"/Reference/Contributor Guide",permalink:"/SynapseML/docs/next/Reference/Contributor Guide",draft:!1,tags:[],version:"current",frontMatter:{title:"Contributor Guide",hide_title:!0,sidebar_label:"Contributor Guide",description:"Contributor Guide"},sidebar:"docs",previous:{title:"Quickstart - Deploying a Classifier",permalink:"/SynapseML/docs/next/Deploy Models/Quickstart - Deploying a Classifier"},next:{title:"Developer Setup",permalink:"/SynapseML/docs/next/Reference/Developer Setup"}},c={},p=[{value:"Interested in contributing to SynapseML?  We&#39;re excited to work with you.",id:"interested-in-contributing-to-synapseml--were-excited-to-work-with-you",level:2},{value:"You can contribute in many ways:",id:"you-can-contribute-in-many-ways",level:3},{value:"How to contribute?",id:"how-to-contribute",level:3},{value:"Propose a contribution",id:"propose-a-contribution",level:4},{value:"Implement your contribution",id:"implement-your-contribution",level:4},{value:"Implement tests",id:"implement-tests",level:4},{value:"Implement documentation",id:"implement-documentation",level:4},{value:"Open a pull request",id:"open-a-pull-request",level:4},{value:"Build and check-in",id:"build-and-check-in",level:4}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"interested-in-contributing-to-synapseml--were-excited-to-work-with-you"},"Interested in contributing to SynapseML?  We're excited to work with you."),(0,i.kt)("h3",{id:"you-can-contribute-in-many-ways"},"You can contribute in many ways:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Use the library and give feedback: report bugs, request features."),(0,i.kt)("li",{parentName:"ul"},"Add sample Jupyter notebooks, Python or Scala code examples, documentation\npages."),(0,i.kt)("li",{parentName:"ul"},"Fix bugs and issues."),(0,i.kt)("li",{parentName:"ul"},"Add new features, such as data transformations or machine learning algorithms."),(0,i.kt)("li",{parentName:"ul"},"Review pull requests from other contributors.")),(0,i.kt)("h3",{id:"how-to-contribute"},"How to contribute?"),(0,i.kt)("p",null,"You can give feedback, report bugs and request new features anytime by opening\nan issue.  Also, you can up-vote or comment on existing issues."),(0,i.kt)("p",null,"If you want to add code, examples or documentation to the repository, follow\nthis process:"),(0,i.kt)("h4",{id:"propose-a-contribution"},"Propose a contribution"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Preferably, get started by tackling existing issues to get yourself acquainted\nwith the library source and the process."),(0,i.kt)("li",{parentName:"ul"},"To ensure your contribution is a good fit and doesn't duplicate\non-going work, open an issue or comment on an existing issue. In it, discuss\nyour contribution and design."),(0,i.kt)("li",{parentName:"ul"},"Any algorithm you're planning to contribute should be well known and accepted\nfor production use, and backed by research papers."),(0,i.kt)("li",{parentName:"ul"},"Algorithms should be highly scalable and suitable for massive datasets."),(0,i.kt)("li",{parentName:"ul"},"All contributions need to comply with the MIT License.  Contributors external\nto Microsoft need to sign CLA.")),(0,i.kt)("h4",{id:"implement-your-contribution"},"Implement your contribution"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Fork the SynapseML repository."),(0,i.kt)("li",{parentName:"ul"},"Implement your algorithm in Scala, using our wrapper generation mechanism to\nproduce PySpark bindings."),(0,i.kt)("li",{parentName:"ul"},"Use SparkML ",(0,i.kt)("inlineCode",{parentName:"li"},"PipelineStage"),"s so your algorithm can be used as a part of\npipeline."),(0,i.kt)("li",{parentName:"ul"},"For parameters use ",(0,i.kt)("inlineCode",{parentName:"li"},"MMLParam"),"s."),(0,i.kt)("li",{parentName:"ul"},"Implement model saving and loading by extending SparkML ",(0,i.kt)("inlineCode",{parentName:"li"},"MLReadable"),"."),(0,i.kt)("li",{parentName:"ul"},"Use good Scala style."),(0,i.kt)("li",{parentName:"ul"},"Binary dependencies should be on Maven Central."),(0,i.kt)("li",{parentName:"ul"},"See this ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/Microsoft/SynapseML/pull/22"},"pull request")," for an\nexample contribution.")),(0,i.kt)("h4",{id:"implement-tests"},"Implement tests"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Set up build environment.  Use a Linux machine or VM (we use Ubuntu, but other\ndistros should work too)."),(0,i.kt)("li",{parentName:"ul"},"Test your code locally."),(0,i.kt)("li",{parentName:"ul"},"Add tests using ScalaTests. Unit tests are required."),(0,i.kt)("li",{parentName:"ul"},"A sample notebook is required as an end-to-end test.")),(0,i.kt)("h4",{id:"implement-documentation"},"Implement documentation"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Add a ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/microsoft/SynapseML/tree/master/notebooks"},"sample Jupyter notebook")," that shows the intended use\ncase of your algorithm, with instructions in step-by-step manner.  (The same\nnotebook could be used for testing the code.)"),(0,i.kt)("li",{parentName:"ul"},"Add in-line ScalaDoc comments to your source code, to generate the ",(0,i.kt)("a",{parentName:"li",href:"https://mmlspark.azureedge.net/docs/pyspark/"},"API\nreference documentation"))),(0,i.kt)("h4",{id:"open-a-pull-request"},"Open a pull request"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"In most cases, you should squash your commits into one."),(0,i.kt)("li",{parentName:"ul"},"Open a pull request, and link it to the discussion issue you created earlier."),(0,i.kt)("li",{parentName:"ul"},"A SynapseML core team member will trigger a build to test your changes."),(0,i.kt)("li",{parentName:"ul"},"Fix any build failures.  (The pull request will have comments from the build\nwith useful links.)"),(0,i.kt)("li",{parentName:"ul"},"Wait for code reviews from core team members and others."),(0,i.kt)("li",{parentName:"ul"},"Fix issues found in code review and reiterate.")),(0,i.kt)("h4",{id:"build-and-check-in"},"Build and check-in"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Wait for a core team member to merge your code in."),(0,i.kt)("li",{parentName:"ul"},"Your feature will be available through a Docker image and script installation\nin the next release, which typically happens around once a month.  You can try\nout your features sooner by using build artifacts for the version that has\nyour changes merged in (such versions end with a ",(0,i.kt)("inlineCode",{parentName:"li"},".devN"),").")),(0,i.kt)("p",null,"If in doubt about how to do something, see how it was done in existing code or\npull requests, and don't hesitate to ask."))}m.isMDXComponent=!0}}]);