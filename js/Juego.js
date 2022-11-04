var turno = 0;
let tablero = [];
var ContadorWinner = 0;
var ContadorWinnerX = 0;
var ContadorWinnerO = 0;
let ContenidoContador_1;
let ContenidoContador_2;



function btnPulsado(e, pos) {




    var btn = e.target;
    if (btn.innerHTML === "X" || btn.innerHTML === "O") {
        return;
    }
    turno++;
    var Fichas = turno % 2 ? "X" : "O";
    var Mensaje = turno % 2 ? '1' : '2';

    btn.innerHTML = Fichas;




    tablero[pos] = Fichas;



    if (Ganaste()) {



        Swal.fire({
            icon: 'success',
            text: 'Felicitaciones !! Gano el Jugador:' + ' ' + Mensaje,
            confirmButtonColor: '#3085d6',

        })



        if (Fichas === "X") {
            ContenidoContador_1 = ContadorWinnerX = ContadorWinnerX + 1
            MostrarContadorX = '<p>' + ContenidoContador_1 + '<p>';
            Contador_WinnerX(MostrarContadorX);

        } else if (Fichas === "O") {
            ContenidoContador_2 = ContadorWinnerO = ContadorWinnerO + 1
            MostrarContadorO = '<p>' + ContenidoContador_2 + '<p>';
            Contador_WinnerO(MostrarContadorO);
        }




    }



}



function ReiniciarTablero() {

    document.getElementById('Caja1').innerHTML = null;
    document.getElementById('Caja2').innerHTML = null;
    document.getElementById('Caja3').innerHTML = null;
    document.getElementById('Caja4').innerHTML = null;
    document.getElementById('Caja5').innerHTML = null;
    document.getElementById('Caja6').innerHTML = null;
    document.getElementById('Caja7').innerHTML = null;
    document.getElementById('Caja8').innerHTML = null;
    document.getElementById('Caja9').innerHTML = null;

    
    tablero[0] = '';
    tablero[1] = '';
    tablero[2] = '';
    tablero[3] = '';
    tablero[4] = '';
    tablero[5] = '';
    tablero[6] = '';
    tablero[7] = '';
    tablero[8] = '';
    
}




function Contador_WinnerX(e) {
    document.getElementById('ContadorWinnerX').innerHTML = e;


}

function Contador_WinnerO(e) {
    document.getElementById('ContadorWinnerO').innerHTML = e;


}




function Ganaste() {

    if (tablero[0] == tablero[1] && tablero[0] == tablero[2] && tablero[0]) {
        return true;

    } else if (tablero[3] == tablero[4] && tablero[3] == tablero[5] && tablero[3]) {
        return true;
    } else if (tablero[6] == tablero[7] && tablero[6] == tablero[8] && tablero[6]) {
        return true;
    } else if (tablero[0] == tablero[3] && tablero[0] == tablero[6] && tablero[0]) {
        return true;
    } else if (tablero[1] == tablero[4] && tablero[1] == tablero[7] && tablero[1]) {
        return true;
    } else if (tablero[2] == tablero[5] && tablero[5] == tablero[8] && tablero[2]) {
        return true;
    } else if (tablero[0] == tablero[4] && tablero[0] == tablero[8] && tablero[0]) {
        return true;
    } else if (tablero[2] == tablero[4] && tablero[2] == tablero[6] && tablero[2]) {
        return true;
    }


    return false;
}




function bloques() {   // considere usar un foreach pero como no lo usamos no lo use

    var caja1 = document.getElementById('Caja1');
    caja1.addEventListener('click', function (e) { btnPulsado(e, 0) })

    var caja2 = document.getElementById('Caja2');
    caja2.addEventListener('click', function (e) { btnPulsado(e, 1) })

    var caja3 = document.getElementById('Caja3');
    caja3.addEventListener('click', function (e) { btnPulsado(e, 2) })

    var caja4 = document.getElementById('Caja4');
    caja4.addEventListener('click', function (e) { btnPulsado(e, 3) })

    var caja5 = document.getElementById('Caja5');
    caja5.addEventListener('click', function (e) { btnPulsado(e, 4) })

    var caja6 = document.getElementById('Caja6');
    caja6.addEventListener('click', function (e) { btnPulsado(e, 5) })

    var caja7 = document.getElementById('Caja7');
    caja7.addEventListener('click', function (e) { btnPulsado(e, 6) })

    var caja8 = document.getElementById('Caja8');
    caja8.addEventListener('click', function (e) { btnPulsado(e, 7) })

    var caja8 = document.getElementById('Caja9');
    caja8.addEventListener('click', function (e) { btnPulsado(e, 8) })


}

bloques()
