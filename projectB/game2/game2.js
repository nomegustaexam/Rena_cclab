let figureDistance = 50;

let figures = [];
let me = [
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
];
let counter = 0;
let experienceStart = false;

function preload() {
  bgimg = loadImage("covid shanghai.png");
}

function setup() {
  let cnv2 = createCanvas(600, 600);
  cnv2.parent("canvasContainer2")
  ground = new Ground();
  covidSign = new CovidSign();

  arrow = new Arrow(width, height / 2 + 20, random(0.8,2));
  button = new Button(width / 3 - 30, height / 4);

  for (let i = 0; i < (width + figureDistance) / figureDistance; i++) {
    figures[i] = new Figure(i * figureDistance, 430, me[i], figureDistance);
    figures.push(figures[i]);
  }
}

function keyPressed() {
  if (key == "a" || key == "A") {
    experienceStart = true;
  }
  console.log(experienceStart);
}

function draw() {
  image(bgimg, 0, 0, 600, 600);
  // background(207, 226, 243, 150);



  
  if (experienceStart == true) {
    background(207, 226, 243, 150);
    //where the program duns
    if (arrow.x > -20) {
      ground.display();
      covidSign.display();
      button.update();
      button.display();

      arrow.update();
      arrow.display();

      for (let i = 0; i < figures.length; i++) {
        figures[i].display();
        figures[i].checkIfStep(arrow);
        figures[i].display();
      }

      //delete figure when out of frame
      for (let i = figures.length - 1; i >= 0; i--) {
        if (figures[i].x >= width + figureDistance) {
          figures.splice(i, 1);
          let index = floor(random(13));
          figures[i] = new Figure(0, 430, me[index], figureDistance);
          figures.push(figures[i]);
        }
      }

      progressValue = map(counter, 0, 100, 0, width);
      push();
      fill(220);
      noStroke();
      rect(0, 0, width, 30);
      fill("#ffd966");
      rect(0, 0, progressValue, 30);
      fill(0);
      textAlign(CENTER);
      textSize(18);
      text("progress:" + counter + "%", width / 2, 22);
      pop();
    } else {
      if (counter >= 100) {
        //successful
        background("#CDDC39");
        fill(20);
        textAlign(CENTER);
        textSize(25);
        text(
          "You've finished the PCR test successfully",
          width / 2,
          height / 2
        );
        textSize(15);
        text(
          "You can return to the main calendar",
          width / 2,
          height / 2 + 30
        );
      } else if (counter < 100) {
        background("#990000");
        fill(220);
        textAlign(CENTER);
        textSize(30);
        text("You failed to do the PCR test", width / 2, height / 2);
        textSize(15);
        text(
          "Please refresh the page to start over again",
          width / 2,
          height / 2 + 30
        );
      }
    }
  } else{
     background(0, 20);
     textAlign(CENTER);
     textSize(25);
     textStyle(BOLD); 
     fill(255);   
     text("Click the canvas", width/2, height/2);
    text("and then press 'a' to start the game", width/2, height/2+30);
  }
}

function mousePressed() {
  let clickDiameter = dist(mouseX, mouseY, button.x, button.y);

  if (clickDiameter <= button.diameter) {
    // check if a figure is hot, if yes, step it
    for (let i = 0; i < figures.length; i++) {
      if (figures[i].hot == true && figures[i].stepped == false) {
        figures[i].step();
        figures[i].stepped = true;
        counter += 20;
      }
    }
  }
}

class Button {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.diameter = 100;
    this.click = false;
    this.scale = 1;
  }
  update() {
    if (this.click == true) {
      this.scale = 0.95;
      this.color = "#4CAF50";
    } else {
      this.scale = 1;
      this.color = "#e06666";
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    push();
    scale(this.scale);

    push();
    noStroke();
    fill(this.color);
    circle(0, 0, 120);
    pop();

    push();
    noFill();
    strokeWeight(3);
    stroke(207, 226, 243);
    circle(0, 0, 105);
    pop();

    pop();
    pop();
  }
}

class Arrow {
  constructor(startX, startY, speed) {
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.oneRoundFinished = false;
  }
  update() {
    this.x -= this.speed;
   
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill("#FFC107");
    triangle(0, 0, -10, -20, 10, -20);
    rect(-5, -40, 10, 25);
    pop();
  }
}

class Figure {
  constructor(startX, startY, isMe, width) {
    this.x = startX;
    this.y = startY;
    this.isMe = isMe;
    this.width = width;
    this.stepped = false;
    this.hot = false;

    if (this.isMe == true) {
      this.color = "#674ea7";
    } else {
      this.color = "#000000";
    }
  }
  display() {
    fill(this.color);
    if (this.hot == true) {
      this.color = "red";
    }
    push();
    translate(this.x, this.y);

    push();
    stroke(this.color);
    strokeWeight(5);
    //body
    line(0, -20, -3, 10);
    //legs
    line(-3, 10, -10, 50);
    line(-3, 10, 10, 50);
    //arms
    line(-2, -12, -18, 15);
    line(-2, -12, 15, 15);
    pop();

    push();
    noStroke();
    fill(this.color);
    ellipse(0, -35, 35, 30);
    pop();

    pop();
  }
  step() {
    this.x += this.width / 2;
  }

  checkIfStep(other) {
    if (other.x == width) {
      this.stepped == false;
    }

    let distance = abs(other.x - this.x);
    // is the arrow close?
    if (distance < this.width / 2) {
      // circle to see if distance funciton works
      noStroke();
      circle(this.x, this.y - 80, 10);

      //other player:
      if (this.isMe == false && this.stepped == false) {
        this.step();
        this.stepped = true;
      } else if (this.isMe == true && this.stepped == false) {
        // while the arrow is close we are hot
        this.hot = true;
      }
    }
    // if the arrow is not close we are cold (doesn't matter if isMe or not, eberything can be cold when arrow is far)
    else {
      this.hot = false;
    }

    if (this.stepped == true && this.isMe == true) {
      this.color = "#674ea7";
    }
  }
}

class CovidSign {
  constructor() {}
  display() {
    push();
    noStroke();
    fill("#FADF8E");
    rect(360, 200, 120, 50);
    triangle(480, 180, 480, 270, 500, 225);
    strokeWeight(3);
    stroke("#FADF8E");
    line(425, 250, 425, 480);
    pop();
    textSize(20);
    textAlign(CENTER);
    textStyle(BOLD);
    text("PRC Test", 425, 234);
  }
}

class Ground {
  constructor() {}

  display() {
    push();
    //ground
    push();
    noStroke();
    fill("#783f04");
    rect(0, 480, width, 120);
    pop();

    //grass
    for (let i = 0; i < 4; i++) {
      noStroke();
      fill("#4CAF50");
      arc(i * 150 + 80, 480, 200, 100, 0, PI);
    }
    pop();
  }
}
