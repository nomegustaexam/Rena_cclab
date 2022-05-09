/*
References:
1. https://editor.p5js.org/stavrosdidakis/sketches/gMZ285BsC
2. https://editor.p5js.org/MOQN/sketches/nVrzgBMOg
*/

//icons used is from:
//https://www.flaticon.com/

// Game 1: Food Looting
// Click the food to order them

let foods = [];

let initalNumfoods = 3;
let addNewfoods = 2;

let counter = 0;
let setLevel = 1;
let time = 0,
  dia = 50;
let snd;
let experienceStart = false;

function preload() {
  snd = loadSound("beat.mp3");
  bgimg = loadImage("covid shanghai.png");
  food1 = loadImage("pizza.png");
  food2 = loadImage("burger.png");
  food3 = loadImage("salad.png");
  food4 = loadImage("avocado.png");
}

function setup() {
  let cnv1 = createCanvas(600, 600);
  cnv1.parent("canvasContainer1")

  for (let i = 0; i < initalNumfoods; i++) {
    foods.push(
      new Food(random(50, width - 100), 65 + random(50, height - 100), 50)
    );
  }
}

function keyPressed() {
  if (key == "a" || key == "A") {
    experienceStart = true;
  }
}

function draw() {
  image(bgimg, 0, 0, 600, 600);
  

  if (experienceStart == false) {
    background(0, 20);
    textAlign(CENTER);
    textSize(25);
    textStyle(BOLD);
    fill(255);
    text("Click the canvas", width / 2, height / 2);
    text("and then press 'a' to start the game", width / 2, height / 2 + 30);
  } else {
    time++;
    background(0, 50);

    if (counter >= 30 && time <= 1800) {
      //successful
      background("#CDDC39");
      fill(20);
      textAlign(CENTER);
      textSize(25);
      text("You've collected enough food", width / 2, height / 2 - 40);
      text("to survive this lockdown", width / 2, height / 2);
      textSize(15);
      text("You can return to the main calendar.", width / 2, height / 2 + 50);
      time = 0;
    } else if (time > 1800) {
      background("#990000");
      fill(220);
      textAlign(CENTER);
      textSize(25);
      text("The food is not enough for you", width / 2, height / 2 - 40);
      text("to survive this lockdown", width / 2, height / 2);
      textSize(15);
      text(
        "Please refresh the page to start over again",
        width / 2,
        height / 2 + 50
      );
    } else {
      //display the food
      for (let i = 0; i < foods.length; i++) {
        foods[i].update();
        foods[i].display();

        if (foods[i].click == true) {
          counter++;
          foods[i].update();
          foods[i].display();
          snd.play();

          if (counter % 8 == 0) {
            setLevel++;
          }
        }
      }

      // delete what's not alive
      for (let i = foods.length - 1; i >= 0; i--) {
        if (foods[i].alive == false) {
          foods.splice(i, 1);
        }
      }

      if ((time * setLevel) % 100 == 0) {
        generateNewFood();
      }

      //headline
      fill(0, 70);
      rect(0, 0, width, 30);
      textSize(14);
      fill(200, 200, 200);
      textAlign(LEFT);
      text("Number of food ordered: " + counter, 20, 20);
      text("Level: " + setLevel, 340, 20);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < foods.length; i++) {
    foods[i].checkIfClicked();
    // console.log(foods[i].checkIfClicked());
  }
}

function generateNewFood() {
  for (let i = 0; i < addNewfoods; i++) {
    foods.push(new Food(random(width), 65 + random(height - 65), dia));
  }
}

class Food {
  constructor(startX, startY, diameter) {
    this.x = startX;
    this.y = startY;
    this.diameter = diameter;
    this.click = false;
    this.alive = true;
    this.clock = 0;
    this.lifeLength = random(300, 400) / setLevel;
    this.scale = 1;

    //what kind of food to show
    let foodPick = floor(random(4)); //adjust the number for more food kinds
    if (foodPick == 0) {
      this.foodKind = food1;
    } else if (foodPick == 1) {
      this.foodKind = food2;
    } else if (foodPick == 2) {
      this.foodKind = food3;
    } else if (foodPick == 3) {
      this.foodKind = food4;
    }
  }

  update() {
    this.clock++;
    if (this.clock >= this.lifeLength) {
      this.alive = false;
    }

    if (this.click == true) {
      this.scale = 1.2;
    } else {
      this.scale = 1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    push();
    scale(this.scale);
    image(this.foodKind, -25, -25, 50, 50);
    pop();
    pop();
  }

  checkIfClicked() {
    this.distance = dist(this.x, this.y, mouseX, mouseY);

    if (this.distance <= this.diameter) {
      this.alive = false;
      this.click = true;
      return true;
    }
  }
}