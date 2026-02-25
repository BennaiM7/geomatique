let map = L.map('map', {
    center: [0,0],
    zoom: 2,
    layers: [
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
        })
    ],
})


let baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';
let url = baseUrl 
//console.log(url);
fetch(url)
.then(r => r.json())
.then(json => {
    console.log(json);
    //let coords = json.features[0].geometry.coordinates.reverse().addTo(map);  // reverse parceque sinon la latitude et longitude sont inversés
    //L.marker(coords);
    L.geoJSON(json, {
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
            
        },
        style: function (feature){
            let mag = feature.properties.mag;
            if (mag <= 5 ) return {stroke: false, color: 'yellow', fillOpacity: 1, radius : Math.pow(mag, 1.4)}
            else if (mag >= 6 ) return {stroke: false, color: 'red',fillOpacity: 1, radius : Math.pow(mag, 1.4)}
            else return {stroke: false, color:'orange', fillOpacity: 1, radius : Math.pow(mag, 1.4)}
        }
    }).bindPopup(function (layer){ 
        return `
            <h3>${layer.feature.properties.mag}</h3>
            <p>${layer.feature.properties.place}</p>
            <p>${new Date(layer.feature.properties.time).toLocaleString()}</p>
        `;
    }).addTo(map);
}
);


//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson