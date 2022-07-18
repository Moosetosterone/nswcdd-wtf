function drawMap(opts) {
  // parse the input variables
  const { lonlat, startZoom } = opts;
  console.log(opts);
  // need an access token to make the map appear
  mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlja21vb3NlIiwiYSI6ImNsM2xuNDcydzAzeWszaW44ZWUycWVoNmcifQ.rEPFnmPHAimsnSZcMF_lmA';

  // create the map
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    center: lonlat, // starting position [longitude, latitude]
    zoom: startZoom, // starting zoom
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    hash: true,
  });

  // add the data
  map.on('load', () => {
    addAirspaceBoundaries(map);
    addSpecialUseAirspace(map);
    addRouteCenters(map);
  }); // map.on

  return map;
} // drawMap

function addMarker(map, lonlat, markerColor) {
  // Create a new marker
  const marker = new mapboxgl.Marker({
    // Set marker options
    color: markerColor,
    draggable: true,
  })
    .setLngLat(lonlat)
    .addTo(map);
} // addMarker

function addSpecialUseAirspace(map) {
  // Add the FAA Special Use Airspace source
  map.addSource('sua-faa', {
    type: 'geojson',
    data: 'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Special_Use_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
  }); // addSource

  // Add layer for W codes (warning areas)
  map.addLayer({
    id: 'sua-lines-w',
    type: 'line',
    source: 'sua-faa',
    paint: {
      'line-color': '#7393B3', // blue gray
      'line-width': 0.7,
      'line-dasharray': [3, 3, 1, 3],
    }, // paint
    filter: ['==', ['get', 'TYPE_CODE'], 'W'],
  }); // addLayer

  // Add layer for R (restricted) & P (prohibitied) codes
  map.addLayer({
    id: 'sua-lines-rp',
    type: 'line',
    source: 'sua-faa',
    paint: {
      'line-color': '#fabed4', // pink
      'line-width': 1,
      'line-opacity': 0.2,
    }, // paint
    filter: ['in', 'TYPE_CODE', 'R', 'P'],
  }); //addLayer
} // addSpecialUseAirspace

function addAirspaceBoundaries(map) {
  // Add the FAA Airspace Boundaries
  map.addSource('artcc-faa', {
    type: 'geojson',
    data: 'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Boundary_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',
  }); // addSource
  map.addLayer({
    id: 'artcc-lines',
    type: 'line',
    source: 'artcc-faa',
    paint: {
      'line-color': '#800000', // maroon
      'line-width': 1,
      'line-opacity': 0.2,
    }, // paint
    filter: ['in', 'TYPE_CODE', 'ARTCC', 'SATA'],
  }); // addLayer
  map.addLayer({
    id: 'artcc-labels',
    type: 'symbol',
    source: 'artcc-faa',
    layout: {
      'text-field': ['get', 'IDENT'],
      'text-radial-offset': 1,
      'text-justify': 'auto',
      'text-size': 14,
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
    }, // layout
    paint: {
      'text-color': '#800000', // maroon
    }, // paint
  }); // addLayer;
} // addAirspaceBoundaries

function addRouteCenters(map) {
  // Add the Route Centers
  map.addSource('i-onr', {
    type: 'geojson',
    data: './resources/data/route-centers.json',
  }); // addSource
  // Add the symbol layers
  map.addLayer({
    id: 'route-points',
    type: 'circle',
    source: 'i-onr',
    paint: {
      'circle-radius': 6,
      'circle-color': getRouteColors(),
    }, // paint
  }); // addLayer points
  map.addLayer({
    id: 'route-lines',
    type: 'line',
    source: 'i-onr',
    paint: {
      'line-width': 2,
      'line-color': getRouteColors(),
    }, // paint
  }); // addLayer lines
  map.addLayer({
    id: 'point-labels',
    type: 'symbol',
    source: 'i-onr',
    layout: {
      'text-field': ['get', 'Name'],
      'text-radial-offset': 1,
      'text-justify': 'auto',
      'text-size': 14,
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
    }, // layout
    paint: {
      'text-color': '#000',
    }, // paint
  }); // addLayer;
} // addRoute Centers

function getRouteColors() {
  // Build a GL match expression that defines the color for every route
  const matchExpression = ['match', ['get', 'Name']];
  matchExpression.push('Twin Otter', '#e6194B'); // red
  matchExpression.push('ECHO', '#3cb44b'); // green
  matchExpression.push('E-2D 1', '#f032e6'); // magenta
  matchExpression.push('E-2D 2', '#911eb4'); // purple
  matchExpression.push('G-IV', '#f58231'); // orange
  matchExpression.push('TBD', '#ffe119'); // yellow
  matchExpression.push('Lear 1', '#42d4f4'); // cyan
  matchExpression.push('Lear 2', '#4363d8'); // blue
  matchExpression.push('Lear 3', '#000075'); // navy
  matchExpression.push('Lear 4', '#469990'); // teal
  matchExpression.push('L0', '#fffac8'); // beige
  matchExpression.push('L1', '#fffac8');
  matchExpression.push('L2', '#fffac8');
  matchExpression.push('Lear path', '#aaffc3'); // mint
  matchExpression.push('#000000'); // default color // black
  return matchExpression;
} // getRouteColors

export { drawMap };
