document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const checkbox = document.querySelector('#checkbox');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resetearEstilos();
        
        let esValido = true;
        
        if (!validarEmail(emailInput.value.trim())) {
            mostrarError(emailInput, 'El email debe tener formato valido y terminar en .com, .org o .net');
            esValido = false;
        }
        
        if (!validarPassword(passwordInput.value)) {
            mostrarError(passwordInput, 'La contraseña debe tener entre 8 y 12 caracteres, incluir mayuscula, minuscula, numero y al menos uno de estos caracteres especiales: # ? ! % $');
            esValido = false;
        }
        
        if (!checkbox.checked) {
            mostrarError(checkbox, 'Debes aceptar los terminos de condicion');
            esValido = false;
        }
        
        if (esValido) {
            alert('Formulario válido. Iniciando sesión...');
        }
    });
    
    function validarEmail(email) {
        if (email === '') {
            return false;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email) || !(email.endsWith('.com') || email.endsWith('.org') || email.endsWith('.net'))) {
            return false;
        }

        return true;
    }
    
    function validarPassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!%$]).{8,12}$/;
        
        return passwordRegex.test(password);
    }

    function mostrarError(elemento, mensaje) {
        elemento.style.borderColor = 'red';
        
        let errorMsg = elemento.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.color = 'red';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.backgroundColor = '#222222';
            
            elemento.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = mensaje;
    }
    
    function resetearEstilos() {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
        
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
});