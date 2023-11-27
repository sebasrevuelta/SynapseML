"use strict";(self.webpackChunksynapseml=self.webpackChunksynapseml||[]).push([[6945],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var o=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||s;return n?o.createElement(h,r(r({ref:t},d),{},{components:n})):o.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,r=new Array(s);r[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var p=2;p<s;p++)r[p]=n[p];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},87853:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var o=n(83117),a=(n(67294),n(3905));const s={title:"Quickstart - Flooding Risk",hide_title:!0,status:"stable"},r="Visualizing Customer addresses on a flood plane",i={unversionedId:"Explore Algorithms/AI Services/Quickstart - Flooding Risk",id:"version-1.0.1/Explore Algorithms/AI Services/Quickstart - Flooding Risk",title:"Quickstart - Flooding Risk",description:"King County (WA) publishes flood plain data as well as tax parcel data. We can use the addresses in the tax parcel data and use the geocoder to calculate coordinates. Using this coordinates and the flood plain data we can enrich out dataset with a flag indicating whether the house is in a flood zone or not.",source:"@site/versioned_docs/version-1.0.1/Explore Algorithms/AI Services/Quickstart - Flooding Risk.md",sourceDirName:"Explore Algorithms/AI Services",slug:"/Explore Algorithms/AI Services/Quickstart - Flooding Risk",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/AI Services/Quickstart - Flooding Risk",draft:!1,tags:[],version:"1.0.1",frontMatter:{title:"Quickstart - Flooding Risk",hide_title:!0,status:"stable"},sidebar:"docs",previous:{title:"Quickstart - Document Question and Answering with PDFs",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/AI Services/Quickstart - Document Question and Answering with PDFs"},next:{title:"Quickstart - Predictive Maintenance",permalink:"/SynapseML/docs/1.0.1/Explore Algorithms/AI Services/Quickstart - Predictive Maintenance"}},l={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Load address data:",id:"load-address-data",level:3},{value:"Wire-up the Address Geocoder",id:"wire-up-the-address-geocoder",level:3},{value:"Setup Check Point In Polygon",id:"setup-check-point-in-polygon",level:3},{value:"Cleanup Uploaded User Data (Optional)",id:"cleanup-uploaded-user-data-optional",level:3}],d={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"visualizing-customer-addresses-on-a-flood-plane"},"Visualizing Customer addresses on a flood plane"),(0,a.kt)("p",null,"King County (WA) publishes flood plain data as well as tax parcel data. We can use the addresses in the tax parcel data and use the geocoder to calculate coordinates. Using this coordinates and the flood plain data we can enrich out dataset with a flag indicating whether the house is in a flood zone or not."),(0,a.kt)("p",null,"The following data has been sourced from King County's Open data portal. ",(0,a.kt)("a",{parentName:"p",href:"https://data.kingcounty.gov/"},(0,a.kt)("em",{parentName:"a"},"Link"))),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://mmlspark.blob.core.windows.net/publicwasb/maps/KingCountyAddress.csv"},"Address Data")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://mmlspark.blob.core.windows.net/publicwasb/maps/KingCountyFloodPlains.geojson"},"Flood plains"))),(0,a.kt)("p",null,"For this demonstration, please follow the instructions on setting up your azure maps account from the overview notebook."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Upload the flood plains data as map data to your creator resource")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'import json\nimport time\nimport requests\nfrom requests.adapters import HTTPAdapter\nfrom requests.packages.urllib3.util.retry import Retry\n\n# Configure more resiliant requests to stop flakiness\nretry_strategy = Retry(\n    total=3,\n    status_forcelist=[429, 500, 502, 503, 504],\n    allowed_methods=["HEAD", "GET", "PUT", "DELETE", "OPTIONS", "TRACE"],\n)\nadapter = HTTPAdapter(max_retries=retry_strategy)\nhttp = requests.Session()\nhttp.mount("https://", adapter)\nhttp.mount("http://", adapter)\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from synapse.ml.core.platform import *\n\n# Azure Maps account key\nmaps_key = find_secret(\n    secret_name="azuremaps-api-key", keyvault="mmlspark-build-keys"\n)  # Replace this with your azure maps key\n\n# Creator Geo prefix\n# for this example, assuming that the creator resource is created in `EAST US 2`.\natlas_geo_prefix = "us"\n\n# Load flood plains data\nflood_plain_geojson = http.get(\n    "https://mmlspark.blob.core.windows.net/publicwasb/maps/KingCountyFloodPlains.geojson"\n).content\n\n# Upload this flood plains data to your maps/creator account. This is a Long-Running async operation and takes approximately 15~30 seconds to complete\nr = http.post(\n    f"https://{atlas_geo_prefix}.atlas.microsoft.com/mapData/upload?api-version=1.0&dataFormat=geojson&subscription-key={maps_key}",\n    json=json.loads(flood_plain_geojson),\n)\n\n# Poll for resource upload completion\nresource_location = r.headers.get("location")\nfor _ in range(20):\n    resource = json.loads(\n        http.get(f"{resource_location}&subscription-key={maps_key}").content\n    )\n    status = resource["status"].lower()\n    if status == "running":\n        time.sleep(5)  # wait in a polling loop\n    elif status == "succeeded":\n        break\n    else:\n        raise ValueError("Unknown status {}".format(status))\n\n# Once the above operation returns a HTTP 201, get the user_data_id of the flood plains data, you uploaded to your map account.\nuser_data_id_resource_url = resource["resourceLocation"]\nuser_data_id = json.loads(\n    http.get(f"{user_data_id_resource_url}&subscription-key={maps_key}").content\n)["udid"]\n')),(0,a.kt)("p",null,"Now that we have the flood plains data setup in our maps account, we can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"CheckPointInPolygon")," function to check if a location ",(0,a.kt)("inlineCode",{parentName:"p"},"(lat,lon)")," coordinate is in a flood zone."),(0,a.kt)("h3",{id:"load-address-data"},"Load address data:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'data = spark.read.option("header", "true").csv(\n    "wasbs://publicwasb@mmlspark.blob.core.windows.net/maps/KingCountyAddress.csv"\n)\n\n# Visualize incoming schema\nprint("Schema:")\ndata.printSchema()\n\n# Choose a subset of the data for this example\nsubset_data = data.limit(50)\ndisplay(subset_data)\n')),(0,a.kt)("h3",{id:"wire-up-the-address-geocoder"},"Wire-up the Address Geocoder"),(0,a.kt)("p",null,"We will use the address geocoder to enrich the dataset with location coordinates of the addresses."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'from pyspark.sql.functions import col\nfrom synapse.ml.stages import FixedMiniBatchTransformer, FlattenBatch\nfrom synapse.ml.services.geospatial import *\n\n\ndef extract_location_fields(df):\n    # Use this function to select only lat/lon columns into the dataframe\n    return df.select(\n        col("*"),\n        col("output.response.results")\n        .getItem(0)\n        .getField("position")\n        .getField("lat")\n        .alias("Latitude"),\n        col("output.response.results")\n        .getItem(0)\n        .getField("position")\n        .getField("lon")\n        .alias("Longitude"),\n    ).drop("output")\n\n\n# Azure Maps geocoder to enhance the dataframe with location data\ngeocoder = (\n    AddressGeocoder()\n    .setSubscriptionKey(maps_key)\n    .setAddressCol("FullAddress")\n    .setOutputCol("output")\n)\n\n# Set up a fixed mini batch transformer to geocode addresses\nbatched_dataframe = geocoder.transform(\n    FixedMiniBatchTransformer().setBatchSize(10).transform(subset_data.coalesce(1))\n)\ngeocoded_addresses = extract_location_fields(\n    FlattenBatch().transform(batched_dataframe)\n)\n\n# Display the results\ndisplay(geocoded_addresses)\n')),(0,a.kt)("p",null,"Now that we have geocoded the addresses, we can now use the ",(0,a.kt)("inlineCode",{parentName:"p"},"CheckPointInPolygon")," function to check if a property is in a flood zone or not."),(0,a.kt)("h3",{id:"setup-check-point-in-polygon"},"Setup Check Point In Polygon"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'def extract_point_in_polygon_result_fields(df):\n    # Use this function to select only lat/lon columns into the dataframe\n    return df.select(\n        col("*"),\n        col("output.result.pointInPolygons").alias("In Polygon"),\n        col("output.result.intersectingGeometries").alias("Intersecting Polygons"),\n    ).drop("output")\n\n\ncheck_point_in_polygon = (\n    CheckPointInPolygon()\n    .setSubscriptionKey(maps_key)\n    .setGeography(atlas_geo_prefix)\n    .setUserDataIdentifier(user_data_id)\n    .setLatitudeCol("Latitude")\n    .setLongitudeCol("Longitude")\n    .setOutputCol("output")\n)\n\n\nflood_plain_addresses = extract_point_in_polygon_result_fields(\n    check_point_in_polygon.transform(geocoded_addresses)\n)\n\n# Display the results\ndisplay(flood_plain_addresses)\n')),(0,a.kt)("h3",{id:"cleanup-uploaded-user-data-optional"},"Cleanup Uploaded User Data (Optional)"),(0,a.kt)("p",null,"You can (optionally) delete the uploaded geojson polygon."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'res = http.delete(\n    f"https://{atlas_geo_prefix}.atlas.microsoft.com/mapData/{user_data_id}?api-version=1.0&subscription-key={maps_key}"\n)\n')))}c.isMDXComponent=!0}}]);