
    var map = new maplibregl.Map({
        container: 'map', // container id
        style: 'https://demotiles.maplibre.org/globe.json', // style URL
        center: [-73.9, 40.3], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });
    map.on('lo!ad', function(){
        map.addSource('osm-tiles', {
            'type': 'raster',
            'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            'tileSize': 256
        });

        map.addLayer({
            'id': 'simple-layer',
            'type': 'raster',
            'source': 'osm-tiles'
        }, 'restaurants');
        fetch('static/restaurants.geojson')
        .then(r => r.json())
        .then(json => {
            map.addSource('restaurants', {
                'type': 'geojson',
                'data': json
            });
            map.addLayer({
                'id': 'restaurants',
                'source': 'restaurants',
                'type': 'circle',
                'paint': {
                    'circle-color': [
                        "case",
                        ['boolean', ['feature-state', 'hover'], false],
                        'mediumblue',
                        'deeppink'
                    ],
                    'circle-radius': [
                        "interpolate",
                        ["exponential", 2],
                        ["zoom"],
                        5,
                        2,
                        15,
                        6
                    ]
                }
            });
        });
    });

    let hoveredRestaurantId = null;

    map.on('mousemove', 'restaurants', (e) => {
        if (e.features.length > 0) {
            if (hoveredRestaurantId !== null) {
                map.setFeatureState(
                    {source: 'restaurants', id: hoveredRestaurantId},
                    {hover: false}
                );
            }
            hoveredRestaurantId = e.features[0].id;
            map.setFeatureState(
                {source: 'restaurants', id: hoveredRestaurantId},
                {hover: true}
            );
        }
    });

    map.on('mouseleave', 'restaurants', () => {
        if (hoveredRestaurantId !== null) {
            map.setFeatureState(
                {source: 'restaurants', id: hoveredRestaurantId},
                {hover: false}
            );
        }
        hoveredRestaurantId = null;
    });
