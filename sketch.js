const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world, ground;

var solo
var backgroundImg;

var torre;
var torreImg;

var angle;   
var cannon;
var cannonBall;

var balls = [];

var boats = [];

function preload() {
 backgroundImg = loadImage("./assets/background.gif");
 torreImg = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle=15;


  var solo_options={
    isStatic:true }
 
solo=Bodies.rectangle(0,height-1,width*2,1, solo_options);
World.add(world, solo);

torre=Bodies.rectangle(150,350,160,310, solo_options);
World.add(world, torre);

// criar um objeto da classe cannon
cannon= new Cannon(180,110,130,100, angle);



}

function draw() {

  image(backgroundImg, 0,0,width,height);
  Engine.update(engine);
  
  push();
  rectMode(CENTER);
  rect(solo.position.x, solo.position.y, width*2,1);
  pop();
 
  
  push();
  imageMode(CENTER);
  image(torreImg, torre.position.x, torre.position.y, 160,310);
  pop();

  

  showBoats();

  for (var i= 0; i<balls.length; i++){
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();

}


function keyReleased(){

  if(keyCode=== DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
  //criar um objeto na classe cannonball
    cannonBall= new CannonBall(cannon.x, cannon.y);
 
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball,index){
  if(ball){
    ball.display();

    if (ball.body.position.x >= width || ball.body.position.y >= height - 50){
      ball.remove(index);
    }


  }
}

//boats = [barco1, barco2, barco3];

function showBoats(){

  if (boats.length > 0){

    if (boats[boats.length -1].body.position.x < width -300 ||
        boats[boats.length -1] === undefined){

      var positions = [-20, -60, -80, -40];
      var position = random(positions);
      var boat = new Boat (width, height -100, 170,170, position);
      boats.push(boat);

    }

    for (var i= 0; i<boats.length; i++){
      
      if (boats[i]){
        
        Matter.Body.setVelocity(boats[i].body, {x: -1, y:0});
        boats[i].display();

      } else {
        boats[i];
      }

    }

  }else {

    var boat = new Boat (width, height -60, 170,170, -80);
    boats.push(boat);

  }


}

// ! = not(negação)

function collisionWithBoat(index){

  for (var i=0; i< boats.length; i++){

    if (balls[index] !== undefined && boats[i] !== undefined ){
      
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      
      if (collision.collided){

        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];

      }
      
    }

  }

}
