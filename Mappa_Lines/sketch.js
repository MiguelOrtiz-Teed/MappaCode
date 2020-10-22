// https://mappa.js.org/docs/getting-started.html


// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To
let picture;

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


function preload() {
  // With this code, you will need to convert your GPX file to CSV
  // Google search online converters and select one to test
  firstPath = loadTable('track_points.csv', 'csv', 'header');

  //this is supposed to load an image
  picture = loadImage('Images/baby.png');
}


function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);

  // myMap.onChange(drawPath(firstPath));
  myMap.onChange(drawPath.bind(null, firstPath));
}


function draw() {
}


function drawPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);



      push();
      noStroke();
      fill('rgba(0,255,0, .05)');
      ellipse(pos.x, pos.y, 20, 20)
      pop();
      stroke('red');
      strokeWeight(2);
      line(pos.x, pos.y, pos.x, pos.y);
      console.log(latitude)
      if(longitude === -78.88570623){
        image(picture, pos.x, pos.y,50,50);
        console.log('test')
      }

    }
  }
}
