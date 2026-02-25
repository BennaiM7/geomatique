let map = L.map('map', {
    center: [0,0],
    zoom: 2,
    layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
        })
    ],
})

let paris = [48.85, 2.35];
let vancouver = [49.247, -123.118];
let marker1 = L.marker(paris, {draggable: true}).bindPopup("Paris").addTo(map);
let marker2 = L.marker(vancouver, {draggable:true}).bindPopup("Vancouver").addTo(map);

marker1.on('move', updateLine);
marker2.on("move", updateLine);

let polyline = L.polyline([paris, vancouver], {color: 'black'}).addTo(map); // ligne droite qui suit pas la courbure de la terre

let start = turf.point([paris[1], paris[0]]);
let end = turf.point([vancouver[1], vancouver[0]]);

let greatCircle = turf.greatCircle(start, end); // ligne entre paris et vancouver qui suitl a courbure de la terre


let greatCircleLayer;

function updateLine(){
    let pos = marker1.getLatLng();
    let pos2 = marker2.getLatLng();
    let latlng = [pos, pos2]
    let start = turf.point([pos.lng, pos.lat]);
    let end = turf.point([pos2.lng, pos2.lat]);
    let greatCircle = turf.greatCircle(start, end);
    polyline.setLatLngs(latlng);
    
    if (greatCircleLayer) {
        map.removeLayer(greatCircleLayer);
    }
    greatCircleLayer = L.geoJSON(greatCircle).addTo(map);
}

