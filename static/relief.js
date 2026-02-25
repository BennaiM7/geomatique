const map = (window.map = new maplibregl.Map({
        container: 'map',
        zoom: 10,
        center: [6,45],
        pitch: 85,
        hash: true,
        style: {
            version: 8,
            sources: {
                'raster-tiles': {
                    type: 'raster',
                    tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
                    tileSize: 256,
                    attribution: '&copy; OpenStreetMap Contributors',
                    maxzoom: 10
                },
                'terrain-source': {
                    type: 'raster-dem',
                    encoding: 'mapbox',
                    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
                    tileSize: 256
                },
                hillshadeSource: {
                    type: 'raster-dem',
                    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
                    tileSize: 256
                }
            },
            layers: [
                {
                    id: 'simple-tiles',
                    type: 'raster',
                    source: 'raster-tiles'
                },
            ],
            terrain: {
                source: 'terrain-source',
                exaggeration: 0.05
            },
            sky: {
                'atmosphere-blend': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 1,
                    2, 0
                ]
            }
        },
        maxZoom: 18,
        maxPitch: 85
    }));

    map.addControl(
        new maplibregl.NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: true
        })
    );

    map.addControl(
        new maplibregl.TerrainControl({
            source: 'terrain-source',
            exaggeration: 0.05
        })
    );