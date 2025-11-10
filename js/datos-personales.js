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

// console.log("JS cargado correctamente ✅");


document.addEventListener("DOMContentLoaded", function () {

    /* ===================== CAMPOS ========================== */

    // Form 1 (Email principal)
    const formCorreo = document.getElementById("form-correo");
    const emailPrincipal = document.getElementById("correo");
    const btnGuardarCorreo = formCorreo.querySelector("button");

    // Form 2 (Datos personales)
    const formDatos = document.getElementById("form-datos-personales");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const tipoDoc = document.getElementById("tipo-doc");
    const numeroDoc = document.getElementById("numero-doc");
    const fechaNac = document.getElementById("fecha-nac");
    const telefono = document.getElementById("telefono");
    const emailSecundario = document.getElementById("email-sec");
    const btnGuardarDatos = formDatos.querySelector("button");


    /* ===================== VALIDACIONES ===================== */

    // Nombre / Apellido → solo letras (incluye acentos), espacios, apóstrofe y guión
    const validarNombreApellido = (v) =>
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]+$/.test(v.trim());

    // Email válido y termina en .com, .org o .net
    const validarEmail = (v) =>
        /^[^\s@]+@[^\s@]+\.(com|org|net)$/i.test(v.trim());

    // Contraseña: 8-12, mayúscula, minúscula, número, especial (#?!%$)
    const validarPassword = (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/.test(v);

    // Documento: solo números
    const validarNumeroDoc = (v) =>
        /^\d+$/.test(v.trim());

    // Teléfono: números, guiones, +, paréntesis
    const validarTelefono = (v) =>
        /^[\d+\-\(\)\s]+$/.test(v.trim());

    // Fecha: al menos 16 años
    const validarFechaNac = (valor) => {
        if (!valor) return false;
        const fecha = new Date(valor);
        const hoy = new Date();
        const limite = new Date();
        limite.setFullYear(hoy.getFullYear() - 16);
        return fecha <= limite;
    };


    /* ===================== HABILITAR/DESHABILITAR BOTONES ===================== */

    // --- FORM 1 (solo email principal)
    function validarFormCorreo() {
        if (validarEmail(emailPrincipal.value)) {
            btnGuardarCorreo.disabled = false;
            btnGuardarCorreo.classList.remove("disabled-btn");
        } else {
            btnGuardarCorreo.disabled = true;
            btnGuardarCorreo.classList.add("disabled-btn");
        }
    }

    // --- FORM 2 (todos los datos personales)
    function validarFormDatos() {
        const nombreValido = validarNombreApellido(nombre.value);
        const apellidoValido = validarNombreApellido(apellido.value);
        const tipoValido = ["dni", "ci", "pasaporte"].includes(tipoDoc.value);
        const numeroValido = validarNumeroDoc(numeroDoc.value);
        const fechaValida = validarFechaNac(fechaNac.value);
        const telValido = validarTelefono(telefono.value);
        const emailValido = emailSecundario.value ? validarEmail(emailSecundario.value) : true;

        btnGuardarDatos.disabled = !(
            nombreValido &&
            apellidoValido &&
            tipoValido &&
            numeroValido &&
            fechaValida &&
            telValido &&
            emailValido
        );
    }


    /* ===================== EVENTOS ========================== */

    // Form Email principal
    emailPrincipal.addEventListener("input", validarFormCorreo);
    validarFormCorreo(); // arranca deshabilitado

    formCorreo.addEventListener("submit", function (e) {
        if (btnGuardarCorreo.disabled) {
            e.preventDefault();
            alert("Por favor, ingresa un email válido antes de guardar.");
        }
    });

    // Form Datos personales
    [nombre, apellido, tipoDoc, numeroDoc, fechaNac, telefono, emailSecundario]
        .forEach(campo => campo.addEventListener("input", validarFormDatos));

    validarFormDatos(); // arranca deshabilitado

    formDatos.addEventListener("submit", function (e) {
        if (btnGuardarDatos.disabled) {
            e.preventDefault();
            alert("Completa correctamente todos los campos obligatorios antes de guardar.");
        }
    });

    const password = document.getElementById("password");
    password.addEventListener("input", () => {
        if (!validarPassword(password.value)) {
            password.setCustomValidity("La contraseña debe tener entre 8 y 12 caracteres, incluir mayúscula, minúscula, número y un carácter especial (# ? ! % $).");
        } else {
            password.setCustomValidity("");
        }
    });
});