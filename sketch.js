var balloon, balloonImage1, balloonImage2;
// create database and position variable here
var database, position, balloonPosition;


function preload() {
   bg = loadImage("cityImage.png");
   balloonImage1 = loadAnimation("hotairballoon1.png");
   balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  createCanvas(1300,640);
  edges = createEdgeSprites();
  
  balloon = createSprite(150,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.5;

  database = firebase.database();

  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition);
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y
}

function writePosition(x, y) {
  database.ref('balloon/position').set({
    x: position.x+x,
    y: position.y+y
  })
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)) {
    //write code to move air balloon in left direction
    writePosition(-5, 0);
  }
  else if(keyDown(RIGHT_ARROW)) {
    //write code to move air balloon in right direction
    writePosition(5, 0);
  }
  else if(keyDown(UP_ARROW)) {
    //write code to move air balloon in up direction
    writePosition(0, -5);
    balloon.scale -= 0.003;
  }
  else if(keyDown(DOWN_ARROW)) {
    //write code to move air balloon in down direction
    writePosition(0, 5);
    balloon.scale += 0.003;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  fill("red");
  text("*Use arrow keys to move Hot Air Balloon!", 40, 40);
}
