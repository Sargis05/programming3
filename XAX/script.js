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

let side = 20;
let matrix = generator(15, 30, 13,5);
let grassArr = [];
let grassEaterArr = [];
let grassPredArr = [];
let grassXotArr = [];
matrix[matrix.length - 1][matrix[0].length - 1] = 4;
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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
}

function draw() {
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
}