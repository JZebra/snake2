window.onload = function(){
    var canv = document.getElementById("gc");
    var ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    var py, py, vx, vy, xmax, ymax;
    initGame()
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
            console.log(`vx: ${vx}, vy: ${vy}`)
            vx = 0; vy = 1;
            break;
        case 65:
            console.log(`vx: ${vx}, vy: ${vy}`)
            vx = -1; vy = 0;
            break;
        case 83:
            console.log(`vx: ${vx}, vy: ${vy}`)
            vx = 0; vy = -1;
            break;
        case 68:
            console.log(`vx: ${vx}, vy: ${vy}`)
            vx = 1; vy = 0;
            break;
    }
}

