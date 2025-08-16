var points = ee.FeatureCollection([
  // Gampaha
  ee.Feature(ee.Geometry.Point([79.85103764678702, 7.205450124874845]), {name: 'Negombo'}),
  ee.Feature(ee.Geometry.Point([79.85447087419666, 7.265053198146966]), {name: 'Kochchikade'}),
  ee.Feature(ee.Geometry.Point([79.83773665015326, 7.146973257413541]), {name: 'Dungalpitiya'}),
  ee.Feature(ee.Geometry.Point([79.8225418592865, 7.186716108250194]), {name: 'Pitipana'}),
  ee.Feature(ee.Geometry.Point([79.89317556725678, 6.9911787617574]), {name: 'Wattala'}),

  // Colombo
  ee.Feature(ee.Geometry.Point([79.85139320371621, 6.926603034597632]), {name: 'Colombo'}),
  ee.Feature(ee.Geometry.Point([79.86304897917906, 6.855797971047595]), {name: 'Dehiwala'}),
  ee.Feature(ee.Geometry.Point([79.86324638169839, 6.839507526221923]), {name: 'Mount Lavinia'}),
  ee.Feature(ee.Geometry.Point([79.88027961456562, 6.819370334586666]), {name: 'Ratmalana'}),
  ee.Feature(ee.Geometry.Point([79.88467354706034, 6.788051596238041]), {name: 'Moratuwa'}),

  // Kalutara
  ee.Feature(ee.Geometry.Point([79.90673203381606, 6.710742681356602]), {name: 'Panadura'}),
  ee.Feature(ee.Geometry.Point([79.95484428333235, 6.63689632594113]), {name: 'Wadduwa'}),
  ee.Feature(ee.Geometry.Point([79.95724754251914, 6.585058262894291]), {name: 'Kalutara'}),
  ee.Feature(ee.Geometry.Point([79.96214888946486, 6.56463943184622]), {name: 'katukurunda'}),
  ee.Feature(ee.Geometry.Point([79.99321064913099, 6.518784418924344]), {name: 'Payagala'}),
  ee.Feature(ee.Geometry.Point([79.99436544457963, 6.510753049129]), {name: 'Maggona'}),
  ee.Feature(ee.Geometry.Point([79.99220020334182, 6.474466867823459]), {name: 'Beruwala'}),
  ee.Feature(ee.Geometry.Point([79.99878156713925, 6.435076307645299]), {name: 'Aluthgama'}),

  // Galle
  ee.Feature(ee.Geometry.Point([80.00642049812582, 6.418700381227309]), {name: 'Bentota'}),
  ee.Feature(ee.Geometry.Point([80.01689184216843, 6.377161166880758]), {name: 'Induruwa'}),
  ee.Feature(ee.Geometry.Point([80.03268468888365, 6.335959811984759]), {name: 'Kosgoda'}),
  ee.Feature(ee.Geometry.Point([80.04152525003606, 6.313097184099775]), {name: 'Ahungalla'}),
  ee.Feature(ee.Geometry.Point([80.04080601136164, 6.2782935507540945]), {name: 'Balapitiya'}),
  ee.Feature(ee.Geometry.Point([80.057290287003, 6.243965086470793]), {name: 'Ambalangoda'}),
  ee.Feature(ee.Geometry.Point([80.10941884423116, 6.139699201439482]), {name: 'Hikkaduwa'}),
  ee.Feature(ee.Geometry.Point([80.12993500768293, 6.103061860101684]), {name: 'Dodanduwa'}),
  ee.Feature(ee.Geometry.Point([80.14289795675695, 6.093978252853494]), {name: 'Rathgama'}),
  ee.Feature(ee.Geometry.Point([80.1821469468117, 6.061156961493788]), {name: 'Gintota'}),
  ee.Feature(ee.Geometry.Point([80.2209, 6.0535]), {name: 'Galle'})
]);

var addEastingNorthing = function(feature) {
  var geom_5235 = feature.geometry().transform('EPSG:5235', 1);

  var coords_5235 = geom_5235.coordinates();

  var coords_4326 = feature.geometry().coordinates();

  return feature.set({
    longitude: coords_4326.get(0), 
    latitude: coords_4326.get(1),  
    easting: coords_5235.get(0),
    northing: coords_5235.get(1)
  });
};

var points_proj = points.map(addEastingNorthing);

print(points_proj);

Export.table.toDrive({
  collection: points_proj,
  description: 'SriLanka_Coords_EPSG5235',
  fileFormat: 'CSV',
  selectors: ['name', 'latitude', 'longitude', 'easting', 'northing']
});
