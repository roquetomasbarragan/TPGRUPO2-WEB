document.addEventListener("DOMContentLoaded", function () {
    // 1. Seleccionamos los elementos del HTML
    const inputCorreo = document.getElementById("correo");
    const inputContrasenia = document.getElementById("contrasenia");
    const btnRegistrarse = document.getElementById("input-boton");

    // 2. Definimos las Expresiones Regulares (Reglas)
    
    // Email: texto + @ + texto + . + (com, org o net)
    const regexEmail = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;

    // Password: 8-12 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 especial (#?!%$)
    const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;

    // 3. Función para validar todo
    function validarFormulario() {
        const emailValor = inputCorreo.value.trim();
        const passValor = inputContrasenia.value.trim();

        const emailValido = regexEmail.test(emailValor);
        const contraseniaValida = regexContrasenia.test(passValor);

        if (emailValido && contraseniaValida) {
            btnRegistrarse.disabled = false;
            btnRegistrarse.classList.remove("disabled-btn");
        } else {
            // Si alguno falla, deshabilitamos
            btnRegistrarse.disabled = true;
            btnRegistrarse.classList.add("disabled-btn");
        }
    }

    // 4. "Escuchamos" cuando el usuario escribe (evento 'input')
    inputCorreo.addEventListener("input", validarFormulario);
    inputContrasenia.addEventListener("input", validarFormulario);
});