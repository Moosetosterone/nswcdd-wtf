const apiKey =
  "AAPKfb602d414be84769b5019dddd3acdc66nkwfXW9n-1v8im--qHk6aMGZLa4lffe2WlENaBWIUOvaRwgWzKGWUIBSKU6UvCM9";
const basemapEnum = "ArcGIS:Midcentury";
const map = new maplibregl.Map({
  container: "map", // the id of the div element
  style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
  zoom: 5, // starting zoom
  center: [-76.4377, 38.2797], // starting location [longitude, latitude]
  attributionControl: false,
}).addControl(
  new maplibregl.AttributionControl({
    compact: true, // reduces the copyright attributions view
  })
);

const baseUrl = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles";
const url = (name) => `${baseUrl}/${name}?type=style&token=${apiKey}`;

// Function to set the basemap
const setBasemap = (name) => {
  // Instantiate the given basemap layer.
  map.setStyle(url(name));
};
setBasemap("ArcGIS:Midcentury");

// Function to set the Airspace Boundaries

const basemapsSelectElement = document.querySelector("#basemaps");

basemapsSelectElement.addEventListener("change", (e) => {
  setBasemap(e.target.value);
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
});

map.on("load", () => {
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
}); // on map load
