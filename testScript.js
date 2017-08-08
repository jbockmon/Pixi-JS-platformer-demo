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

//Create stage and renderer 
let stage = new Container();
//let renderer = autoDetectRenderer(720, 528);
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
        "images/PNG/environment/layers/tilesets.png",
        "images/PNG/environment/layers/props.png",
        "images/PNG/levels/Level1v2.png",
        "images/PNG/spritesheets/enemies/octopus.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

let playerSprite,enemySprite, bgBack, bgFront, state, b, collSprites;

let playerGravity = 0.2,
    playerMoveSpeed = 2,
    playerJumpHeight = -4;

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

// virtual key functions

let vUp, vUpRight, vDown, vLeft, vRight;

vUp = (presses, wait) => {
    for(let i = 0; i < presses; i++){
        if(playerSprite.vy !== 0 && wait){
        }
        playerSprite.vy = playerJumpHeight;
    }
}
vUpRight = (presses, wait) => {
    for(let i = 0; i < presses; i++){
        if(playerSprite.vy !== 0 && wait){
        }
        playerSprite.vy = playerJumpHeight;
        playerSprite.vx = playerMoveSpeed;
    }
    playerSprite.vx = 0;
}
vLeft = (presses, wait) => {
    for(let i = 0; i < presses; i++){
        playerSprite.x = playerSprite.x - playerMoveSpeed;
    }
    playerSprite.vx = 0;
}
vRight = (presses, wait) => {
    for(let i = 0; i < presses; i++){
        playerSprite.x = playerSprite.x - playerMoveSpeed;
    }
    playerSprite.vx = 0;
}
function setup() {
    //stage.position sets where the game attaches to the canvas.
    //stage.position.set(0, 0);
    //stage.pivot.set moves the camera. 
    //stage.pivot.set(0, 0);
    
    //Setting up the background
    bgBack = new TilingSprite(resources["images/PNG/environment/layers/background.png"].texture, 1440, 176);
    bgBack.position.x = 0;
    bgBack.position.y = 0;
    bgBack.tilePosition.x = 0;
    bgBack.tilePosition.y = 0;
    //bgBack.scale.set(4,4);
    bgFront = new TilingSprite(resources["images/PNG/environment/layers/middleground.png"].texture, 1440, 176);
    bgFront.position.x = 0;
    bgFront.position.y = 0;
    bgFront.tilePosition.x = 0;
    bgFront.tilePosition.y = 0;
    //bgFront.scale.set(4,4);
    
    
    
    stage.addChild(bgBack);
    stage.addChild(bgFront);
    
    collSprites = buildLevel(testLevel);
    b = new Bump(PIXI);
    
    //Setting up the player sprite
    playerSprite = new Sprite(frame("images/PNG/spritesheets/player/player-idle.png", 29, 24, 20, 40));
        
    var lb = playerSprite.getLocalBounds();
    playerSprite.hitArea = new Rectangle(lb.x-5, lb.y-1, lb.width-5, lb.height-1);
    
    
    
    playerSprite.x = 10;
    playerSprite.y = 80;
    
    playerSprite.interactive = false;
    playerSprite.vx = 0;
    playerSprite.vy = 0;
    
    //playerSprite.scale.set(4,4);
    
    stage.addChild(playerSprite);   
    enemySprite = new Sprite(frame("images/PNG/spritesheets/enemies/octopus.png",0,0,28,37));
    //enemySprite = new Sprite(enemyTexture);
    
    enemySprite.x = 30;
    enemySprite.y = 50;
    stage.addChild(enemySprite);
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
    
    
    //
    
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
    
    //check for player on collArr collisions
    
    for(var i = 0; i < collSprites.length; i++){
        if( b.hitTestRectangle(playerSprite, collSprites[i])){
            b.rectangleCollision(playerSprite, collSprites[i], false);            
        }    
   }
    
    
    //Check for a collision. If the value of `collision` isn't
    //`undefined` then you know the sprite hit a boundary
    if (collision) {
        //Stop left or right movement in event of a left right collision
        if (collision.has("left") || collision.has("right")){
            playerSprite.vx = 0;
        }

        //Stop up down movement in the event of up down collision
        if (collision.has("top") || collision.has("bottom")){
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
        cols = 0,
        i = 0,
        tx = 0,
        ty = 0;
    let collArr = [];
    let sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 0, 0, 16, 16));;
    
    for( var layer = 0; layer < 3; layer++){
        for( rows = 0; rows < level.height; rows++){
            for( cols = 0; cols < level.width; cols++){
                
                // setting up iterator and tilex and tiley for clarity
                i = (level.width*rows+cols);     
                tx = (((level.layers[layer].data[i] % 24) * level.tilewidth) - level.tilewidth);
                ty = (Math.floor(level.layers[layer].data[i]/24) * level.tilewidth)
                console.log(i);
                switch(level.layers[layer].data[i]){
                    //no tile
                    case 0: 
                        break;
                    //invisible tile, can collide with player sprite
                    case 1:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 0, 0, 16, 16));
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        collArr.push(sprite);
                        break;  
                    case 316:
                        sprite = new Sprite(frame("images/PNG/environment/layers/props.png", 192, 16, 16, 16));
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 331:
                        sprite = new Sprite(frame("images/PNG/environment/layers/props.png", 192, 32, 16, 16));
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 346:
                        sprite = new Sprite(frame("images/PNG/environment/layers/props.png", 192, 48, 16, 16));
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        collArr.push(sprite);
                        break;
                    case 3221225559:
                        break;
                    case 2684354780:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 48, 144, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI/2;
                        sprite.anchor.x = 0;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 2684354804:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 48, 160, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI/2;
                        sprite.anchor.x = 0;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 2684354816:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 240, 160, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI/2;
                        sprite.anchor.x = 0;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 2684354840:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 240, 176, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI/2;
                        sprite.anchor.x = 0;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225618:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 16, 96, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225620:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 48, 96, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225621:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 64, 96, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break; 
                    case 3221225642:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 16, 112, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225644:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 64, 112, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225645:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 48, 112, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    case 3221225666:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", 16, 128, 16, 16));
                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                        sprite.rotation = Math.PI;
                        sprite.anchor.x = 1;
                        sprite.anchor.y = 1;
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                        break;
                    //The rest of the tiles do not get added to collision array to save cpu cycles
                    default:
                        sprite = new Sprite(frame("images/PNG/environment/layers/tilesets.png", tx, ty, level.tilewidth,            level.tilewidth));
                        sprite.x = cols * level.tilewidth;
                        sprite.y = rows * level.tileheight;
                        stage.addChild(sprite);
                   
                }
            }
        }
        
    }
    
    return collArr;
}
