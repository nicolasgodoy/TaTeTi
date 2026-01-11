function ValidarForm() {
    const nombreInput = document.getElementById('nombre');
    const mensajeDiv = document.getElementById('Mensajes');
    const nombre = nombreInput.value.trim();

    if (nombre !== '') {
        const introContainer = document.getElementById('formulario-container');
        const juegoContainer = document.getElementById('Juego');

        // Simple fade out/in effect
        introContainer.style.transition = 'all 0.5s ease';
        introContainer.style.opacity = '0';
        introContainer.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            introContainer.style.display = 'none';
            juegoContainer.style.display = 'flex';
            juegoContainer.style.opacity = '0';

            requestAnimationFrame(() => {
                juegoContainer.style.transition = 'all 0.5s ease';
                juegoContainer.style.opacity = '1';
                juegoContainer.style.transform = 'translateY(0)';
            });
        }, 500);

    } else {
        mensajeDiv.innerHTML = '<p style="color: #ef4444; margin-bottom: 1rem; font-size: 0.9rem;">Por favor, ingresa un nombre para comenzar</p>';
        nombreInput.style.borderColor = '#ef4444';

        // Shake animation
        nombreInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => nombreInput.style.animation = '', 500);
    }
}

// Add shake keyframes to CSS via JS if not already there
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);














