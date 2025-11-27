//esto toma el contenido del localstorage y lo inserta como html automatico
//si el localstorage esta vacío o null muestra un texto indicando que no hay favoritos
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const seccionCategoria = document.getElementById("seccion-categoria");
    const inputBuscador = document.getElementById("busqueda");

    if (favoritos.length === 0) {
        seccionCategoria.innerHTML = "<p>No hay favoritos agregados.</p>";
        seccionCategoria.style.color = "#4E8AE9";
        return;
    }

    function renderFavoritos() {
        seccionCategoria.innerHTML = "";

        favoritos.forEach((tarjetaHtml, index) => {
            const tarjetaUbicacion = document.createElement("div");

            // insertar la tarjeta
            tarjetaUbicacion.innerHTML = tarjetaHtml;

            // botón eliminar, estoy reutilizando el mismo botón que cree en el js que envía los datos al localstorage
            const btnEliminar = tarjetaUbicacion.querySelector(".btn-favorito");
            btnEliminar.textContent = "❌";

            btnEliminar.addEventListener("click", () => {
                favoritos.splice(index, 1);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                renderFavoritos();
            });

            seccionCategoria.appendChild(tarjetaUbicacion);
        });
    }

    renderFavoritos();

    if (inputBuscador) {
        inputBuscador.addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase().trim();

        const tarjetasRenderizadas = Array.from(seccionCategoria.children);

        tarjetasRenderizadas.forEach(tarjeta => {
            // Validación de seguridad por si el mensaje de "No hay favoritos" es un <p>
            if (tarjeta.tagName !== "DIV") return; 

            const nombreEl = tarjeta.querySelector(".item-valor-nombre");
            const autorEl = tarjeta.querySelector(".item-valor-autor");

            // Verificamos que existan los elementos antes de pedir .textContent
            if (nombreEl && autorEl) {
                const nombre = nombreEl.textContent.toLowerCase();
                    const autor = autorEl.textContent.toLowerCase();

                    const coincide = nombre.includes(texto) || autor.includes(texto);

                    if (texto.length < 3) {
                        tarjeta.style.display = "block";
                    } else {
                        tarjeta.style.display = coincide ? "block" : "none";
                    }
                }
            });
        });
    }
});



