let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([51.5, -0.09]).addTo(map);
let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
let markers = L.geoJSON().bindPopup(function (layer){ // On le déclare avant pour pouvoir retirer les anciens points quand on en recherche un nouveau
    return `
        <h3>${layer.feature.properties.label}</h3>
        <p>${layer.feature.properties.context}</p>
    `;
}).addTo(map);


Vue.createApp({
    data(){
        return{
            recherche: ''
        }
    },
    methods : {
        geoloc(){
            let baseUrl = 'https://data.geopf.fr/geocodage/search?q=';
            let url = baseUrl + this.recherche;
            //console.log(url);
            fetch(url)
            .then(r => r.json())
            .then(json => {
                console.log(json);
                //let coords = json.features[0].geometry.coordinates.reverse().addTo(map);  // On reverse parceque sinon la latitude et longitude sont inversés
                //L.marker(coords);
                markers.clearLayers(); // Pour supprimer les casques et retirer les anciens points
                markers.addData(json);
                let bounds = markers.getBounds(); // Pour récuperer un rectangle où tous nos points sont dedans
                map.fitBounds(bounds); // Pour ce placer où sont nos points
            });
            //alert(this.recherche);
        }
    }
}).mount('#entete');

map.on('click', onMapClick);

