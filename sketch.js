var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var zombieGroup,bulletGroup,zombie,zombieImg;
var bulletImg;
var bullets=50;
var gameState="PLAY";
var score=0;
var life=3;
var lose,winning,explosion;
var ganaste,ganasteImg;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage ("assets/zombie.png");
 bulletImg = loadImage("assets/bullet_l.png");
 lose=loadSound("assets/lose.mp3");
 winning=loadSound("assets/win.mp3");
 explosion=loadSound("assets/explosion.mp3");
 ganasteImg=loadImage("assets/ganaste.jpg");
}

function setup() {
 
 
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1=createSprite(displayWidth-700,displayHeight-700,20,20);
   heart1.visible= false;
   heart1.addImage("heart1",heart1Img);
   heart1.scale=0.5

   heart2=createSprite(displayWidth-700,displayHeight-700,20,20);
   heart2.visible= false;
   heart2.addImage("heart2",heart2Img);
   heart2.scale=0.5

   heart3=createSprite(displayWidth-700,displayHeight-700,20,20);
   heart3.visible= true;
   heart3.addImage("heart3",heart3Img);
   heart3.scale=0.5

  zombieGroup = new Group();
  bulletGroup=new Group();  
}
  

function draw() {
  background(0); 

   if(gameState==="PLAY"){
   if(life===3){
    heart3.visible=true;
    heart2.visible=false;
    heart1.visible=false;
   }
   if(life===2){
    heart3.visible=false;
    heart2.visible=true;
    heart1.visible=false;
   } if(life===1){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=true;
   }

   if (life===0){
     gameState="END"
   }

   if(score===15){
     gameState="WIN"
     winning.play();
   }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(displayWidth-1100,player.y-20,20,10);
  bullet.velocityX = 9;

  bulletGroup.add(bullet);
 
  player.addImage(shooter_shooting);
  bullet.addImage(bulletImg);
  bullet.scale=.15;
  bullets=bullets-1;
  explosion.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
 
if (bullets==0){
  gameState="WAITING"
  lose.play();
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      explosion.play();
      bulletGroup.destroyEach();
      score=score+5;
    }
  }
}
//destruir al zombie cuando el cazador lo toca
 if(zombieGroup.isTouching(player)){
lose.play();

  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life=life-1;
      
    }
  }
 }

enemy();

}
drawSprites();

textSize(20);
fill("darkblue");
text("BALAS: "+bullets,displayWidth-350,displayHeight-680); 
text("SCORE: "+score,displayWidth-350,displayHeight-650);
text("VIDAS: "+life,displayWidth-350,displayHeight-620);

if (gameState==="END"){
  textSize(50);
text ("GAME OVER",700,500);
fill("blue");
zombieGroup.destroyEach();
player.destroy();
}

else if(gameState==="WAITING"){
  textSize(65);
  fill("green");
  text("TE HAS QUEDADO SIN BALAS",350,350);
  bulletGroup.destroyEach();
  
}
else if(gameState==="WIN"){
  //textSize(50);
  //fill("yellow");
  //text("GANASTE!!",700,500);
ganaste=createSprite(700,500,20,20);
ganaste.addImage("ganaste",ganasteImg);
  zombieGroup.destroyEach();

  
}
}


function enemy(){
  if(frameCount %80===0){
    zombie = createSprite(random(350,1000),random(100,600),50,50);
    zombie.addImage(zombieImg);
    zombie.velocityX= -3;
    zombie.scale=0.15;
   
    zombie.lifetime=350;
   zombieGroup.add(zombie);
  }

}