function formatDepot(depot) {
  return {
    geometry: {
      x: depot.point.x,
      y: depot.point.y,
    },
    attributes: {
      Name: depot.name,
    },
  };
}

function getDepots(depots) {
  return {
    features: depots.map(formatDepot),
  };
}

function formatOrder(order) {
  return {
    geometry: {
      x: order.point.x,
      y: order.point.y,
    },
    attributes: {
      Name: order.name,
    },
  };
}

function getOrders(orders) {
  return {
    features: orders.map(formatOrder),
  };
}

function getRoute(depot, i) {
  return {
    attributes: {
      Name: `Route ${i + 1}`,
      StartDepotName: depot.name,
      EndDepotName: depot.name,
      EarliestStartTime: 1455609600000,
      LatestStartTime: 1455609600000,
    },
  };
}

function getRoutes(depots) {
  return {
    features: depots.map(getRoute),
  };
}

function showRoutes(results) {
  console.log('showRoutes', results);
}

function showStops(results) {
  console.log('showStops', results);
}

function showDirections(results) {
  console.log('showDirections', results);
}

function getGeomappingDataFromArcGis(Geoprocessor, Point, data) {
  data = data.map(d => {
    d.point = new Point(d.loc[0], d.loc[1]);
    return d;
  });

  const geoserviceUrl = 'https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem';
  const arcgis = process.env.ARCGIS_KEY;
  const depots = data.slice(0, 1);
  const orders = data.slice(1);
  const geoprocessor = new Geoprocessor(`${geoserviceUrl}?token=${arcgis}`);
  const params = {
    default_date: 1455609600000,
    time_units: "Minutes",
    distance_units: "Miles",
    depots: JSON.stringify(getDepots(depots)),
    orders: JSON.stringify(getOrders(orders)),
    routes: JSON.stringify(getRoutes(depots)),
    populate_directions: true,
  };

  geoprocessor.submitJob(params).then(results => {
    geoprocessor.getResultData(results.jobId, "out_routes").then(showRoutes);
    geoprocessor.getResultData(results.jobId, "out_stops").then(showStops);
    geoprocessor.getResultData(results.jobId, "out_directions").then(showDirections);
  });
}

function setupGeomapping(Geoprocessor, Point) {
  getGeomappingDataFromArcGis(Geoprocessor, Point, data);
}

const dependencies = [
  "esri/tasks/Geoprocessor",
  "esri/geometry/Point",
];

require(dependencies, setupGeomapping);
