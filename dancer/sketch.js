let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let cnv= createCanvas(400, 400);
  cnv.parent(canvasContainer);
  dancer = new RenaDancer(width/2, height/2);
}


function draw() {
  
  background(0);
  dancer.update();
  dancer.display(); 
}


class RenaDancer{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    // this.color = random()
    
    this.SinAxisIncrement1 = random(360);
    this.SinAxisIncrement2 = random(360);
    this.SinAxisIncrement3 = random(360);
    this.SinAxisIncrement4 = random(360);
    
    //overall
    this.SinAxisIncrement5 = random(360);
    
    //arm
    this.SinAxisIncrement6 = random(360);
  
    //head
    this.deg = 0;
    this.degPlus =1;
    

  }  
  update(){
//leg movement
    this.xRightLeg = [-15,-13,-11, -10, -8];
    //The leg position
    this.randomIndex1 = floor(random(this.xRightLeg.length));
    this.rightLeg = this.xRightLeg[this.randomIndex1];
    
    this.xLeftLeg = [5,8,10,12,15];
    //The leg position
    this.randomIndex2 = floor(random(this.xLeftLeg.length));
    this.leftLeg = this.xLeftLeg[this.randomIndex2];
        
//body movement
    let rad1 = radians(this.SinAxisIncrement1);
    let sinValue1 = sin(rad1);
    this.xOffset1 = map(sinValue1, -1, 1, -5, 5);
    this.SinAxisIncrement1 += 1;
    
    let rad2 = radians(this.SinAxisIncrement2);
    let sinValue2 = sin(rad2);
    this.xOffset2 = map(sinValue2, -1, 1, -5, 5);
    this.SinAxisIncrement2 += 1;

    let rad3 = radians(this.SinAxisIncrement3);
    let sinValue3 = sin(rad3);
    this.xOffset3 = map(sinValue3, -1, 1, -5, 5);
    this.SinAxisIncrement3 += 1;
    
    let rad4 = radians(this.SinAxisIncrement4);
    let sinValue4 = sin(rad4);
    this.xOffset4 = map(sinValue4, -1, 1, -5, 5);
    this.SinAxisIncrement4 += 1;
    
    //overall left and right
    let rad5 = radians(this.SinAxisIncrement5);
    let sinValue5 = sin(rad5);
    this.xOffset5 = map(sinValue5, -1, 1, -30, 30);
    this.SinAxisIncrement5 += 2;    
    
    //arm
    let rad6 = radians(this.SinAxisIncrement6);
    let sinValue6 = sin(rad6);
    let cosValue6 = cos(rad6);
    this.xOffset6 = map(sinValue6, -1, 1, -15, 15);
    this.yOffset6 = map(cosValue6, -1, 1, -15, 15);
    this.SinAxisIncrement6 += 6;
    
    //arm up and down
    this.yOffset7 = map(sinValue1, -1, 1, -8, 8);
    
    
    //scale mouth
    this.offset = map(sinValue1, -1, 1, 0.8, 1.1);
    //scale overall
    this.offset2 = map(sinValue1, -1, 1, 0.7, 1);
    
    // HEAD !!!
    if(this.deg>=10 || this.deg<=-10){
      this.degPlus = -this.degPlus;
    }
    this.deg=this.deg+this.degPlus;
   // console.log (this.deg);

  }
  
  display(){
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    push();
    translate(this.x, this.y);
    
    push();    
    scale(this.offset2);  //can comment this out
    translate(this.xOffset5, 0);
    
    // ******** //
    // ⬇️ draw your dancer here ⬇️
    
//arm
    push();
    translate(0, this.yOffset7-15);
    push();
    noFill();
    stroke(255);
    strokeWeight(5);
    bezier(0, -30, -40, 50, -50+this.xOffset6, -40+this.yOffset6, -65, 10+this.yOffset6);
    bezier(0, -30, 40, 50, 50+this.xOffset6, -40+this.yOffset6, 65, 10+this.yOffset6);
    pop();
    
    pop();    
    
    
    
//head
    push();
    translate(0, -62);
    push();
    rotate(radians(this.deg));
    fill(255);
    noStroke();
    rect(-35,-25, 70,50);
    pop();
    pop();
    

    
//eyes
    push();
    translate(-20, -65);
    push();
    rotate(radians(40));
    fill(0);
    noStroke();  
    ellipse(0, 0, 12, 15);
    pop();
    pop();
    
    push();
    translate(15,-65);
    push();
    rotate(radians(40));
    fill(0);
    noStroke();  
    ellipse(0, 0, 15, 12);
    pop();    
    pop();
    
//body
    push()
    translate(this.xOffset1, 0);
    fill(255);
    noStroke();
    ellipse(0, 0, 60, 30);
    pop();
    
    push()
    translate(this.xOffset2, 0);
    fill(255);
    noStroke();
    ellipse(0, -25, 60, 30);
    pop();
    
    push()
    translate(this.xOffset3, 0);
    fill(255);
    noStroke();
    ellipse(0, 25, 60, 30);
    pop();
    
    push()
    translate(this.xOffset4, 0);
    fill(255);
    noStroke();
    ellipse(0, 50, 60, 30);
    pop();

//mouth
    push();
    translate(-17, -52);
    push();
    scale(this.offset);
    fill("red");
    stroke(255);
    bezier(0,0, 10, 15, 20, 15 , 30, 0);
    pop();    
    pop();
    


//leg
    push();
    stroke(255);
    strokeWeight(5);
    //right
    line(-10, 55, this.rightLeg, 90);
    //left
    line(10, 55, this.leftLeg, 90);
    pop();
    
    
    // ⬆️ draw your dancer here ⬆️
    pop();
    
    
    
    // ******** //
    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes() 
    
    pop();
  }  
  
  
  drawReferenceShapes(){
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);                       
    rect(-100, -100, 200, 200);    
    fill(255);
    stroke(0);
  }
  
  
}





/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmomize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 

*/