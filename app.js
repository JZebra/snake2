window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    initGame(ctx, canv)
    var framerate = 1000/15 // 15 fps
    setInterval(function() {tick(ctx, canv)}, framerate)
}

function initGame(ctx, canv) {
    snake = {
        'px': 10,
        'py': 10,
        'vx': 0,
        'vy': 0
    }
    stepsize = 10;
    xmax = canv.width - stepsize;
    ymax = canv.height - stepsize;
    food = null;
}

function keyPush(event) {
    //Keyboard codes
    // w == 87
    // a == 65
    // s == 83
    // d == 68
    switch(event.keyCode) {
        case 83:
            if (snake['vy'] != -1) {
                snake['vx'] = 0; snake['vy'] = 1;
            }
            break;
        case 65:
            if (snake['vx'] != 1) {
                snake['vx'] = -1; snake['vy'] = 0;
            }
            break;
        case 87:
            if (snake['vy'] != 1) {
                snake['vx'] = 0; snake['vy'] = -1;
            }
            break;
        case 68:
            if (snake['vx'] != -1) {
                snake['vx'] = 1; snake['vy'] = 0;
            }
            break;
    }
}

function tick(ctx, canv) {
    // update positions
    makeFood(ctx, canv)
    updateSnake(ctx, canv)

    // draw board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height)

    // draw snake
    const snakesize = 10;
    ctx.fillStyle = "white";
    ctx.fillRect(snake['px'], snake['py'], snakesize, snakesize)

    // draw food
    const foodsize = 10;
    ctx.fillStyle = "red";
    ctx.fillRect(food['x'], food['y'], foodsize, foodsize)
}

function updateSnake(ctx, canv) {
    snake['px'] = snake['px'] += snake['vx'] * stepsize;
    snake['py'] = snake['py'] += snake['vy'] * stepsize;
    if (snake['px'] > xmax) {
        snake['px'] = 0;
    }
    if (snake['py'] > ymax) {
        snake['py'] = 0;
    }
    if (snake['px'] < 0) {
        snake['px'] = xmax;
    }
    if (snake['py'] < 0) {
        snake['py'] = ymax;
    }
}

function makeFood(ctx, canv) {
    if (!food) {
        // round to the nearest multiple of stepsize
        let randx = Math.floor(Math.random() * canv.width / stepsize) * stepsize;
        let randy = Math.floor(Math.random() * canv.height / stepsize) * stepsize;
        food = {
            'x': randx,
            'y': randy,
        }
    }
}





