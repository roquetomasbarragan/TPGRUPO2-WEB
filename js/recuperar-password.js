const inputEmail = document.getElementById('correo');
const botonContinuar = document.querySelector('input[type="submit"]');
const form = document.getElementById('formulario-recuperar');

botonContinuar.disabled = true;

function crearMensajeError(inputElement, mensaje) {
    const contenedor = inputElement.parentElement;
    let mensajeExistente = contenedor.querySelector('.error-texto');
    
    if (!mensajeExistente) {
        mensajeExistente = document.createElement('p');
        mensajeExistente.className = 'error-texto';
        mensajeExistente.style.color = 'red';
        mensajeExistente.style.fontSize = '0.85em';
        contenedor.appendChild(mensajeExistente);
    }
    
    mensajeExistente.textContent = mensaje;
    inputElement.classList.add('error-borde');
}

function eliminarMensajeError(inputElement) {
    const contenedor = inputElement.parentElement;
    const mensajeExistente = contenedor.querySelector('.error-texto');
    
    if (mensajeExistente) {
        contenedor.removeChild(mensajeExistente);
    }
    inputElement.classList.remove('error-borde');
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
    return regexEmail.test(email);
}

function checkFormCompleto() {
    const emailCompleto = inputEmail.value.trim() !== '';

    if (emailCompleto) {
        botonContinuar.disabled = false;
    } else {
        botonContinuar.disabled = true;
    }
}

inputEmail.addEventListener('input', checkFormCompleto);

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    eliminarMensajeError(inputEmail);

    const email = inputEmail.value.trim();

    if (email === '') {
        crearMensajeError(inputEmail, 'Solución: Este campo es de carga obligatoria.');
    } else if (!validarEmail(email)) {
        crearMensajeError(inputEmail, 'Solución: El formato es inválido. Debe ser usuario@dominio.(com/org/net).');
    } else {
        alert('Formato de Email válido. Continuando...');
    }
});