var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var obs1,obs2,obs3,obs4,obs5,obs6;
var obsgroup,cloudsgroup
var PLAY=1;
var END=0;
var gamestate=PLAY
var score=0;
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png")
    cloud = loadImage("cloud.png")
    obs1=loadImage("obstacle1.png");
    obs2=loadImage("obstacle2.png");
    obs3=loadImage("obstacle3.png");
    obs4=loadImage("obstacle4.png");
    obs5=loadImage("obstacle5.png");
    obs6=loadImage("obstacle6.png");
}
function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    trex.debug=true;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    // create invisible ground
    invisibleGround=createSprite(200,190,400,15);
    invisibleGround.visible=false
    obsgroup=createGroup();
    cloudsgroup=createGroup();

}
function draw() {
    background(255);
    text("score: "+score,450,50)
    if(gamestate==PLAY) {
        //jump when the space button is pressed
        if (keyDown("space") && trex.y>=159) {
            trex.velocityY = -10;
        }
        //add gravity
        trex.velocityY = trex.velocityY + 0.8
        //infinite ground
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        spawnclouds()
        spawnobstacles()
        if(obsgroup.isTouching(trex)){
            gamestate=END
        }
    }else{
        ground.velocityX=0;
        obsgroup.setVelocityXEach(0);
        cloudsgroup.setVelocityXEach(0);
    }
    trex.collide(invisibleGround);
    drawSprites();
}
function spawnclouds(){
    if(frameCount%60==0){
        var cloud1=createSprite(600,random(75,120),50,10);
        cloud1.velocityX=-3
        cloud1.addImage(cloud)
        cloud1.scale=0.1
        //console.log(trex.depth);
        //console.log(cloud1.depth)
        cloud1.depth=1
        trex.depth=cloud1.depth+1
        cloud1.lifetime=600/3+50
        cloudsgroup.add(cloud1)
    }
    
}
function spawnobstacles(){
    if(frameCount%60==0){
        var obstacles=createSprite(600,160,10,40);
       obstacles.velocityX=-4
       var rand=Math.round(random(1,6));
       switch(rand){
           case 1:obstacles.addImage(obs1);
           obstacles.scale=0.075
           break;
           case 2:obstacles.addImage(obs2);
           obstacles.scale=0.075
           break;
           case 3:obstacles.addImage(obs3);
           obstacles.scale=0.075
           break;
           case 4:obstacles.addImage(obs4);
           obstacles.scale=0.05
           break;
           case 5:obstacles.addImage(obs5);
           obstacles.scale=0.05
           break;
           case 6:obstacles.addImage(obs6);
           obstacles.scale=0.075
           break;
           default:break
        }
        
        obstacles.lifetime=600/3+10
        obsgroup.add(obstacles)

    }
    
}