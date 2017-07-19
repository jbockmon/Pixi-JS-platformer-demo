//Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//let keyObject = keyboard(asciiKeyCodeNumber);


//Create stage and renderer 
let stage = new Container();
let renderer = autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

renderer.view.style.border = "1px solid black";
renderer.backgroundColor = "0xFFFFFF";

//load the player sprite and setup function
loader
    .add("images/PNG/sprites/player/player-idle/player-idle-1.png")
    .load(setup);

let playerSprite, state;

let playerGravity = 0.1,
    playerMoveSpeed = 2,
    playerJumpHeight = -4;

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

function setup() {
    playerSprite = new Sprite(resources["images/PNG/sprites/player/player-idle/player-idle-1.png"].texture);
    
    //initial position
    playerSprite.x = 10;
    playerSprite.y = 10;
    
    //initial velocities
    playerSprite.vx = 0;
    playerSprite.vy = 0;
    
    stage.addChild(playerSprite);
    
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

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    
    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        
        event.preventDefault();
    };
    
    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );

    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );

    //Return the `key` object
    return key;
}

function contain(sprite, container) {

    //Create a `Set` called `collision` to keep track of the
    //boundaries with which the sprite is colliding
    var collision = new Set();

    //Left
    //If the sprite's x position is less than the container's x position,
    //move it back inside the container and add "left" to the collision Set
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision.add("left");
    }

    //Top
    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision.add("top");
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision.add("right");
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision.add("bottom");
    }

    //If there were no collisions, set `collision` to `undefined`
    if (collision.size === 0) collision = undefined;

    return collision;
}

