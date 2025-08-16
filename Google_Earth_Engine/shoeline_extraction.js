// ------------------------------------
// Study Area: Western Coastal Sri Lanka (Negombo to Galle)
// ------------------------------------
var westernCoast = ee.Geometry.Rectangle([79.82, 5.95, 80.3, 7.25]); 
Map.centerObject(westernCoast, 9); 

function cleanGeometry(feature) {
  var geom = feature.geometry().buffer(0, 1);  
  return ee.Feature(geom).copyProperties(feature);
}

function extractShoreline(year) {
  var startDate = ee.Date.fromYMD(year, 1, 1);
  var endDate = ee.Date.fromYMD(year, 12, 31);

  // Load Sentinel-2 SR data
  var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(westernCoast)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .median()
    .clip(westernCoast);

  var ndwi = s2.normalizedDifference(['B3', 'B8']).rename('NDWI');

  var waterMask = ndwi.gt(0);

  var shoreline = waterMask.selfMask().reduceToVectors({
    geometry: westernCoast,
    scale: 10,
    geometryType: 'polygon',
    eightConnected: true,
    maxPixels: 1e13
  });

  shoreline = shoreline
    .map(function(feature) {
      return feature.transform('EPSG:5235', 1).set('year', year);
    })
    .map(cleanGeometry);

  return shoreline;
}

var shoreline2020 = extractShoreline(2020);
var shoreline2024 = extractShoreline(2024);

Map.addLayer(shoreline2020, {color: 'blue'}, 'Shoreline 2020');
Map.addLayer(shoreline2024, {color: 'red'}, 'Shoreline 2024');

Export.table.toDrive({
  collection: shoreline2020,
  description: 'Western_SriLanka_Shoreline_2020_Cleaned',
  fileFormat: 'SHP'
});

Export.table.toDrive({
  collection: shoreline2024,
  description: 'Western_SriLanka_Shoreline_2024_Cleaned',
  fileFormat: 'SHP'
});
