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

//Global Variables
//Create stage and renderer 
let stage = new Container();
let renderer = autoDetectRenderer(1440, 176);
//let renderer = autoDetectRenderer(720, 528);

document.body.appendChild(renderer.view);
renderer.view.style.border = "1px solid black";
renderer.backgroundColor = "0xFFFFFF";

let playerSprite, bgBack, bgFront, state, b, collSprites,
    idleTextures, runTextures, jumpTextures;

let playerGravity = 0.2,
    playerMoveSpeed = 2,
    playerJumpHeight = -4;

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

let su = new SpriteUtilities(PIXI);

//load the player sprite and setup function
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

function gameLoop(){
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

function play () {
        
    //Gravity
    playerSprite.vy += playerGravity;
    
    //Movement
    playerSprite.x += playerSprite.vx;
    playerSprite.y += playerSprite.vy;

    //Collision checking for player against level
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
}

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress);
}