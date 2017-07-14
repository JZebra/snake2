window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    initGame(ctx, canv)
    var framerate = 1000/60 // 66.67 fps
    setInterval(function() {tick(ctx, canv)}, framerate)
}

function initGame(ctx, canv) {
    px = 10;
    py = 10;
    vx = 0;
    vy = 0;
    xmax = canv.width;
    ymax = canv.height;

}

function keyPush(event) {
    //Keyboard codes
    // w == 87
    // a == 65
    // s == 83
    // d == 68
    switch(event.keyCode) {
        case 83:
            vx = 0; vy = 1;
            break;
        case 65:
            vx = -1; vy = 0;
            break;
        case 87:
            vx = 0; vy = -1;
            break;
        case 68:
            vx = 1; vy = 0;
            break;
    }
}

function tick(ctx, canv) {
    console.log(`px: ${px}, py: ${py}`)
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

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height)

    ctx.fillStyle = "white";
    ctx.fillRect(px, py, 10, 10)
}


