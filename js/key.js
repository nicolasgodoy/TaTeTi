document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const nombreInput = document.getElementById('nombre');
        if (document.activeElement === nombreInput || document.getElementById('formulario-container').style.display !== 'none') {
            ValidarForm();
        }
    }
});
