var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png")
    cloud = loadImage("cloud.png")
}
function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    // create invisible ground
    invisibleGround=createSprite(200,190,400,15);
    invisibleGround.visible=false

}
function draw() {
    background(255);
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
    trex.collide(invisibleGround);
    spawnclouds()
    
    drawSprites();
}
function spawnclouds(){
    if(frameCount%60==0){
        var cloud1=createSprite(600,random(75,120),50,10);
        cloud1.velocityX=-3
        cloud1.addImage(cloud)
        cloud1.scale=0.1
       // console.log(trex.depth);
        //console.log(cloud1.depth)
        cloud1.depth=1
        trex.depth=cloud1.depth+1
    }
    
}