var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function generator(matLen, gr, grEat,grpred) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for(let i = 0;i < grpred;i++){
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    return matrix;
}

matrix = generator(15, 30, 13,5);
matrixrestart = generator(15, 30, 13,5)
matrix[matrix.length - 1][matrix[0].length - 1] = 4;

 grassArr = [];
 grassEaterArr = [];
 grassPredArr = [];
 grassXotArr = [];

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Predator = require ("./Predator");
Xot = require("./Xot")


function createObject(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            } 
            else if(matrix[y][x] == 3) {
                let gr = new Predator(x,y);
                grassPredArr.push(gr);
            }
            else if(matrix[y][x] == 4) {
                let gr = new Xot(x,y);
                grassXotArr.push(gr);
            }

        }
    }

    io.sockets.emit('send matrix', matrix)
    

}

function game(){
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul();
        grassEaterArr[j].eat();
    }
    for (let j in grassPredArr) {
        grassPredArr[j].mul();
        grassPredArr[j].eat();
    }
    for(let k in grassXotArr){
        grassXotArr[k].kill();
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 400)

function killGrassEater(){
    grassEaterArr = [];
    for(let i = 0;i < matrix.length;i++){
        for(let j = 0;j < matrix[i].length;j++){
            if(matrix[i][j] == 2){
                matrix[i][j] = 0;
            }
        }
    }
}

function killPredator(){
    grassPredArr = [];
    for(let i = 0;i < matrix.length;i++){
        for(let j = 0;j < matrix[i].length;j++){
            if(matrix[i][j] == 3){
                matrix[i][j] = 0;
            }
        }
    }
}

function restart(){
    matrix = matrixrestart;
}

io.on('connection', function(socket) {
    createObject();
    socket.on("killGrassEater", killGrassEater);
    socket.on("killPredator",killPredator);
    socket.on("restart",restart);
})