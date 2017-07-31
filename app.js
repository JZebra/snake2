window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    initGame(ctx, canv)
    var framerate = 1000/15 // 15 fps
    setInterval(function() {tick(ctx, canv)}, framerate)
}

function Snake(px, py, vx, vy, stepsize) {
    this.vx = vx;
    this.vy = vy;
    this.head = {
        'px': px,
        'py': py
    };
    this.stepsize = stepsize;
    this.segments = [this.head];
    this.updatePosition = function() {
        for (var i = 0; i < this.segments.length; i++) {
            var segment = this.segments[i];
            segment.px = segment.px += this.vx * this.stepsize;
            segment.py = segment.py += this.vy * this.stepsize;
            if (segment.px > xmax) {
                segment.px = 0;
            }
            if (segment.py > ymax) {
                segment.py = 0;
            }
            if (segment.px < 0) {
                segment.px = xmax;
            }
            if (segment.py < 0) {
                segment.py = ymax;
            }

        }
    }
}

function initGame(ctx, canv) {
    stepsize = 10;
    snake = new Snake(10, 10, 0, 0, stepsize)
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
            if (snake.vy != -1) {
                snake.vx = 0; snake.vy = 1;
            }
            break;
        case 65:
            if (snake.vx != 1) {
                snake.vx = -1; snake.vy = 0;
            }
            break;
        case 87:
            if (snake.vy != 1) {
                snake.vx = 0; snake.vy = -1;
            }
            break;
        case 68:
            if (snake.vx != -1) {
                snake.vx = 1; snake.vy = 0;
            }
            break;
    }
}

function tick(ctx, canv) {
    // update positions
    makeFood(ctx, canv)
    snake.updatePosition()

    // draw board
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height)

    // draw snake
    const snakesize = 10;
    ctx.fillStyle = "white";
    for (var i = 0; i < snake.segments.length; i++) {
        var segment = snake.segments[i];
        ctx.fillRect(segment['px'], segment['py'], snakesize, snakesize)
    }

    // draw food
    const foodsize = 10;
    ctx.fillStyle = "red";
    ctx.fillRect(food['x'], food['y'], foodsize, foodsize)
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

