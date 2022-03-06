var socket = io();
side = 30;
weath = "summer";



function setup() {
    frameRate(5);
    createCanvas(15 * side, 15 * side);
    background('#acacac');
    
}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {
    for (var y = 0; y < 15; y++) {
        for (var x = 0; x < 15; x++) {
            if (matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "autumn") {
                    fill("#333300");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "winter") {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "spring") {
                    fill("#4dffa6");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 2) {
                if(weath == "summer") {
                    fill("yellow");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "autumn") {
                    fill("browen");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "winter") {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "spring") {
                    fill("browen");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 3){
                if(weath == "summer") {
                    fill("red");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "autumn") {
                    fill("orange");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "winter") {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if (weath == "spring") {
                    fill("orange");
                    rect(x * side, y * side, side, side);
                }
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
    socket.emit("killGrassEater");
}

function killPredator(){
    socket.emit("killPredator");
}

function restart(){
    socket.emit("restart");
}

function createGrassEater(){
    socket.emit("createGrassEater");
}

function createPredator(){
    socket.emit("createPredator");
}

function createGrass(){
    socket.emit("createGrass");
}

function killAll(){
    socket.emit("killAll");
}