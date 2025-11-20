document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById("formulario-registro");
    const inputCorreo = document.getElementById("correo");
    const inputContrasenia = document.getElementById("contrasenia");
    const checkbox = document.getElementById("checkbox");

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            resetearEstilos();
            
            let esValido = true;
            
            // Validación Email
            if (!validarEmail(inputCorreo.value.trim())) {
                mostrarError(inputCorreo, inputCorreo.parentElement, 'El email debe tener formato válido y terminar en .com, .org o .net');
                esValido = false;
            }
            
            // Validación Contraseña (Estricta)
            if (!validarPassword(inputContrasenia.value)) {
                mostrarError(inputContrasenia, inputContrasenia.parentElement, 'La contraseña debe tener 8-12 caracteres, mayúscula, minúscula, número y uno de estos símbolos: # ? ! % $');
                esValido = false;
            }
            
            // Validación Checkbox
            if (!checkbox.checked) {
                mostrarError(checkbox, checkbox.parentElement, 'Debes aceptar los términos y condiciones');
                esValido = false;
            }
            
            if (esValido) {
                alert('Formulario válido. Registrando sesión...');
            }
        });
    }

    function resetearEstilos() {
        inputCorreo.style.borderColor = '';
        inputContrasenia.style.borderColor = '';
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    function validarEmail(email) {
        if (email === '') return false;
        const regexEmail = /^[^\s@]+@[^\s@]+\.(com|org|net)$/;
        return regexEmail.test(email);
    }
    
    function validarPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
        return passwordRegex.test(password);
    }

    function mostrarError(elemento, contenedor, mensaje) {
        if (elemento.tagName === 'INPUT' && elemento.type !== 'checkbox') {
             elemento.style.borderColor = 'red';
        }

        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = mensaje;
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginTop = '5px';
        errorMsg.style.display = 'block';
        
        if (contenedor) {
            contenedor.appendChild(errorMsg);
        }
    }
});