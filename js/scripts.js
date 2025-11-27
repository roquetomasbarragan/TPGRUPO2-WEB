
// BUSCADOR
const buscador = document.getElementById("busqueda");
const articulos = document.querySelectorAll(".articulo-categoria");



buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();

    articulos.forEach(articulo => {

        const nombre = articulo.querySelector(".item-valor-nombre").textContent.toLowerCase();
        const autor = articulo.querySelector(".item-valor-autor").textContent.toLowerCase();

        if (texto.length < 3) {
            articulo.style.display = "block";
        } else {
            articulo.style.display = nombre.includes(texto) ? "block" : "none";
            articulo.style.display = autor.includes(texto) ? "block" : "none";
        }

    })
}
)

// FIN BUSCADOR

// HOVER
articulos.forEach(art => {
    // efecto hover
    art.addEventListener("mouseover", () => {

        art.addEventListener("mouseover", () => {
            if (!art.classList.contains("activo")) {
                art.style.boxShadow = "0 0 20px #4E8AE9";
            }
        });

        art.addEventListener("mouseout", () => {
            if (!art.classList.contains("activo")) {
                art.style.boxShadow = "none";
            }
        });

        art.addEventListener("click", () => {
            // desactivar todas
            articulos.forEach(a => {
                a.classList.remove("activo");
                a.style.boxShadow = "none";
                a.style.border = "1px solid #4E8AE9";
            });

            // activar la clickeada
            art.classList.add("activo");
            art.style.border = "2px solid red";
            art.style.boxShadow = "0 0 30px 10px #e9584eff";
            art.style.transform = "scale(1.1)";
            art.style.transition = "all 0.4s ease";
        });

        // después de 5 segundos vuelve 
        setTimeout(() => {
            art.style.transform = "scale(1)";
            art.style.boxShadow = "none";
        }, 5000);
    });
});

// MENU NAVEGACION EVENTOS

const tabs = document.querySelectorAll('.tab-categoria');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Primero saco el efecto de los demás
        tabs.forEach(t => t.classList.remove('active-tab'));

        // Le agrego el efecto solo al clickeado
        tab.classList.add('active-tab');
    });
});
// FIN MENU NAVEGACION EVENTOS



// RATING
function convertirRatingsAEstrellas() {

    // Selecciona todos los elementos donde se muestra el rating
    document.querySelectorAll(".item-valor-rating").forEach(el => {

        // Obtiene el número que puso cargar-datos.js
        const valor = parseInt(el.innerText.trim());

        // Si es un número válido entre 1 y 5...
        if (!isNaN(valor) && valor >= 1 && valor <= 5) {

            // Reemplaza el número por estrellas: ★ llenas y ☆ vacías
            el.innerHTML = "★".repeat(valor) + "☆".repeat(5 - valor);
        }
    });
}

// Cuando la página termina de cargar, convierte los ratings iniciales
document.addEventListener("DOMContentLoaded", convertirRatingsAEstrellas);

// Cuando el usuario cambia de categoría...
document.querySelectorAll("a.tab-categoria").forEach(tab => {
    tab.addEventListener("click", () => {

        // Esperamos un instante a que cargar-datos.js coloque los números
        // y luego volvemos a convertirlos en estrellas
        setTimeout(convertirRatingsAEstrellas, 10);
    });

});

// CARROUSELL DE IMGS

const carousel = document.querySelector('.carousel-images');
const caption = document.querySelector('.carousel-caption');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

// Mostrar nombre inicial
caption.textContent = images[0].dataset.nombre;

function mostrarImagen() {
    carousel.style.transform = `translateX(${-index * 100}%)`;
    caption.textContent = images[index].dataset.nombre;
}

function siguiente() {
    index = (index + 1) % images.length;
    mostrarImagen();
}

function anterior() {
    index = (index - 1 + images.length) % images.length;
    mostrarImagen();
}

// Eventos de botones
nextBtn.addEventListener('click', siguiente);
prevBtn.addEventListener('click', anterior);

// Cambio automático cada 3s
setInterval(siguiente, 4000);


//fin carrousel//




//enviar a favoritos
//creación y ubicación del botón de favoritos

let ubicacionClassBotonFavoritos = document.querySelectorAll(".header-articulo");

ubicacionClassBotonFavoritos.forEach((ubicacion) => {
    let spanDelBotonFavoritos = document.createElement("span");
    let botonFavoritos = document.createElement("button");
    botonFavoritos.classList.add("btn-favorito");
    botonFavoritos.textContent = "❤️";
    botonFavoritos.style.fontSize = "125%";
    botonFavoritos.style.backgroundColor = "transparent";
    spanDelBotonFavoritos.appendChild(botonFavoritos);

    ubicacion.before(spanDelBotonFavoritos);

    //hacemos que el botón envíe el item al localStorage
    botonFavoritos.addEventListener("click", () => {
        let tarjeta = botonFavoritos.closest("article");
        let htmlTarjeta = tarjeta.outerHTML;

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // evitar duplicados
        if (favoritos.some(fav => fav === htmlTarjeta)) {
            alert("Esta tarjeta ya está en favoritos.");
            return;
        }

        favoritos.push(htmlTarjeta);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        alert("¡Tarjeta agregada a favoritos!");
    });
});


//Buscador footer
const btn_buscar = document.querySelector(".btn-footer");
const buscar_footer = document.querySelector(".buscador-footer");

function ejecutarBusqueda() {
    const textoABuscar = buscar_footer.value.toLowerCase().trim();

    articulos.forEach(articulo => {
        const nombre = articulo.querySelector(".item-valor-nombre").textContent.toLowerCase();
        articulo.style.display = nombre.includes(textoABuscar) ? "block" : "none";
    });
}

btn_buscar.addEventListener("click", ejecutarBusqueda);
buscar_footer.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        ejecutarBusqueda();
    }
});