let song;
let amplitude;

function preload() {
  song = loadSound("assets/song.mp3");
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer")
  amplitude = new p5.Amplitude();
}


function draw() {
  let level = amplitude.getLevel();
  let backgroundColor = map(level, 0.0, 1.0, 0, 255);
  
  background(backgroundColor);

  
  let dia = map(level, 0.0, 1.0, 0, 500);
  

  noStroke();
  fill(0, 255, 180);
  ellipse(width / 2, height / 2, dia, dia);

  fill(255);
  text("Click here to play", 10, 20);
  text("Volume: " + level, 10, 50);
}

function mousePressed() {
  song.loop();
}
