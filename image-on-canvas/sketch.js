
let flower;

function preload(){
 flower= loadImage("assets/flower.png");
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer")

}

function draw() {
  background(220);
  scale(0.5);
  image(flower,0,0);

}