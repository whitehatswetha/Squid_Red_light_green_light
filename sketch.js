//Creating variables
var bg,bgImg;

var doll,dollFrontImg, dollBackImg;

var char, charImg, charAnim;

//To store the state of the doll, its either front or back
var dollState="back";

//To store the state of the game
var gameState = "wait";

var isPlayerMoving=false;
var winSound,loseSound,bgSound;
var soundPlayed= false;

var restartButton,title;

//for implementing timer
var timeElapsed;
var startTime;
var now;

function preload(){

  bgImg=loadImage("bg.png");

  dollFrontImg = loadImage("dollfront.png");
  dollBackImg = loadImage("dollback.png");

  charImg = loadAnimation("c0.png");
  charAnim = loadAnimation("c0.png","c3.png","c4.png","c5.png","c6.png");

  bgSound = loadSound("bg.mp3");
  winSound = loadSound("win.mp3");
  loseSound = loadSound("lose.mp3");
}

function setup() {
  createCanvas(1300, 800);

  bg = createSprite(620,650,1500,70);
  bg.addImage(bgImg);
  bg.scale=3.2

  restartButton=createImg("restart.png");
  restartButton.position(50,50);
  restartButton.size(70,70);
  restartButton.mouseClicked(reset);

  title=createImg("title.png");
  title.position(width/2-300,height/2-300);
  title.size(600,400);
  title.mouseClicked(playGame);

  doll = createSprite(650,350);
  doll.scale=1.5
  doll.addImage(dollBackImg);

  char=createSprite(1200,720);
  char.addAnimation("running",charAnim);
  char.addAnimation("stationary",charImg);

  char.changeAnimation("stationary");
  char.scale=0.5

}

function draw() {

  if(!bgSound.isPlaying()){
    bgSound.play();
    bgSound.setVolume(0.1);  
  }
  if(gameState=="wait") {
    background("black");
    textSize(40);
    fill("red")
    text("Click on the 'title' to start the game",300,500);
    text("Use 'UP ARROW KEY' to 'MOVE' the player",250,600); 
    text("1 minute to win!",width-500,200);
   
  } else if(gameState=="play"){ 

    background("#0082C4");
    callTimer();

      title.hide();
      restartButton.hide();

      
      isPlayerMoving=false;

      fill("red");
      textSize(44)
      text(timeElapsed,width-300,100);
        if(keyWentDown("UP_ARROW")){
          char.changeAnimation("running")
          char.x -=15;
            if(char.x>=520 && char.x<=400){
            char.y -= 1
            }
            console.log(char.x)
          isPlayerMoving=true;
        } else if(keyWentUp("UP_ARROW")){
          char.changeAnimation("stationary");
          isPlayerMoving=false;
        }

        var positionArr=[50,100,200,150];
        var randomNumber = random(positionArr);
        if(frameCount%randomNumber==0){
            if(dollState=="front"){
              dollState="back";
            } else {
              dollState="front";
            }
        }
        
        if(dollState=="front") {
          doll.addImage(dollFrontImg);
        } else if(dollState=="back") {
          doll.addImage(dollBackImg);
        }

        if(dollState=="front" && isPlayerMoving){
          gameState="end";
        }

        if(char.x<100){
          gameState="won"
        }
       
    drawSprites();

  } else if(gameState=="end"){
      textSize(42);
      fill("red")
      text("Oh no! You lost! GAME OVER!!",400,400)
      if(!winSound.isPlaying() && !soundPlayed){
          winSound.play();
          bgSound.stop();
        soundPlayed= true;
      } 
  } else if(gameState=="won"){
      textSize(42);
      fill("yellow")
      text("Congratulations! You WON!!",400,400)
      if(!loseSound.isPlaying() && !soundPlayed){
        loseSound.play();
        bgSound.stop();
        soundPlayed=true;
      }
  }
}


function reset(){
  window.location.reload();
}

function playGame(){
 // console.log("play")
  gameState="play";
  //start timer
  startTime= new Date().getTime();
  timeElapsed=0;
}

//Counting time in seconds
function callTimer(){
      now= new Date().getTime();

      timeElapsed=Math.round((now-startTime)/1000);

      console.log(timeElapsed);

      if(timeElapsed==60){
        gameState="end"
      }
}
