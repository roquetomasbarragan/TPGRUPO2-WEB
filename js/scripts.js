
// BUSCADOR

const buscador = document.getElementById("busqueda");
const articulos = document.querySelectorAll(".articulo-categoria");

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();

    articulos.forEach(articulo => {
        const nombre = articulo.querySelector(".item-valor-nombre").textContent.toLowerCase();

        // si tiene menos de 3 letras muestra todos normal
        if (texto.length < 3) {
            articulo.style.display = "block";
        } else {
            //  si el nombre contiene el texto ,mostrarlo, si no ocultarrlo
            articulo.style.display = nombre.includes(texto) ? "block" : "none";
        }
    });
});

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

