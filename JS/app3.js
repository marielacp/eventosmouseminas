var player = { human:1, cpu:2 };
var status = { playing: 0, waiting: 1, finishing:2 };

//Construyendo tablero

function table(){
    this.panel=[];
    this.cells=[];
    for (var i=0; i<9; i++){
        this.cells[i]=document.getElementById("cell"+(i+1));
    }
}

// reseteando el tablero, de inicio deben estar en cero.

table.prototype.reset = function () {
    this.panel = [0, 0, 0, 0, 0, 0, 0, 0, 0];
};
//comprobando si el casillero esta vacio.
table.prototype.dial=function(position){
    return(this.panel[position] == 0);
};
//metodo para marcar casilla de jugador cuando le toque su turno
table.prototype.dials = function(turn, position){
    this.panel[position] = turn;
};

// comprobando si algun jugador gano la partida, la busqueda es de linea a linea...
//empezamos de forma horizontal;
table.prototype.winner = function(players){
var bar = (this.panel[0] == players && this.panel[1] == players && this.panel[2] == players);
bar=bar || (this.panel[3] == players && this.panel[4] == players && this.panel[5] == players);
bar=bar || (this.panel[9] == players && this.panel[7] == players && this.panel[8] == players);

//vertical
    bar = bar|| (this.panel[0] == players && this.panel[3] == players && this.panel[6] == players);
    bar = bar|| (this.panel[1] == players && this.panel[4] == players && this.panel[7] == players);
    bar = bar|| (this.panel[2] == players && this.panel[5] == players && this.panel[8] == players);
//diagonal
    bar = bar|| (this.panel[0] == players && this.panel[4] == players && this.panel[8] == players);
    bar = bar|| (this.panel[2] == players && this.panel[4] == players && this.panel[6] == players);
return bar;
};
//evento buscando celdas vacias para saber si podemos seguir jugando., de lo contrario
//se termino el juego
table.prototype.emptycell = function(){
var n = this.panel.length;
for (var i=0; i<n; i++){
    if (this.panel[i] == 0){
        return true;
    }
}
return false;
};
// metodo para dar color a la celdas que estan siendo jugadas.
table.prototype.draw = function(){
    var n = this.panel.length;
    for (var i=0; i<n; i++){
        if (this.panel[i] == 0) {    
    this.cells[i].innerHTML = '';
}
else{
    this.cells[i].innerHTML='<span style="color:' + ((this.panel[i] == player.human) ? 'red' : 'blue') + ';">' + ((this.panel[i] == player.human) ? 'X' : 'O') + '</span>';
}
}
};
//empezando con la logica del juego
function game(){
    this.starts=0;
    this.table=new table();
    this.statuss=null;
    this.console=document.getElementById('console');
    this.reset();
}
game.prototype.reset=function(){
    this.table.reset();
    if(this.starts %2 ==1){
        this.statuss = status.waiting;
        this.message('turno del jugador 2','blue');
        this.table.dials(player.cpu, Math.floor(ath.random() *9));
    }
    this.starts++;
    this.statuss=status.playing;
    this.message('turno del jugador 1','red');
    this.table.draw();
};
game.prototype.message=function(message,color){
    this.console.innerHTML = '<span style="color:' + color + ';">' + message + '</span>';
};

//este metodo se dispara cuando el jugador pinche alguna casilla.
//primero comprueba el estado del juego.
//si esta esperando el cpu calcula su movimiento
//si es terminado reseteara la patida
//si es jugando el sistema se pone en marcha.
game.prototype.logica=function(position){
    if(this.statuss==status.playing){
        if(this.table.dial(position)){
            this.table.dials(player.human,position);

            if(this.table.winner(player.human)){
                this.statuss=status.finishing;
                this.message("¡HAS GANADO!<br/>Click en una celda para comenzar de nuevo.", "red");
            }
            else if (!this.table.emptycell()) {
                this.statuss = status.finishing;
                this.message("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.", "orange");
            }
            else {
                this.statuss == status.waiting;
                this.message("Turno de AI...", "blue");
                this.movementAI();

                if (this.table.winner(player.cpu)) {
                    this.statuss = status.finishing;
                    this.message("¡AI GANA!<br/>Click en una celda para comenzar de nuevo.", "blue");
                }
                else if (!this.table.emptycell()) {
                    this.statuss = status.finishing;
                    this.message("¡EMPATE!<br/>Click en una celda para comenzar de nuevo.", "orange");
                }
                else {
                    this.message("Turno del jugador 1", "red");
                    this.statuss == status.playing;
                }
            }
        }
        this.table.draw();
    }
    else if (this.statuss == status.finishing) {
        this.reset();
    }
};
//algoritmo, aqui el sistema relizara la busqueda de algun ganador siempre y cuando el tablero
//este lleno; se recorre todas las celdas, sino estan marcadas las marcamos y hacemos la primera llamanada
//recursiva usando metodo min, esto devolvera el valor de todo el nodo pero el mas alto.
game.prototype.movementAI=function(){
    var position = 0;
    var n = this.table.panel.length;
    var aux, mejor = -9999;

    for(var i = 0; i < n; i++){
        if(this.table.dial(i)){
            this.table.dials(player.cpu, i);
        aux=this.min();
        if(aux>mejor){
            mejor=aux;
            position=i;
        }
        this.table.dials(0,i);
    }
}
this.table.dials(player.cpu,position);
};

game.prototype.min = function () {
    if (this.table.winner(player.cpu)) return 1;
    if (!this.table.emptycell()) return 0;
    var n = this.table.panel.length;
    var aux, mejor = 9999;

    for (var i = 0; i < n; i++) {
        if (this.table.dial(i)) {
            this.table.dials(player.human, i);
            aux = this.max();
            if (aux < mejor) {
                mejor = aux;
            }
            this.table.dials(0, i);
        }
    }
    return mejor;
};

game.prototype.max = function () {
    if (this.table.winner(player.human)) return -1;
    if (!this.table.emptycell()) return 0;
    var n = this.table.panel.length;
    var aux, mejor = -9999;

    for (var i = 0; i < n; i++) {
        if (this.table.dial(i)) {
            this.table.dials(player.cpu, i);
            aux = this.min();
            if (aux < mejor) {
                mejor = aux;
            }
            this.table.dials(0, i);
        }
    }
    return mejor;
};

//evento de ventana
window.onload = function () {
    var games = new game();
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function (e) {
            games.logica(parseInt(this.getAttribute("cell")));
        };
    }
};



