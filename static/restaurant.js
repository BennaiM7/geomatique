let map = L.map('map', {
    center: [40.7, -73.9],
    zoom: 12,
    preferCanvas: true,
    layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
        })
    ],
})

let url = 'static/restaurants.geojson'
fetch(url)
.then(r => r.json())
.then(json => {
    L.geoJSON(json, {
        pointToLayer: function(geoJSON, latlng){
            return  L.circleMarker(latlng);
        }

    }).addTo(map);
});

