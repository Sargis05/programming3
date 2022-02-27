var socket = io();
side = 20;
function setup() {
    frameRate(5);
    createCanvas(15 * side, 15 * side);
    background('#acacac');
    
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(0, 255, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 3){
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 4){
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }

}

socket.on('send matrix', nkarel);

function killGrassEater(){
    socket.emit("killGrassEater")
}
function killPredator(){
    socket.emit("killPredator")
}
function restart(){
    socket.emit("restart")
}