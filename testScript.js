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
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);
    
    left.press = () => {
        playerSprite.vx = -2;
        playerSprite.vy = 0;
    };
    
    left.release = () => {
        if(!right.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };
    
    //Up key handling
    up.press = () => {
        playerSprite.vy = -2;
        playerSprite.vx = 0;
    };
    
    up.release = () => {
        if(!down.isDown && playerSprite.vx === 0) {
            playerSprite.vy = 0;
        }
    };
    
    
    //Right Key handling
    right.press = () => {
        playerSprite.vx = 2;
        playerSprite.vy = 0;
    };
    
    right.release = () => {
        if(!left.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };
    
    
    //Down key handling
    down.press = () => {
        playerSprite.vy = 2;
        playerSprite.vx = 0;
    };
    
    down.release = () => {
        if(!up.isDown && playerSprite.vx === 0) {
            playerSprite.vy = 0;
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
    playerSprite.x += playerSprite.vx;
    playerSprite.y += playerSprite.vy;
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
