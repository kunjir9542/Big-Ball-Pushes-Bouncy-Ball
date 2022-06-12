const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;

let engine;

const width = window.innerWidth;
const height = window.innerHeight;

let allObjectsArray = [];
let dominoesArray = [];
let numDominoes = 25;
let ground, ground2, ground3;
let forceApplied = false;
let pend;
let pendConstraint;

function setup() {
  createCanvas(width, height);

  // create an engine
  engine = Engine.create();

  for (let index = 0; index < numDominoes; index++) {
      var rectangle = Bodies.rectangle(200 + index*40, 0, 15, 135, {
          frictionAir: 0.005,
      });
      allObjectsArray.push(rectangle);
      dominoesArray.push(rectangle);
  }

  ground = Bodies.rectangle(10, 200, 700, 10, {
    isStatic: true, 
  });

  ground2 = Bodies.rectangle(750, 500, 700, 10, {
    isStatic: true, 
  });

  

  allObjectsArray.push(ground, ground2);

  // setup mouse
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // add all of the bodies to the world
  World.add(engine.world, allObjectsArray);


  Engine.run(engine);
}

function draw() {
  background(0);

  fill(255);
//   drawBody(boxA);
//   drawBody(boxB);

  dominoesArray.forEach(element => {
      drawBody(element);
  });

  fill(128);
  drawBody(ground);
  drawBody(ground2);
  
  drawMouse(mouseConstraint);

  fill(255);
  textAlign(CENTER, CENTER);
}

document.addEventListener("keyup", force);


