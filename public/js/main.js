var locationData;
var fence;

let myMap;
let canvas;
const mappa = new Mappa("Leaflet");

var x = 1;
var opac = 255;
var w = 5;

var locations;

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

  canvas = createCanvas(displayWidth - 80, displayHeight - 80);
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

  fetch("/api", opt).then((response) => {
    console.log(response);
  });
}

getData();

// async function getData() {
//   const response = await fetch("/api");
//   const data = await response.json();
//   console.log(data);
//   return (locations = data);
// }

function getData() {
  //waits half a second to fetch data to ensure current user location is there
  setTimeout(function () {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => (locations = data));
  }, 500);
}

/* TODO

find a better way to fetch db after POST and before draw();

maybe try to use setInterval to query the DB every 2 seconds or so

*/

function draw() {
  // waits to start drawing so that location won't be empty
  if (frameCount > 35) {
    clear();
    noFill();
    stroke(250, 10, 10, opac);
    strokeWeight(w);

    // const userLocation = myMap.latLngToPixel(
    //   locationData.latitude,
    //   locationData.longitude
    // );
    // // Using that position, draw an ellipse
    // ellipse(userLocation.x, userLocation.y, x, x);

    // const userLocation3 = myMap.latLngToPixel(-22.983911, -43.201888);
    // ellipse(userLocation3.x, userLocation3.y, x, x);

    for (let i = 0; i < locations.length; i++) {
      const pos = myMap.latLngToPixel(locations[i].lat, locations[i].lon);
      ellipse(pos.x, pos.y, x, x);
    }

    //dot animation
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
}
