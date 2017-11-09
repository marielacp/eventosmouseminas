// realizando eventos
var container=document.querySelector('.tictac');
var startButtom = document.getElementById('startButtom');
var game;
startButtom.addEventListener('click', start);
container.addEventListener('click', cellclick);

function cellclick(event){
    var target = event.target;
    //console.log('target', target);
    var dataset = target.dataset;
    //console.log(dataset);
    //No queremos que otro elemento invada la secuencia entonces validamos
    if(dataset && dataset.row){
      //  console.log('pos', dataset.row, dataset.column);
    game.input(dataset.row, dataset.column);
    render(game.output());
    }
}
//como funciona nuestro juego
//array reorre valores de la matris y reemplace
function ticTactoe(){
    this.player="x";
    this.matrix=[
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}

//metodo 

ticTactoe.prototype.input = function (row,column) {
if(this.setValue(row, column)){
   if(this.checkGame(row, column)){
   }else{
       this.tagglePlayer();
   }
   }
};

ticTactoe.prototype.checkGame = function(row, column){
var matrix = this.matrix;
var symbol = this.player;
//console.log('checkRow', checkRow(matrix,row,symbol));
console.log('checkColumn', checkRow(matrix, column, symbol));

function checkRow(matrix, row, symbol){
    var row=matrix[row];
    var length=row.length;
    for(var i=0; i<length; i++){
        var cell = row[i];
        if(cell !== symbol){
            return false;
        }
    }
return true;
}

function checkColumn(matrix, column, symbol){
var length = matrix.length;
for( var i=0; i<length; i++){
    var cell = matrix[i][column];
    if (cell !== symbol){
        return false;
    }
}
return false;
}

function checkDiagonal (matrix, symbol){

}
function checkAntiDiagonal(matrix, symbol) {

};
////////////////

ticTactoe.prototype.setValue = function (row, column) {
var matrix = this.matrix;
if(matrix[row][column]===null){
    matrix[row][column] = this.player;
    return true;
}
return false;
};

ticTactoe.prototype.tagglePlayer = function () {
this.player = this.player ==='x' ? '0' : 'x';
};

//metodo que nos regrese la matrix
ticTactoe.prototype.output = function () {
    return this.matrix;
};

//funcion del bottom
function start(){
//console.log('start');
game= new ticTactoe();
render(game.output());
}

//recorriendo la matrix,nos interesa los valores de la celdas
//metodo reduce..transformacmos el arreglo
//array valor inicial, 2do el q esta iterando, 3ero indice
function render(matrix){
   var values= matrix.reduce(function(array, row,rowIndex){
       return array.concat(row.map(function(cell, cellIndex){
            return{
                value:cell,
                id:'cell-'+rowIndex +'-'+cellIndex
            };
         }));
    },[]);
   // console.log(values);
    values.forEach(function(cell){
        var cellElement = document.getElementById(cell.id);
        cellElement.innerHTML = cell.value !==null ? cell.value :'';
    });
}

start();