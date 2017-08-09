//This function sets up the keyboard input event listeners

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    //The downHandler
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        //prevents page reload
        event.preventDefault();
    };
    
    //The upHandler
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        //prevents page reload
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