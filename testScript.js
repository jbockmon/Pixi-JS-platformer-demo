//Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite,
    Texture = PIXI.Texture,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    MovieClip = PIXI.extras.MovieClip;

////////////////Global Variables////////////////////////////////////
let stage = new Container();
let renderer = autoDetectRenderer(240, 176);

//Put renderer into web page
document.getElementById("gameDiv").appendChild(renderer.view); 
renderer.view.style.border = "4px solid black";
renderer.view.style.borderRadius = "10px";
renderer.backgroundColor = "0xFFFFFF";

let playerSprite, bgBack, bgFront, state, b, collSprites,
    idleTextures, runTextures, jumpTextures;

let stageWidth = 1440,
    playerGravity = 0.2,
    playerMoveSpeed = 2,
    playerJumpHeight = -4;

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
///////////////////////////////////////////////////////////////////

//loads assets into memory
loader
    .add([
        "images/PNG/spritesheets/player/player-idle.png",
        "images/PNG/environment/layers/background.png",
        "images/PNG/environment/layers/middleground.png",
        "images/PNG/environment/layers/tilesets.png",
        "images/PNG/environment/layers/props.png",
        "images/PNG/levels/Level1v2.png",
        "images/PNG/spritesheets/player/player-run.png",
        "images/PNG/spritesheets/player/player-jump.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

//Main loop
//Checks states and updates the image on screen
function gameLoop(){
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

//Applies gravity and movement. 
//Checks collisions and checks camera position
//All checks locked at display refresh interval
function play () {
    //Apply gravity every frame
    playerSprite.vy += playerGravity;
    
    //Movement
    playerSprite.x += playerSprite.vx;
    playerSprite.y += playerSprite.vy;

    //Collision checking for player against level.
    //Only checks against collSprites array for collisions
    for(var i = 0; i < collSprites.length; i++){
        if( b.hitTestRectangle(playerSprite, collSprites[i])){
            b.rectangleCollision(playerSprite, collSprites[i], false);            
        }    
   }

    //Special case needed to check for idle and reset if so
    if(playerSprite.textures != idleTextures &&
        playerSprite.vy <= 0.2 && 
        playerSprite.vx === 0){
            left.release();
        }
    
    //Special case needed to stop jump animation into run
    if(playerSprite.textures === jumpTextures &&
        playerSprite.vy === 0 && 
        (!left.isDown || !right.isDown)){
            playerSprite.textures = runTextures;
            playerSprite.animationSpeed = 0.15;
            playerSprite.play();
        }
    changePivot();
}

//Outputs load progress to console
function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress);
}

//Checks the player position in the level and adjusts camera accordingly
//Has checks to make sure camera does not go out of the level.
function changePivot(){
    var xPivot = playerSprite.x - renderer.width / 2; 
    if (xPivot < 0 )
        xPivot = 0;
    if(xPivot > stageWidth - renderer.width)
        xPivot = stageWidth - renderer.width;
    stage.pivot.set(xPivot, 0);
    bgBack.position.x = xPivot;
    bgFront.position.x = xPivot/2;
}

//Updates the hitbox areas 
function updatehitArea(){
    var lb = playerSprite.getLocalBounds();
    playerSprite.hitArea = new Rectangle(lb.x-5, lb.y-1, lb.width-5, lb.height-1); 
}