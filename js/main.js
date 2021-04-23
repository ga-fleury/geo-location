var locationData;
var fence;

let myMap;
let canvas;
const mappa = new Mappa("Leaflet");

// Lets put all our map options in a single object
const options = {
  lat: -15,
  lng: -55,
  zoom: 5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
};

function preload() {
  locationData = getCurrentPosition();
}

function insideTheFence(position) {
  print("INlat: " + position.latitude);
  print("INlong: " + position.longitude);
  print("user is inside of the fence");
}

function outsideTheFence(position) {
  print("OUTlat: " + position.latitude);
  print("OUTlong: " + position.longitude);
  print("user is outside of the fence");
}

function setup() {
  print(locationData.latitude);
  print(locationData.longitude);
  print(locationData.accuracy);
  print(locationData.altitude);
  print(locationData.altitudeAccuracy);
  print(locationData.heading);
  print(locationData.speed);

  fence = new geoFenceCircle(
    -23.555555,
    -46.6804079,
    0.05,
    insideTheFence,
    outsideTheFence,
    "mi"
  );

  canvas = createCanvas(1400, 1000);
  // background(100); let's uncomment this, we don't need it for now

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

var x = 1;
var opac = 255;
var w = 5;

function draw() {
    clear();
    noFill();
    stroke(250,10,10, opac);
    strokeWeight(w);

  const nigeria = myMap.latLngToPixel(
    locationData.latitude,
    locationData.longitude
  );
  // Using that position, draw an ellipse
  ellipse(nigeria.x, nigeria.y, x, x);

  if (x < 100) {
      x = x+1;
      w = w - 0.1;
  } else if ( x = 99) {
      x = 10;
      opac = 255;
      w = 5;      
  }
  if (opac > 0) {
      opac = opac - 4;
  }
}
