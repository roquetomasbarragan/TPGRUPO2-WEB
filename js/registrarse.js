document.addEventListener("DOMContentLoaded", function () {
    
    const inputCorreo = document.getElementById("correo");
    const inputContrasenia = document.getElementById("contrasenia");
    const checkbox = document.getElementById("checkbox");
    const btnRegistrarse = document.getElementById("input-boton");

   
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resetearEstilos();
        
        let esValido = true;
        
        if (!validarEmail(inputCorreo.value.trim())) {
            mostrarError(emailInput, 'El email debe tener formato valido y terminar en .com, .org o .net');
            esValido = false;
        }
        
        if (!validarPassword(inputContrasenia.value)) {
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

        const regexEmail = /^[^\s@]+@[^\s@]+\.(com|org|net)$/;
        if (!regexEmail.test(email)) {
            return false;
        }

        return true;
    }
    
    function validarPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
        
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
});