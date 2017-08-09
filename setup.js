//Sets up the sprite textures and positioning for the level, and adds them to the stage
//Also sets up the key handling events

function setup() {
    //stage.position sets where the game attaches to the canvas.
    stage.position.set(0, 0);

    //Background back image is fixed to the camera for parallax scrolling
    bgBack = new Sprite(resources["images/PNG/environment/layers/background.png"].texture);
    bgBack.position.x = 0;
    bgBack.position.y = 0;
    //Background front image is tiled to allow for scrolling while the player moves
    bgFront = new TilingSprite(resources["images/PNG/environment/layers/middleground.png"].texture, 1440, 176);
    bgFront.position.x = 0;
    bgFront.position.y = 0;
    bgFront.tilePosition.x = 0;
    bgFront.tilePosition.y = 0;
    
    stage.addChild(bgBack);
    stage.addChild(bgFront);
    
    collSprites = buildLevel(testLevel);
    b = new Bump(PIXI);
    
    ////////////Setting up the player sprite  ///////////////////////////////////////////////////
    
    idleTextures = [    frame("images/PNG/spritesheets/player/player-idle.png",  29, 24, 20, 40), 
                        frame("images/PNG/spritesheets/player/player-idle.png", 110, 24, 20, 40),
                        frame("images/PNG/spritesheets/player/player-idle.png", 191, 24, 20, 40),
                        frame("images/PNG/spritesheets/player/player-idle.png", 270, 24, 20, 40)];
    runTextures = [     frame("images/PNG/spritesheets/player/player-run.png",  27, 27, 36, 36), 
                        frame("images/PNG/spritesheets/player/player-run.png", 109, 27, 20, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 184, 27, 36, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 260, 27, 36, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 345, 27, 36, 36), 
                        frame("images/PNG/spritesheets/player/player-run.png", 431, 27, 36, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 584, 27, 36, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 661, 27, 36, 36),
                        frame("images/PNG/spritesheets/player/player-run.png", 745, 27, 36, 36)];
    jumpTextures = [    frame("images/PNG/spritesheets/player/player-jump.png", 106, 26, 28, 38),
                        frame("images/PNG/spritesheets/player/player-jump.png", 186, 26, 28, 38),
                        frame("images/PNG/spritesheets/player/player-jump.png", 266, 26, 28, 38),
                        frame("images/PNG/spritesheets/player/player-jump.png", 346, 26, 28, 38),
                        frame("images/PNG/spritesheets/player/player-jump.png", 426, 26, 28, 38)];
    
    playerSprite = new PIXI.extras.AnimatedSprite(idleTextures);
    updatehitArea();
    playerSprite.animationSpeed = 0.06;
    playerSprite.play();
    
    //Set starting position
    playerSprite.x = 20;
    playerSprite.y = 80;
    
    playerSprite.interactive = false;
    playerSprite.vx = 0;
    playerSprite.vy = 0;
    
    stage.addChild(playerSprite);   
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Key Handling Setup
    //left key handling
    left.press = () => {
        if(playerSprite.scale.x === 1){
            playerSprite.scale.x = -1;
        }
        if(playerSprite.vy === 0){
            playerSprite.textures = runTextures;
            playerSprite.animationSpeed = 0.15;
            playerSprite.play();
        }
        playerSprite.vx = -playerMoveSpeed;   
    };
    
    left.release = () => {
        if(!right.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
            playerSprite.textures = idleTextures;
            playerSprite.animationSpeed = 0.06;
            playerSprite.play();
        }
    };
    
    //Right Key handling
    right.press = () => {
        if(playerSprite.scale.x === -1){
            playerSprite.scale.x = 1;
        }
        if(playerSprite.vy === 0){
            playerSprite.textures = runTextures;
            playerSprite.animationSpeed = 0.15;
            playerSprite.play();
        }
        playerSprite.vx = playerMoveSpeed;
    };
    
    right.release = () => {
        if(!left.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
            playerSprite.textures = idleTextures;
            playerSprite.animationSpeed = 0.06;
            playerSprite.play();
        }
    };
    
    //Up key handling
    up.press = () => {
        if (playerSprite.vy === 0){
            playerSprite.vy = playerJumpHeight;
            playerSprite.textures = jumpTextures;
            playerSprite.animationSpeed = 0.2;
            playerSprite.play();
        }
    };
    
    up.release = () => {
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