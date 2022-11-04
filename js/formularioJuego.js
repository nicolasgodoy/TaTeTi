




function ValidarForm() {



    MostrarMensaje = '';

    var nombre = document.getElementById('nombre');



    if (nombre.value.trim() != '') {
        document.getElementById('Juego').style.display = '';
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('boton').style.display = 'none';


    } else {
        MostrarMensaje = '<p>' + 'Ingresa Un Nombre Para Jugar' + '</p>';
    }




    MostrarMensajes(MostrarMensaje);



}



function MostrarMensajes(Contenido) {
    document.getElementById('Mensajes').innerHTML = Contenido;


}














