/*
References:
1. https://editor.p5js.org/stavrosdidakis/sketches/gMZ285BsC
2. https://editor.p5js.org/MOQN/sketches/nVrzgBMOg
*/

// Game 1: Food Looting
// Click the food to order them

let objects = [];

let initalNumObjects = 1;
let addNewObjects = 1;

let counter = 0;
let setLevel = 1;

let time = 0;

let snd;

function preload() {
  bgimg = loadImage("covid shanghai.png")
}

function setup() {
  let cnv1 = createCanvas(600, 600);
  cnv1.parent("canvasContainer1")
  
  snd = loadSound("beat.mp3");

  for (let i = 0; i < initalNumObjects; i++) {
    objects.push(new Food(random(40, width - 50), 65 + random(height - 75)));
  }
}

function draw() {
  image(bgimg, 0, 0, 600, 600);
  background(0,50);
  time++;

  // we do stuff with objects
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
    objects[i].display();
    
    if (objects[i].click == true) {
      counter++;
      
      objects[i].update();
      objects[i].display();
      snd.play();
      
      if( counter % 10 == 0){
        setLevel++;
      }
    }
    
  }
  
  // here we delete what's not alive
  for(let i = objects.length-1; i >= 0; i--){
    if(objects[i].alive == false){
      objects.splice(i, 1)
    }
    
  }  
  

  if ( (time*setLevel) % 100 == 0) {
    generateNewFood();
  }

  //Counter interface
  fill(0, 70);
  rect(0, 0, width, 30);

  textSize(14);
  fill(200, 200, 200);
  text("Number of food ordered: " + counter, 10, 20);

  text("Level: " + setLevel, 335, 20);
}

function mousePressed() {
  for (let i = 0; i < objects.length; i++) {
    objects[i].checkIfClicked(mouseX, mouseY);
  }
}

function generateNewFood() {
  for (let i = 0; i < addNewObjects; i++) {
    objects.push(new Food(random(width), 65 + random(height - 65)));
  }
}

// function keyPressed() {
//   objects.push(new Food(random(width), 65+random(height-65)));
// }

class Food {
  constructor(startX, startY) {
    //Constructor accepts two values for x & y
    this.x = startX;
    this.y = startY;
    // this.diameter = 50;
    this.click = false;
    this.alive = true;
    this.clock = 0;
    this.lifeLength = random(300, 400)/setLevel;
    this.scale = 1;
    
    //what kind of food to show
    let foodPick = floor(random(1)); //adjust the number for more food kinds
    if(foodPick==0){
      this.animal = new Chicken(); 
    }else if(foodPick==1){
      console.log("no second food yet")
    }
    
  }

  update() {
    this.clock++;
    if (this.clock >= this.lifeLength) {
      this.alive = false;
    }
    
    if(this.click == true){
      this.scale = 1.2;
    } else{
      this.scale = 1;
    }
    
  }

  display() {
    push();
    translate(this.x, this.y);
    push();
    scale(this.scale);
    this.animal.display()  
    pop();
    pop();
  }

  checkIfClicked(clickX, clickY) {
    let clicked = this.animal.checkIfClicked(this.x, this.y, clickX, clickY);
    
    if(clicked == true){
      this.alive = false;
      this.click = true;
    }
  }
}

class Chicken {
 constructor() {
   this.diameter = 50;
 }
  display() {
    push();
    strokeWeight(10);
    stroke(255, 242, 204);
    line(0, 0, 20, 20);
    pop();

    push();
    noStroke();
    fill(255, 242, 204);
    circle(18, 24, 10);
    circle(24, 18, 10);
    pop();

    push();
    fill(230, 145, 56);
    noStroke();
    circle(-20, -20, 50);
    circle(0, 0, 33);
    pop();

    push();
    fill(0);
    noStroke();
    circle(-30, -10, 3);
    circle(-20, -35, 5);
    circle(-10, -27, 4);
    circle(-5, -10, 2);
    circle(-2, 10, 3);
    circle(10, 6, 2);
    pop();
  }
  checkIfClicked(x, y, clickX, clickY) {
    let distance = dist(x, y, clickX, clickY);
    if (distance < this.diameter) {
      return true;
    }else{
      return false;
    }
  }
}
