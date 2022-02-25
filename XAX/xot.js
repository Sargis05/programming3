let LivingCreature = require('./LivingCreature');

module.exports = class Xot extends LivingCreature {
    constructor(x,y,multiply){
        super(x,y,multiply);
    }

    kill() {
        var emptyCells2 = super.chooseCell(2);
        var emptyCells1 = super.chooseCell(1);
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)];
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)];
        if (newCell1 && this.multiply >= 1) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = 0;
            grassEaterArr.splice(newCell1[0], 1);
            matrix[newCell1[0]][newCell1[1]] = 0;
            this.multiply = 0;
        }
        else if (newCell2 && this.multiply >= 1) {
            var newX = newCell2[0];
            var newY = newCell2[1];
            matrix[newY][newX] = 0;
            grassPredArr.splice(newCell2[0], 1);
            matrix[newCell2[0]][newCell2[1]] = 0;
            this.multiply = 0;
        }
        else{
            this.multiply++;
        }
    }
}