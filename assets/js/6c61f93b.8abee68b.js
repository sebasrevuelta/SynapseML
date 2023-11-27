"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[3202],{3905:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},i=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),p=c(r),d=a,f=p["".concat(u,".").concat(d)]||p[d]||m[d]||l;return r?n.createElement(f,o(o({ref:t},i),{},{components:r})):n.createElement(f,o({ref:t},i))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<l;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},85162:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(67294),a=r(86010);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:r,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,o),hidden:r},t)}},74866:(e,t,r)=>{r.d(t,{Z:()=>k});var n=r(83117),a=r(67294),l=r(86010),o=r(12466),s=r(16550),u=r(91980),c=r(67392),i=r(50012);function m(e){return function(e){var t,r;return null!=(t=null==(r=a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:r.filter(Boolean))?t:[]}(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}function p(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=null!=t?t:m(r);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,r])}function d(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const n=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=r?r:null}({queryString:t,groupId:r});return[(0,u._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function b(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,l=p(e),[o,s]=(0,a.useState)((()=>function(e){var t;let{defaultValue:r,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!d({value:r,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+r+'" but none of its children has the corresponding value. Available values are: '+n.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return r}const a=null!=(t=n.find((e=>e.default)))?t:n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[u,c]=f({queryString:r,groupId:n}),[m,b]=function(e){let{groupId:t}=e;const r=function(e){return e?"docusaurus.tab."+e:null}(t),[n,l]=(0,i.Nk)(r);return[n,(0,a.useCallback)((e=>{r&&l.set(e)}),[r,l])]}({groupId:n}),y=(()=>{const e=null!=u?u:m;return d({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{y&&s(y)}),[y]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error("Can't select invalid tab value="+e);s(e),c(e),b(e)}),[c,b,l]),tabValues:l}}var y=r(72389);const v="tabList__CuJ",h="tabItem_LNqP";function g(e){let{className:t,block:r,selectedValue:s,selectValue:u,tabValues:c}=e;const i=[],{blockElementScrollPositionUntilNextRender:m}=(0,o.o5)(),p=e=>{const t=e.currentTarget,r=i.indexOf(t),n=c[r].value;n!==s&&(m(t),u(n))},d=e=>{var t;let r=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{var n;const t=i.indexOf(e.currentTarget)+1;r=null!=(n=i[t])?n:i[0];break}case"ArrowLeft":{var a;const t=i.indexOf(e.currentTarget)-1;r=null!=(a=i[t])?a:i[i.length-1];break}}null==(t=r)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":r},t)},c.map((e=>{let{value:t,label:r,attributes:o}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>i.push(e),onKeyDown:d,onClick:p},o,{className:(0,l.Z)("tabs__item",h,null==o?void 0:o.className,{"tabs__item--active":s===t})}),null!=r?r:t)})))}function E(e){let{lazy:t,children:r,selectedValue:n}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function T(e){const t=b(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",v)},a.createElement(g,(0,n.Z)({},e,t)),a.createElement(E,(0,n.Z)({},e,t)))}function k(e){const t=(0,y.Z)();return a.createElement(T,(0,n.Z)({key:String(t)},e))}},31989:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294),a=r(52263);const l=function(e){const{className:t,py:r,scala:l,csharp:o,sourceLink:s}=e,u=(0,a.Z)().siteConfig.customFields.version;let c="https://mmlspark.blob.core.windows.net/docs/"+u+"/pyspark/"+r,i="https://mmlspark.blob.core.windows.net/docs/"+u+"/scala/"+l,m="https://mmlspark.blob.core.windows.net/docs/"+u+"/dotnet/"+o;return n.createElement("table",null,n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,n.createElement("strong",null,"Python API: "),n.createElement("a",{href:c},t)),n.createElement("td",null,n.createElement("strong",null,"Scala API: "),n.createElement("a",{href:i},t)),n.createElement("td",null,n.createElement("strong",null,".NET API: "),n.createElement("a",{href:m},t)),n.createElement("td",null,n.createElement("strong",null,"Source: "),n.createElement("a",{href:s},t)))))}},78968:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>f,contentTitle:()=>p,default:()=>v,frontMatter:()=>m,metadata:()=>d,toc:()=>b});var n=r(83117),a=(r(67294),r(3905)),l=r(74866),o=r(85162),s=r(31989);const u=[{value:"DoubleMLEstimator",id:"doublemlestimator",level:2}],c={toc:u};function i(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"doublemlestimator"},"DoubleMLEstimator"),(0,a.kt)(l.Z,{defaultValue:"py",values:[{label:"Python",value:"py"},{label:"Scala",value:"scala"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"py",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.causal import *\nfrom pyspark.ml.classification import LogisticRegression\nfrom pyspark.sql.types import StructType, StructField, DoubleType, IntegerType, BooleanType\n\nschema = StructType([\n    StructField("Treatment", BooleanType()),\n    StructField("Outcome", BooleanType()),\n    StructField("col2", DoubleType()),\n    StructField("col3", DoubleType()),\n    StructField("col4", DoubleType())\n    ])\n\n\ndf = spark.createDataFrame([\n      (False, True, 0.30, 0.66, 0.2),\n      (True, False, 0.38, 0.53, 1.5),\n      (False, True, 0.68, 0.98, 3.2),\n      (True, False, 0.15, 0.32, 6.6),\n      (False, True, 0.50, 0.65, 2.8),\n      (True, True, 0.40, 0.54, 3.7),\n      (False, True, 0.78, 0.97, 8.1),\n      (True, False, 0.12, 0.32, 10.2),\n      (False, True, 0.35, 0.63, 1.8),\n      (True, False, 0.45, 0.57, 4.3),\n      (False, True, 0.75, 0.97, 7.2),\n      (True, True, 0.16, 0.32, 11.7)], schema\n)\n\ndml = (DoubleMLEstimator()\n      .setTreatmentCol("Treatment")\n      .setTreatmentModel(LogisticRegression())\n      .setOutcomeCol("Outcome")\n      .setOutcomeModel(LogisticRegression())\n      .setMaxIter(20))\n\ndmlModel = dml.fit(df)\ndmlModel.getAvgTreatmentEffect()\ndmlModel.getConfidenceInterval()\n'))),(0,a.kt)(o.Z,{value:"scala",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-scala"},'import com.microsoft.azure.synapse.ml.causal._\nimport org.apache.spark.ml.classification.LogisticRegression\n\nval df = (Seq(\n  (false, true, 0.50, 0.60, 0),\n  (true, false, 0.40, 0.50, 1),\n  (false, true, 0.78, 0.99, 2),\n  (true, false, 0.12, 0.34, 3),\n  (false, true, 0.50, 0.60, 0),\n  (true, false, 0.40, 0.50, 1),\n  (false, true, 0.78, 0.99, 2),\n  (true, false, 0.12, 0.34, 3),\n  (false, false, 0.50, 0.60, 0),\n  (true, true, 0.40, 0.50, 1),\n  (false, true, 0.78, 0.99, 2),\n  (true, false, 0.12, 0.34, 3))\n  .toDF("Treatment", "Outcome", "col2", "col3", "col4"))\n\nval dml = (new DoubleMLEstimator()\n  .setTreatmentCol("Treatment")\n  .setTreatmentModel(new LogisticRegression())\n  .setOutcomeCol("Outcome")\n  .setOutcomeModel(new LogisticRegression())\n  .setMaxIter(20))\n\nval dmlModel = dml.fit(df)\ndmlModel.getAvgTreatmentEffect\ndmlModel.getConfidenceInterval\n')))),(0,a.kt)(s.Z,{className:"DoubleMLEstimator",py:"synapse.ml.causal.html#module-synapse.ml.causal.DoubleMLEstimator",scala:"com/microsoft/azure/synapse/ml/causal/DoubleMLEstimator.html",csharp:"classSynapse_1_1ML_1_1Causal_1_1DoubleMLEstimator.html",sourceLink:"https://github.com/microsoft/SynapseML/blob/master/core/src/main/scala/com/microsoft/azure/synapse/ml/causal/DoubleMLEstimator.scala",mdxType:"DocTable"}))}i.isMDXComponent=!0;const m={title:"Estimators - Causal",sidebar_label:"Causal Inference",hide_title:!0},p="Causal Inference",d={unversionedId:"Quick Examples/estimators/estimators_causal",id:"version-1.0.2/Quick Examples/estimators/estimators_causal",title:"Estimators - Causal",description:"",source:"@site/versioned_docs/version-1.0.2/Quick Examples/estimators/estimators_causal.md",sourceDirName:"Quick Examples/estimators",slug:"/Quick Examples/estimators/estimators_causal",permalink:"/SynapseML/docs/Quick Examples/estimators/estimators_causal",draft:!1,tags:[],version:"1.0.2",frontMatter:{title:"Estimators - Causal",sidebar_label:"Causal Inference",hide_title:!0}},f={},b=[...u],y={toc:b};function v(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},y,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"causal-inference"},"Causal Inference"),(0,a.kt)(i,{mdxType:"DoubleMLEstimator"}))}v.isMDXComponent=!0}}]);