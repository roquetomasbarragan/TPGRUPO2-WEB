//esto toma el contenido del localstorage y lo inserta como html automatico
//si el localstorage esta vacío o null muestra un texto indicando que no hay favoritos

document.addEventListener("DOMContentLoaded", () => {
    const seccionCategoria = document.getElementById("seccion-categoria");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

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
});