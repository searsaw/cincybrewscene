"use strict";function formatDepot(t){return{geometry:{x:t.loc[0],y:t.loc[1]},attributes:{Name:t.name}}}function getDepots(t){return{features:t.map(formatDepot)}}function formatOrder(t){return{geometry:{x:t.loc[0],y:t.loc[1]},attributes:{Name:t.name}}}function getOrders(t){return{features:t.map(formatOrder)}}function getRoutes(){return{attributes:[{Name:"Main Route"}]}}function showRoutes(t){console.log("showRoutes",t)}function showStops(t){console.log("showStops",t)}function showDirections(t){console.log("showDirections",t)}function getGeomappingDataFromArcGis(t,e,o){var i="https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem",n=process.env.ARCGIS_KEY,s=o.slice(0,1),r=o.slice(1),c=new t(i+"?token="+n),a={default_date:14556096e5,time_units:"Minutes",distance_units:"Miles",depots:JSON.stringify(getDepots(s)),orders:JSON.stringify(getOrders(r)),routes:JSON.stringify(getRoutes()),populate_directions:!0};c.submitJob(a).then(function(t){console.log("results",t),c.getResultData(t.jobId,"out_routes").then(showRoutes),c.getResultData(t.jobId,"out_stops").then(showStops),c.getResultData(t.jobId,"out_directions").then(showDirections)})}function setupGeomapping(t,e){var o=[{_id:"5765f170bad0f48e9605cdc4",name:"Fibonacci Brewing Company",address:"1445 Compton Rd",city:"Cincinnati",state:"OH",zip:"45231",phone:"5138321422",loc:[-84.540985,39.231448],website:"http://www.fibbrew.com",twitter:"https://twitter.com/fibbrewing",facebook:"https://www.facebook.com/fibonaccibrewing",logo:"http://d3d27zyflwslfn.cloudfront.net/images/fibonacci.jpeg"},{_id:"5765f170bad0f48e9605cdc8",name:"Mt. Carmel Brewing Company",address:"4362 Mt. Carmel-Tobasco Rd.",city:"Cincinnati",state:"OH",zip:"45244",phone:"5132402739",loc:[-84.300243,39.093579],website:"http://www.mtcarmelbrewingcompany.com",twitter:"https://twitter.com/MtCarmelBrewing",facebook:"https://www.facebook.com/mtcarmelbrewing",logo:"http://d3d27zyflwslfn.cloudfront.net/images/mtcarmel.png"},{_id:"5765f170bad0f48e9605cdcf",name:"Urban Artifact",address:"1660 Blue Rock St",city:"Cincinnati",state:"OH",zip:"45223",phone:"5136204729",loc:[-84.54202,39.160671],website:"http://www.artifactbeer.com",twitter:"https://twitter.com/ArtifactBeer",facebook:"https://www.facebook.com/urbanartifactbrewing",logo:"http://d3d27zyflwslfn.cloudfront.net/images/urbanartifact.png"}];getGeomappingDataFromArcGis(t,e,o)}var dependencies=["esri/tasks/Geoprocessor","esri/geometry/Point"];require(dependencies,setupGeomapping);