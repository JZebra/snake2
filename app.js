window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    var game = new Game(ctx, canv);
    game.init();
    game.start();
}

function Game(ctx, canv) {
    this.ctx = ctx;
    this.canv = canv;

    this.init = function() {
        console.log('initializing game');
        this.stepsize = 10;
        var xmax = this.canv.width - this.stepsize;
        var ymax = this.canv.height - this.stepsize;
        this.snake = new Snake(10, 10, 1, 0, xmax, ymax, this.stepsize)
        this.food = this.makeFood();
        this.score = 0;
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    this.start = function() {
        console.log('starting game');
        framerate = 1000/15 // 15 fps
        this.interval = setInterval(this.tick.bind(this), framerate)
    }

    this.tick = function() {
        // game ending collision
        if (this.snake.collide()) {
            this.gameOver();
            return
        }

        // did snake eat?
        if (this.snake.eat(this.food)) {
            this.score += 1;
            this.food = null;
        }

        // update positions
        if (!this.food) {
            this.food = this.makeFood(ctx, canv)
        }
        this.snake.move()

        // draw board
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height)

        // draw snake
        const snakesize = 10;
        ctx.fillStyle = "white";
        for (var i = 0; i < this.snake.segments.length; i++) {
            var segment = this.snake.segments[i];
            //draw triangle for head
            if (i === 0) {
                ctx.beginPath();
                var startX, startY;
                var originX = segment['px'];
                var originY = segment['py'];
                if (this.snake.vy === -1) {
                    startX = originX + this.stepsize / 2;
                    startY = originY;
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(originX, originY + this.stepsize)
                    ctx.lineTo(originX + this.stepsize, originY + this.stepsize)
                } else if (this.snake.vx === -1) {
                    startX = originX;
                    startY = originY + this.stepsize / 2;
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(originX + this.stepsize, originY)
                    ctx.lineTo(originX + this.stepsize, originY + this.stepsize)
                } else if (this.snake.vy === 1) {
                    startX = originX + this.stepsize / 2;
                    startY = originY + this.stepsize;
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(originX, originY)
                    ctx.lineTo(originX + this.stepsize, originY)
                } else if (this.snake.vx === 1) {
                    startX = originX + this.stepsize;
                    startY = originY + this.stepsize / 2;
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(originX, originY)
                    ctx.lineTo(originX, originY + this.stepsize)
                }
                ctx.fill();

            //draw rectangles for the body
            } else {
                ctx.fillRect(segment['px'], segment['py'], snakesize, snakesize)
            }
        }

        // draw food
        const foodsize = 10;
        ctx.fillStyle = "red";
        ctx.fillRect(this.food['px'], this.food['py'], foodsize, foodsize)

        // draw score
        document.getElementById('score').innerHTML = this.score;
    }

    this.onKeyDown = function(event) {
        //Keyboard codes
        // w === 87
        // a === 65
        // s === 83
        // d === 68
        switch(event.keyCode) {
            case 83:
                this.snake.controlUp();
                break;
            case 65:
                this.snake.controlLeft();
                break;
            case 87:
                this.snake.controlDown();
                break;
            case 68:
                this.snake.controlRight();
                break;
        }
    }

    this.makeFood = function() {
        // round to the nearest multiple of stepsize
        let randx = Math.floor(Math.random() * this.canv.width / this.stepsize) * this.stepsize;
        let randy = Math.floor(Math.random() * this.canv.height / this.stepsize) * this.stepsize;
        return {
            'px': randx,
            'py': randy,
        }
    }

    this.stop = function() {
        clearInterval(this.interval);
    }

    this.gameOver = function() {
        alert('Game over')
        this.stop()
    }


}

function Snake(px, py, vx, vy, xmax, ymax, stepsize) {
    this.vx = vx;
    this.vy = vy;
    this.xmax = xmax;
    this.ymax = ymax;
    var head = {
        'px': px,
        'py': py
    };
    this.stepsize = stepsize;
    this.segments = [head];
    this.shouldGrow = false;

    this.initializeSegments = function() {

    }

    this.move = function(shouldGrow) {
        if (this.shouldGrow) {
            // moveBody() will handle setting the correct coordinates
            this.addSegment(null, null);
            this.shouldGrow = false;
        }
        this.moveBody();
        this.moveHead(this.xmax, this.ymax);
    }

    // Returns true if the snake eats the food.
    this.eat = function(food) {
        var head = this.segments[0];
        if (head.px === food.px && head.py === food.py) {
            this.shouldGrow = true;
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
        if (this.segments.length === 1) {
            return
        }
        // start at the last segment and move backwards
        for (var i = this.segments.length - 1; i >= 1; i--) {
            var nextSegment = this.segments[i-1];
            this.segments[i].px = nextSegment.px;
            this.segments[i].py = nextSegment.py;
        }
    }

    this.addSegment = function(px, py) {
        this.segments.push({
            'px': px,
            'py': py
        });
    }

    this.collide = function() {
        var head = this.segments[0];
        for (var i = 1; i < this.segments.length; i++) {
            var segment = this.segments[i];
            if (head.px === segment.px && head.py === segment.py) {
                return true;
            }
        }
        return false;
    }

    this.controlUp = function() {
        if (this.vy != -1) {
            this.vx = 0; this.vy = 1;
        }
    }

    this.controlLeft = function() {
        if (this.vx != 1) {
            this.vx = -1; this.vy = 0;
        }
    }

    this.controlDown = function() {
        if (this.vy != 1) {
            this.vx = 0; this.vy = -1;
        }
    }

    this.controlRight = function() {
        if (this.vx != -1) {
            this.vx = 1; this.vy = 0;
        }
    }
}

