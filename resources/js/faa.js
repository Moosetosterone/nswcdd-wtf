export function addFaaData(map) {
  addSpecialUseAirspace(map);
  addAirspaceBoundaries(map);
  addAirports(map);
} // addFaaData

function addSpecialUseAirspace(map) {
  // Add the FAA Special Use Airspace source
  map.addSource("sua-faa", {
    type: "geojson",
    data:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Special_Use_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  }); // addSource

  // Add layer for W codes (warning areas)
  map.addLayer({
    id: "sua-lines-w",
    type: "line",
    source: "sua-faa",
    paint: {
      "line-color": "#7393B3", // blue gray
      "line-width": 0.7,
      "line-dasharray": [3, 3, 1, 3],
    }, // paint
    filter: ["==", ["get", "TYPE_CODE"], "W"],
  }); // addLayer

  // Add layer for R (restricted) & P (prohibitied) codes
  map.addLayer({
    id: "sua-lines-rp",
    type: "line",
    source: "sua-faa",
    paint: {
      "line-color": "#fabed4", // pink
      "line-width": 1,
      "line-opacity": 0.2,
    }, // paint
    filter: ["in", "TYPE_CODE", "R", "P"],
  }); //addLayer
} // addSpecialUseAirspace

function addAirspaceBoundaries(map) {
  // Add the FAA Airspace Boundaries
  map.addSource("artcc-faa", {
    type: "geojson",
    data:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Boundary_Airspace/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  }); // addSource
  map.addLayer({
    id: "artcc-lines",
    type: "line",
    source: "artcc-faa",
    paint: {
      "line-color": "#800000", // maroon
      "line-width": 1,
      "line-opacity": 0.2,
    }, // paint
    filter: ["in", "TYPE_CODE", "ARTCC", "SATA"],
  }); // addLayer

  map.addLayer({
    id: "artcc-labels",
    type: "symbol",
    source: "artcc-faa",
    layout: {
      "text-field ": ["to-string", ["get", "IDENT"]],
      "text-radial-offset": 1,
      "text-justify": "auto",
      "text-size": 14,
      "text-variable-anchor": ["top", "bottom", "left", "right"],
    }, // layout
    paint: {
      "text-color": "#800000", // maroon
    }, // paint
  }); // addLayer;
} // addAirspaceBoundaries

function addAirports(map) {
  // Add the FAA Airport data
  map.addSource("airports-faa", {
    type: "geojson",
    data:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  }); // addSource

  map.addLayer({
    id: "airport-symbols",
    type: "symbol",
    source: "airports-faa",
    filter: ["match", ["get", "US_HIGH"], [1], true, false],
    layout: {
      "text-field": ["to-string", ["get", "IDENT"]],
      "text-size": 8,
      "icon-image": "airport",
      "icon-opacity": 0.2,
      "text-anchor": "top",
      "text-offset": [0, 1],
    },
    paint: {
      "text-color": "#9b9292",
      "text-opacity": 0.8,
    },
  }); // addLayer
} // addAirports
