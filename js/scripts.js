
// BUSCADOR
const buscador = document.getElementById("busqueda");
const articulos = document.querySelectorAll(".articulo-categoria");



buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();

    articulos.forEach(articulo => {

        const nombre = articulo.querySelector(".item-valor-nombre").textContent.toLowerCase();

        if(texto.length < 3){
            articulo.style.display = "block";
        } else {
            articulo.style.display = nombre.includes(texto) ? "block" : "none";
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
// Espera a que todo el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los elementos de rating que ya existen en el HTML
    const ratingElements = document.querySelectorAll(".item-valor-rating");

    // Función para generar estrellas
    function generarEstrellas(valorRating) {
        const maxEstrellas = 5;
        let estrellas = '';
        for (let i = 0; i < maxEstrellas; i++) {
            estrellas += i < valorRating ? '★' : '☆';
        }
        return estrellas;
    }

    // Recorre los elementos y reemplaza el número por estrellas
    ratingElements.forEach(el => {
        const valor = parseInt(el.textContent); // obtén el número
        if (!isNaN(valor)) {
            el.textContent = generarEstrellas(valor); // reemplaza por estrellas
        }
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