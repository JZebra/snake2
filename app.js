window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    var py, py, vx, vy, xmax, ymax;
    initGame()
    var framerate = 1000/15 // 66.67 fps
    setInterval(tick, framerate)
}

function initGame() {
    px = 10;
    py = 10;
    vx = 0;
    vy = 0;
    xmax = 20;
    ymax = 20;
}

function keyPush(event) {
    //Keyboard codes
    // w == 87
    // a == 65
    // s == 83
    // d == 68
    switch(event.keyCode) {
        case 87:
            console.log(`px: ${px}, py: ${py}`)
            vx = 0; vy = 1;
            break;
        case 65:
            console.log(`px: ${px}, py: ${py}`)
            vx = -1; vy = 0;
            break;
        case 83:
            console.log(`px: ${px}, py: ${py}`)
            vx = 0; vy = -1;
            break;
        case 68:
            console.log(`px: ${px}, py: ${py}`)
            vx = 1; vy = 0;
            break;
    }
}

function tick() {
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
}


