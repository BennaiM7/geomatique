// Calcul de l'élévation selon la formule Terrarium
const elevation = [
  '+',
  -32768,
  ['*', 255 * 256, ['band', 1]],
  ['*', 255, ['band', 2]],
  ['*', 255/256, ['band', 3]],
];

const layer = new ol.layer.WebGLTile({
  opacity: 0.6,
  source: new ol.source.XYZ({
    url: 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
    maxZoom: 14,
  }),
  style: {
    variables: {
      level: 0,
    },
    color: [
      'case',
      ['<=', elevation, ['var', 'level']],
      [139, 212, 255, 1],
      [139, 212, 255, 0],
    ],
  },
});

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.WebGLTile({
      source: new ol.source.XYZ({
        url: 'https://data.geopf.fr/tms/1.0.0/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/{z}/{x}/{y}.png',
        maxZoom: 22,
      }),
    }),
    layer,
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([2.35, 50]),
    zoom: 8,
  }),
});

const control = document.getElementById('level');
const output = document.getElementById('output');

control.addEventListener('input', function () {
  output.innerText = control.value;
  layer.updateStyleVariables({ level: parseFloat(control.value) });
});

output.innerText = control.value;

const locations = document.getElementsByClassName('location');
for (let i = 0; i < locations.length; i++) {
  locations[i].addEventListener('click', relocate);
}

function relocate(event) {
  event.preventDefault();
  const data = event.target.dataset;
  const view = map.getView();
  view.setCenter(ol.proj.fromLonLat(data.center.split(',').map(Number)));
  view.setZoom(Number(data.zoom));
}
