//Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite,
    Texture = PIXI.Texture,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle;

//Create stage and renderer 
let stage = new Container();
let renderer = autoDetectRenderer(1440, 176);
document.body.appendChild(renderer.view);

renderer.view.style.border = "1px solid black";
renderer.backgroundColor = "0xFFFFFF";

//load the player sprite and setup function
loader
    .add([
        "images/PNG/spritesheets/player/player-idle.png",
        "images/PNG/environment/layers/background.png",
        "images/PNG/environment/layers/middleground.png",
        "images/PNG/environment/layers/tilesets.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

let playerSprite, bgBack, bgFront, state;

let playerGravity = 0.2,
    playerMoveSpeed = 2,
    playerJumpHeight = -4;

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

function setup() {
    
    //Setting up the background
    bgBack = new TilingSprite(resources["images/PNG/environment/layers/background.png"].texture, 1440, 176);
    bgBack.position.x = 0;
    bgBack.position.y = 0;
    bgBack.tilePosition.x = 0;
    bgBack.tilePosition.y = 0;
    bgFront = new TilingSprite(resources["images/PNG/environment/layers/middleground.png"].texture, 1440, 176);
    bgFront.position.x = 0;
    bgFront.position.y = 0;
    bgFront.tilePosition.x = 0;
    bgFront.tilePosition.y = 0;
    stage.addChild(bgBack);
    stage.addChild(bgFront);
    
    /*
    sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 336, 96, 16, 16));
    sprite.x = 0;
    sprite.y = 0;
    stage.addChild(sprite);
    */
    buildLevel(testLevel);
    
    //Setting up the player sprite
    playerSprite = new Sprite(frame("images/PNG/spritesheets/player/player-idle.png", 29, 24, 20, 40));
    playerSprite.x = 10;
    playerSprite.y = 10;
    playerSprite.vx = 0;
    playerSprite.vy = 0;
    stage.addChild(playerSprite);    
    
    //Key Handling
    //left key handling
    left.press = () => {
        playerSprite.vx = -playerMoveSpeed;
    };
    
    left.release = () => {
        if(!right.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };
    
    //Up key handling
    up.press = () => {
        if (playerSprite.vy === 0)
            playerSprite.vy = playerJumpHeight;
    };
    
    up.release = () => {
    };
    
    
    //Right Key handling
    right.press = () => {
        playerSprite.vx = playerMoveSpeed;
    };
    
    right.release = () => {
        if(!left.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };
    
    
    //Down key handling
    down.press = () => {
        //need to add crouch animation
    };
    
    down.release = () => {
        if(!up.isDown && playerSprite.vx === 0) {
        //need to add stand animation
        }
    };
    
    
    
    state = play;
    
    gameLoop();
    
}

function gameLoop(){
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

function play () {
        
    //Gravity
    playerSprite.vy += playerGravity;
    
    playerSprite.x += playerSprite.vx;
    playerSprite.y += playerSprite.vy;
    
    let collision = contain(
        playerSprite,
        {
            x: 0,
            y: 0,
            width: renderer.view.width,
            height: renderer.view.height
        }
    );
    
    //Check for a collision. If the value of `collision` isn't
    //`undefined` then you know the sprite hit a boundary
    if (collision) {
        //Stop left or right movement in event of a left right collision
        if (collision.has("left") || collision.has("right")){
            playerSprite.vx = 0;
        }

        //Stop up down movement in the event of up down collision
        if (collision.has("top") || collision.has("bottom")){
            //if ( (playerSprite.vy >= 0.2) && (!right.isDown0)) playerSprite.vx = 0;
            playerSprite.vy = 0;
            
            //Special case to allow player to continue running after jump
            if (!(right.isDown || left.isDown))
                playerSprite.vx = 0; 
        }
    }
}

function frame(source, x, y, width, height) {
    let texture, imageFrame;
    
    //If the source is a string, it's either a texture in the
    //cache or an image file
    if (typeof source === "string") {
        if (resources[source].texture){
            texture = new Texture(resources[source].texture);
        }
    }
    //If the `source` is a texture, use it
    else if (source instanceof Texture) {
        texture = new Texture(source);
    }
    
    if(!texture) {
        console.log(`Please load the ${source} texture into the cache.`);
    } else {
        //Make a rectangle the size of the sub-image
        imageFrame = new Rectangle(x, y, width, height);
        texture.frame = imageFrame;
        return texture;
    }
}


function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress);
}

function buildLevel(level) {
    let rows = 0,
        cols = 0;
    
    for( rows = 0; rows < level.height; rows++){
        for( cols = 0; cols < level.width; cols++){
            let sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 336, 96, 16, 16));
            if( level.layers[1].data[(level.width*rows+cols)] == 166){
                sprite.x = cols * level.tilewidth;
                sprite.y = rows * level.tileheight;
                stage.addChild(sprite);
                console.log(level.height*cols+rows + " X: " + sprite.x + " Y: " + sprite.y);
            }    
        }
    }
}
