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


function setup() {
  // print(locationData.latitude);
  // print(locationData.longitude);
  // print(locationData.accuracy);
  // print(locationData.altitude);
  // print(locationData.altitudeAccuracy);
  // print(locationData.heading);
  // print(locationData.speed);

  canvas = createCanvas(1920, 1000);
  // background(100); let's uncomment this, we don't need it for now

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  const lat = locationData.latitude;
  const lon = locationData.longitude;

  const data = { lat, lon };
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("/api", opt).then(response => {
    console.log(response);
  });
}

var x = 1;
var opac = 255;
var w = 5;

function draw() {
  clear();
  noFill();
  stroke(250, 10, 10, opac);
  strokeWeight(w);

  const userLocation = myMap.latLngToPixel(
    locationData.latitude,
    locationData.longitude
  );
  // Using that position, draw an ellipse
  ellipse(userLocation.x, userLocation.y, x, x);

  const userLocation2 = myMap.latLngToPixel(-23.576616, -46.739118);
  ellipse(userLocation2.x, userLocation2.y, x, x);

  const userLocation3 = myMap.latLngToPixel(-22.983911, -43.201888);
  ellipse(userLocation3.x, userLocation3.y, x, x);

  if (x < 100) {
    x = x + 1;
    w = w - 0.1;
  } else if ((x = 99)) {
    x = 10;
    opac = 255;
    w = 5;
  }
  if (opac > 0) {
    opac = opac - 4;
  }
}
