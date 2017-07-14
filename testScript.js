//Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let renderer = autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);
let stage = new Container();

loader
    .add("images/PNG/sprites/player/player-idle/player-idle-1.png")
    .load(setup);

function setup() {
    let sprite = new Sprite(resources["images/PNG/sprites/player/player-idle/player-idle-1.png"].texture);
    
    stage.addChild(sprite);
    renderer.render(stage);
}

