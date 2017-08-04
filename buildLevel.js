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