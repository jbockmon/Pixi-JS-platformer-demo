//This function takes x and y coords, texture width and texture height and a texture image
//and cuts a sub texture out using the coords, and width and height, then returns the sub frame as its own texture

function frame(source, x, y, width, height) {
    let texture, imageFrame;
    
    //If the source is a string, it's either a texture in the
    //cache or an image file
    if (typeof source === "string") {
        if (resources[source].texture){
            texture = new Texture(resources[source].texture);
        }
    }
    //If the source is a texture, use it
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