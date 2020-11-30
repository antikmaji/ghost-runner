var ghost, ghostImage;
var tower, towerImage;
var climber, climberImage;
var door, doorImage, doorGroup, climberGroup;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";


function preload() {

  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");

}

function setup() {
  createCanvas(400, 400);

  tower = createSprite(200, 200);
  tower.addImage("tower", towerImage);
  tower.scale = 0.7;

  ghost = createSprite(200, 200, 30, 30);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background("black");

  if (gameState === "play") {
    tower.velocityY = 2;

    if (tower.y > 300) {
      tower.y = 200;
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }


    if (keyDown("space")) {
      ghost.velocityY = -3;
    }

    ghost.velocityY = ghost.velocityY + 0.6;

    spawnDoors();

    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
      ghost.destroy();
      gameState = "end";

    }
 drawSprites();
  } else if (gameState === "end") {
    text("GAME OVER", 200, 200);
  }

 
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200, 15, climber.width, 3);
    door.x = Math.round(random(100, 300));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage("door", doorImage);
    climber.addImage("climber", climberImage);


    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    door.lifetime = 450;
    invisibleBlock.lifetime = 450;
    climber.lifetime = 450;

    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);


  }

}