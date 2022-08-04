import { addFaaData } from "./resources/js/faa.js";
const apiKey =
  "AAPKfb602d414be84769b5019dddd3acdc66nkwfXW9n-1v8im--qHk6aMGZLa4lffe2WlENaBWIUOvaRwgWzKGWUIBSKU6UvCM9";
const basemapEnum = "ArcGIS:Midcentury";

var map = new maplibregl.Map({
  container: "map",
  style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
  center: [-76.4377, 38.2797],
  zoom: 5,
  attributionControl: false,
}).addControl(
  new maplibregl.AttributionControl({
    compact: true, // reduces the copyright attributions view
  })
); // new map

/* Try to change the basemap layer.
Ref: https://developers.arcgis.com/maplibre-gl-js/maps/change-the-basemap-layer/
*/
const baseUrl = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles";
const url = (name) => `${baseUrl}/${name}?type=style&token=${apiKey}`;
const setBasemap = (name) => {
  // Function to set the basemap
  map.setStyle(url(name));
  // Add the FAA addFaaData
  map.on("styledata", () => {
    addFaaData(map);
  }); // on map load
};
setBasemap(basemapEnum);
// Create a basemapsSelectElement to return the basemap from the selector.
const basemapsSelectElement = document.querySelector("#basemaps");

//Add an event listener to update the map to the new basemap when the selector is changed.
basemapsSelectElement.addEventListener("change", (e) => {
  setBasemap(e.target.value);
});
