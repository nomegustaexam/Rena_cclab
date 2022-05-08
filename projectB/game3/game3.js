// icons used is from:
// https://www.flaticon.com/free-icon/homework_2113886?related_id=2113886&origin=search&k=1651600990147#
// https://www.flaticon.com/premium-icon/daughter_2880501?related_id=2880501#
// https://www.flaticon.com/premium-icon/son_2880690?related_id=2880701&origin=search#

let workload = 40;
let emotionlevel = 15;

let img, girl, boy, shanghai;

let emotionLevel = 5;
let homeworkLevel = 5;

let experienceStarted = false;

function preload() {
  img = loadImage("homework.png");
  girl = loadImage("daughter.png");
  boy = loadImage("son.png");
  bgimg = loadImage("covid shanghai.png")
}
function setup() {
  let cnv3 = createCanvas(600, 600);
  cnv3.parent("canvasContainer3")

  badManager = new BadManager(5);
  goodManager = new GoodManager(5);
  homeworkManager = new HomeworkManager(4);
  player = new Player(width / 2, height / 2);

  playerIcon = random(2);
}

function draw() {
  image(bgimg, 0, 0, 600, 600);
  
  if(experienceStarted == true){
      
      badManager.display();
      goodManager.display();
      homeworkManager.display();

      badManager.update();
      badManager.display();
      goodManager.update();
      goodManager.display();
      homeworkManager.update();
      homeworkManager.display();
      player.update();
      player.display();
      noCursor();

      emotionPH = map (emotionLevel, 0, 50, 0, width/2);
      homeworkPH = map (homeworkLevel, 0, 50, 0, width/2);


      push();
      fill(220);
      noStroke();
      rect(0, 0, width/2, 30);
      fill("#ffd966");
      rect(0, 0, emotionPH, 30);
      pop();

      push();
      fill(220);
      noStroke();
      rect(width/2, 0, width/2, 30);
      fill("#93c47d");
      rect(width/2, 0, homeworkPH, 30);
      pop(); 
      text("Emotion level", 100, 20);
      text("Homework level", 400, 20);
  }else{
    background(87, 100, 175, 50);
    push();
    textAlign(CENTER);
    noStroke();
    push();
    fill("#D6E4E7");
    rect(width/7, height/2-90, width/1.4, 65, 50);
    pop();
    textSize(23)
    textStyle(BOLD);
    fill("#253697");
    text("Click here to start the experience", width/2, height/2-50);
    pop();
  }

  
  if (homeworkLevel >= 50){
    experienceStarted = false;
    background("#93c47d");
    push();
    fill(100);
    textSize(30);
    textAlign(CENTER);
    text("We made it!", width/2, height/2);
    text("We've overcame this difficult semester!", width/2, height/2+50);
    textSize(15);
    text("You can return to the main calendar.", width/2, height/3)
    pop();
  }
  
  if (emotionLevel <= 0){
    experienceStarted = false;
    background("#c71717");
    push();
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("We failed...", width/2, height/2);
    text("This is a harsh semester for everyone...", width/2, height/2+50);
    textSize(15);
    text("Refresh the page to start over again.", width/2, height/3)
    pop();
  }
}

function mousePressed() {
  experienceStarted = true;
}

class Player {
  constructor(startX, startY) {
    // this.x = startX;
    // this.y = startY;
    this.rad = 10;
  }
  update() {
    this.x = mouseX;
    this.y = mouseY;
  }
  display() {
    push();
    translate(this.x, this.y);
    // circle(0, 0, 50);
    push();
    if (playerIcon >= 1) {
      scale(0.4);
      image(girl, -63, -60);
    } else if (playerIcon < 1) {
      scale(0.37);
      image(boy, -63, -63);
    }
    pop();

    pop();
  }
}

class Homework {
  constructor(startX, startY, lifeLength) {
    this.x = startX;
    this.y = startY;
    this.lifeLength = lifeLength;
    this.scale = 1;
    this.appear = true;
    this.alive = true;
    this.time = 0;
    this.w = 55;
    this.h = 60;
  }
  checkCollision(other) {
    if (
      other.x > this.x - this.w / 2 &&
      other.x < this.x + this.w / 2 &&
      other.y > this.y - this.h / 2 &&
      other.y < this.y + this.h / 2
    ) {
      console.log("homework done");
      this.scale = 1.2;
      this.appear = false;
      homeworkLevel++;
    } else{
      this.scale = 1;
    }
  }
  update() {
    if (this.time >= this.lifeLength) {
      this.alive = false;
    }
    this.time++;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.scale)
    // rect(-this.w/2, -this.h/2, this.w, this.h);
    scale(0.5);
    push();
    image(img, -63, -63);
    pop();
    pop();
  }
}

class HomeworkManager {
  constructor(numHomework) {
    this.homeworks = [];
    for (let i = 0; i < numHomework; i++) {
      push();
      this.homeworks.push(
        new Homework(random(30, width - 30), random(20, 500), random(500, 600))
      );
      pop();
    }
  }
  update() {
    for (let i = 0; i < this.homeworks.length; i++) {
      this.homeworks[i].checkCollision(player);
      this.homeworks[i].update();
      this.homeworks[i].display();
    }
    //delete the one collided
    for (let i = this.homeworks.length - 1; i >= 0; i--) {
      if (
        this.homeworks[i].appear == false ||
        this.homeworks[i].alive == false
      ) {
        this.homeworks.splice(i, 1);
        this.homeworks.push(
          new Homework(
            random(30, width - 30),
            random(20, 500),
            random(500, 600)
          )
        );
      }
    }
  }
  display() {
    for (let i = 0; i < this.homeworks.length; i++) {
      push();
      this.homeworks[i].update();
      this.homeworks[i].display();
      pop();
    }
  }
}

class Bad {
  constructor(startX, startY, rad, speed, scale) {
    this.x = startX;
    this.y = startY;
    this.rad = rad;
    this.speed = speed;
    this.scale = scale;
    this.appear = true;
  }

  update() {
    if (this.x > width + 5) {
      this.x = -5;
    }
    this.x += this.speed;
  }

  checkCollision(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    if (distance < this.rad + other.rad) {
      // collided
      this.scale = 1.2;
      this.appear = false;
      if (emotionLevel > 0){
        emotionLevel-= 3;
      }
    } else {
      this.scale = 1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    push();
    scale(this.scale);
    noStroke();
    fill("#f44336");
    circle(0, 0, this.rad);
    strokeWeight(3);
    stroke(0);
    line(-13, -7, -4, -3);
    line(13, -7, 4, -3);
    bezier(-10, 10, -5, 1, 5, 1, 10, 10);
    pop();
    pop();
  }
}

class BadManager {
  constructor(numBad) {
    this.bads = [];
    for (let i = 0; i < numBad; i++) {
      push();
      this.bads.push(new Bad(random(width), random(500), 40, random(2), 1));
      pop();
    }
  }
  update() {
    for (let i = 0; i < this.bads.length; i++) {
      this.bads[i].checkCollision(player);
      if (this.bads[i].appear == false) {
        this.bads[i].update();
        this.bads[i].display();
        this.bads.push(new Bad(random(width), random(500), 40, random(2), 1));
      }
    }
    for (let i = this.bads.length - 1; i >= 0; i--) {
      if (this.bads[i].appear == false) {
        this.bads.splice(i, 1);
      }
    }
  }
  display() {
    for (let i = 0; i < this.bads.length; i++) {
      push();
      this.bads[i].update();
      this.bads[i].display();
      pop();
    }
  }
}

class Good {
  constructor(startX, startY, rad, speed, scale) {
    this.x = startX;
    this.y = startY;
    this.rad = rad;
    this.speed = speed;
    this.scale = scale;
    this.appear = true;
  }

  update() {
    if (this.x < -5) {
      this.x = width + 5;
    }
    this.x -= this.speed;
  }

  checkCollision(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    if (distance < this.rad + other.rad) {
      // collided
      this.scale = 1.2;
      this.appear = false;
      if(emotionLevel<100){
        emotionLevel++;
      }  
    } else {
      this.scale = 1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    push();
    scale(this.scale);
    noStroke();
    fill("#8BC34A");
    circle(0, 0, this.rad);
    strokeWeight(3);
    stroke(0);
    bezier(-13, -5, -10, -10, -6, -10, -3, -5);
    bezier(13, -5, 10, -10, 6, -10, 3, -5);
    bezier(-10, 5, -5, 13, 5, 13, 10, 5);
    pop();
    pop();
  }
}

class GoodManager {
  constructor(numGood) {
    this.goods = [];
    for (let i = 0; i < numGood; i++) {
      push();
      this.goods.push(new Good(random(width), random(500), 40, random(2), 1));
      pop();
    }
  }
  update() {
    for (let i = 0; i < this.goods.length; i++) {
      this.goods[i].checkCollision(player);
      if (this.goods[i].appear == false) {
        this.goods[i].update();
        this.goods[i].display();
        this.goods.splice(i, 1);
        this.goods.push(new Good(random(width), random(500), 40, random(2), 1));
      }
    }
  }
  display() {
    for (let i = 0; i < this.goods.length; i++) {
      push();
      this.goods[i].update();
      this.goods[i].display();
      pop();
    }
  }
}
