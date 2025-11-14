/*el campo de email debe validarse para que NO este vacío (carga OBLIGATORIA)*/
/*el botón GUARDAR CAMBIOS debe encontrarse DESHABILITADO mientras el mail no
se haya completado si el mail es borrado, el botón debe deshabilitarse nuevamente*/
/*VALIDAR:
email y email secundario (un @ en el medio) y que termine
con .com, .org o .net
contraseña longitud 8~12, 1M, 1m, 1, 1#?!%$
nombre y apellido solo alfabéticos (acentuados y no), espacios,
apóstrofo y guión. Cualquier otro caracter es inválido.
tipo seleccionar entre DNI | CI | PASAPORTE
número de documento solo números.
fehca de nacimiento fechas de 16 años para atrás. Cualquier fecha posterior es inválida.
teléfono 0~9 - + (). Cualquier otro carácter es inválido*/

//inicializacion de const
const inputCorreo = document.querySelector(".correo");
const btnGuardar = document.querySelector(".btn-guardar");
const inputPassword = document.getElementById("password");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const tipoDoc = document.getElementById("tipo-doc");
const inputNumeroDoc = document.getElementById("numero-doc");
const inputFechaNac = document.getElementById("fecha-nac");
const inputTelefono = document.getElementById("telefono");

//inicializacion de let
btnGuardar.classList.add("disabled-btn");
let esValido = true;

function inicializar() {
    const usuarioGuardadoJson = localStorage.getItem('usuario');

    if (usuarioGuardadoJson) {
        const usuario = JSON.parse(usuarioGuardadoJson);
    }
}

function limpiarError(elemento) {
    elemento.style.borderColor = '';
    const msg = elemento.parentElement.querySelector(".error-message");
    if (msg) msg.remove();
}

function mostrarError(elemento, mensaje) {
        elemento.style.borderColor = 'red';

        let errorMsg = elemento.parentElement.querySelector('.error-message');
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

function validarCorreo() {

    //valida email
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.(com|org|net)$/;

    if ((inputCorreo.value.trim() === "") || (!expresionRegularCorreo.test(inputCorreo.value))) {
        mostrarError(inputCorreo, 'Correo no válido. Debe tener un @ y terminar en .com, .org o .net');
        btnGuardar.classList.add("disabled-btn");
        esValido = false;
    } else {
        btnGuardar.classList.remove("disabled-btn");
        limpiarError(inputCorreo);
    }
}

function validarPassword() {

    //valida contraseña
    const expresionRegularPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;

    if ((inputPassword.value.trim() === "") || (!expresionRegularPassword.test(inputPassword.value))) {
        mostrarError(inputPassword, 'La contraseña debe tener entre 8 y 12 caracteres, incluir mayuscula, minuscula, numero y al menos uno de estos caracteres especiales: # ? ! % $');
        esValido = false;
    } else {
        limpiarError(inputPassword);
    }
}

function validarNombreApellido() {

    //valida nombre y apellido
    const expresionRegularNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/;

    if ((inputNombre.value.trim() === "") || (!expresionRegularNombreApellido.test(inputNombre.value))) {
        mostrarError(inputNombre, 'El nombre no es válido');
        esValido = false;
    } else limpiarError(inputNombre);

    if ((inputApellido.value.trim() === "") || (!expresionRegularNombreApellido.test(inputApellido.value))) {
        mostrarError(inputApellido, 'El apellido no es válido');
        esValido = false;
    } else limpiarError(inputApellido);
}

function validarTipoDocumento() {
    const valor = tipoDoc.value;

    if (valor === "" || !["DNI", "CI", "PASAPORTE"].includes(valor)) {
        mostrarError(tipoDoc, "Selecciona un tipo de documento válido");
        esValido = false;
    } else {
        limpiarError(tipoDoc);
    }
}

function validarNumeroDocumento() {
    const exp = /^[0-9]+$/;

    if (!exp.test(inputNumeroDoc.value.trim())) {
        mostrarError(inputNumeroDoc, "El número de documento solo puede contener números");
        esValido = false;
    } else {
        limpiarError(inputNumeroDoc);
    }
}

function validarFechaNacimiento() {
    const fechaIngresada = new Date(inputFechaNac.value);
    const hoy = new Date();

    // fecha mínima: hace 16 años EXACTOS
    const fechaMinima = new Date(
        hoy.getFullYear() - 16, 
        hoy.getMonth(), 
        hoy.getDate()
    );

    if (!inputFechaNac.value || fechaIngresada > fechaMinima) {
        mostrarError(inputFechaNac, "Debes tener al menos 16 años");
        esValido = false;
    } else {
        limpiarError(inputFechaNac);
    }
}

function validarTelefono() {

    //valida contraseña
    const expresionRegularTelefono = /^[0-9+\-()]+$/;

    if ((inputTelefono.value.trim() === "") || (!expresionRegularTelefono.test(inputTelefono.value))) {
        mostrarError(inputTelefono, 'El número de teléfono es incorrecto');
        esValido = false;
    } else {
        limpiarError(inputTelefono);
    }
}

function guardar(evento) {
    evento.preventDefault();
    
    // Reiniciar validación
    esValido = true;

    validarCorreo();
    validarPassword();
    validarNombreApellido();
    validarTelefono();
    validarTipoDocumento();
    validarNumeroDocumento();
    validarFechaNacimiento();

    if (esValido) {

        //guardar en el localstorage
        const usuario = {
            nombre: inputNombre.value.trim(),
            email: inputCorreo.value.trim()
        };

        const usuarioJson = JSON.stringify(usuario);

        localStorage.setItem('usuario', usuarioJson);

        alert("Registrado. Datos guardados");
        console.log("Validado. Datos guardados: ", usuario);
    } else {
        console.log("La validación fallida. Formulario no enviado");
    }
}

inputCorreo.addEventListener("input", guardar);
inputPassword.addEventListener("input", guardar);
inputNombre.addEventListener("input", guardar);
inputApellido.addEventListener("input", guardar);
tipoDoc.addEventListener("change", guardar);
inputNumeroDoc.addEventListener("input", guardar);
inputFechaNac.addEventListener("input", guardar);
inputTelefono.addEventListener("input", guardar);

btnGuardar.addEventListener("click", guardar);
inicializar();