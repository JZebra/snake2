window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    initGame(ctx, canv)
    var framerate = 1000/60 // 60 fps
    setInterval(function() {tick(ctx, canv)}, framerate)
}

function initGame(ctx, canv) {
    px = 10;
    py = 10;
    vx = 0;
    vy = 0;
    xmax = canv.width;
    ymax = canv.height;
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
            if (vy != -1) {
                vx = 0; vy = 1;
            }
            break;
        case 65:
            if (vx != 1) {
                vx = -1; vy = 0;
            }
            break;
        case 87:
            if (vy != 1) {
                vx = 0; vy = -1;
            }
            break;
        case 68:
            if (vx != -1) {
                vx = 1; vy = 0;
            }
            break;
    }
}

function tick(ctx, canv) {
    console.log(`px: ${px}, py: ${py}`)

    // update snake pos
    px = px += vx;
    py = py += vy;
    if (px > xmax) {
        px = 0;
    }
    if (py > ymax) {
        py = 0;
    }
    if (px < 0) {
        px = xmax;
    }
    if (py < 0) {
        py = ymax;
    }

    // update food pos
    makeFood(ctx, canv)

    // draw board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height)

    // draw snake
    const snakesize = 10;
    ctx.fillStyle = "white";
    ctx.fillRect(px, py, snakesize, snakesize)

    // draw food
    const foodsize = 10;
    ctx.fillStyle = "red";
    ctx.fillRect(food['x'], food['y'], foodsize, foodsize)

}

function makeFood(ctx, canv) {
    if (!food) {
        console.log('creating food')
        let randx = Math.round(Math.random() * canv.width)
        let randy = Math.round(Math.random() * canv.height)
        food = {
            'x': randx,
            'y': randy,
        }
    }
}


