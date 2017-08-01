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
    var head = {
        'px': px,
        'py': py
    };
    this.stepsize = stepsize;
    this.segments = [head];
    this.move = function(shouldGrow) {
        if (shouldGrow) {
            this.addSegment();
        }
        this.moveBody();
        this.moveHead();
    }

    // Returns true if the snake eats the food.
    this.eat = function(food) {
        var head = this.segments[0];
        if (head.px == food.px && head.py == food.py) {
            return true;
        } else {
            return false;
        }
    }

    this.moveHead = function() {
        var head = this.segments[0];
        head.px = head.px += this.vx * this.stepsize;
        head.py = head.py += this.vy * this.stepsize;
        if (head.px > xmax) {
            head.px = 0;
        }
        if (head.py > ymax) {
            head.py = 0;
        }
        if (head.px < 0) {
            head.px = xmax;
        }
        if (head.py < 0) {
            head.py = ymax;
        }
    }

    this.moveBody = function() {
        if (this.segments.length == 1) {
            return
        }
        // start at the last segment and move backwards
        for (var i = this.segments.length - 1; i >= 1; i--) {
            var nextSegment = this.segments[i-1];
            this.segments[i].px = nextSegment.px;
            this.segments[i].py = nextSegment.py;
        }
    }

    this.addSegment = function() {
        this.segments.push({
            'px': null,
            'py': null
        });
    }
}

function initGame(ctx, canv) {
    stepsize = 10;
    snake = new Snake(10, 10, 0, 0, stepsize)
    xmax = canv.width - stepsize;
    ymax = canv.height - stepsize;
    food = null;
    shouldGrow = false;
    makeFood(ctx, canv);
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
    // did snake eat?
    if (snake.eat(food)) {
        food = null;
        shouldGrow = true;
    }

    // update positions
    if (!food) {
        makeFood(ctx, canv)
    }
    snake.move(shouldGrow)
    shouldGrow = false;

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
    ctx.fillRect(food['px'], food['py'], foodsize, foodsize)
}

function makeFood(ctx, canv) {
    // round to the nearest multiple of stepsize
    let randx = Math.floor(Math.random() * canv.width / stepsize) * stepsize;
    let randy = Math.floor(Math.random() * canv.height / stepsize) * stepsize;
    food = {
        'px': randx,
        'py': randy,
    }
}


