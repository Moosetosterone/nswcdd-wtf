function drawMap(lonlat) {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoibmlja21vb3NlIiwiYSI6ImNsM2xuNDcydzAzeWszaW44ZWUycWVoNmcifQ.rEPFnmPHAimsnSZcMF_lmA';
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    center: lonlat, // starting position [longitude, latitude]
    zoom: 13, // starting zoom
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    hash: true,
  });

  // Create a new marker
  const marker = new mapboxgl.Marker({
    // Set marker options
    color: '#e6194B',
    draggable: true,
  })
    .setLngLat(lonlat)
    .addTo(map);
}
