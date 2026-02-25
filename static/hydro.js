let wmsSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'mohamed:cours-eau-100km', 'TILED': true},
});

const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([2.35, 48.85]),
        zoom: 13,
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }), 
        new ol.layer.Tile({
            source: wmsSource,
        })
    ]
});

let layerSelected = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 5,
        }),
    }),
});
map.addLayer(layerSelected);

let clickedLayer = new ol.layer.VectorTile({
    source: layer.getSource(),
    style: function (feature) {
        if (feature.getId() == selection) {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'mediumblue',
                    width: 7
                }),
            });
        }
    },
});



map.on('click', (evt) => {
    layerSelected.getSource().clear();
    
    let viewResolution = map.getView().getResolution();
    let url = wmsSource.getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        'EPSG:3857',
        {'INFO_FORMAT': 'application/json'}
    );
    
    fetch(url)
        .then(r => r.json())
        .then(json => {
            let features = new ol.format.GeoJSON().readFeatures(json);
            layerSelected.getSource().addFeatures(features);
            
            if (app && features.length) {
                app.selectedRiver = features[0].get('topooh') || '';
            }
        });
});