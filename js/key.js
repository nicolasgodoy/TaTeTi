const nombre = document.getElementById('nombre');

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        document.getElementById('Juego').style.display = '';
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('boton').style.display = 'none';

    } else {
        MostrarMensaje = '<p>' + 'Ingresa Un Nombre Para Jugar' + '</p>';
    }
});
