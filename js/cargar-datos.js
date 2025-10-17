import items from "../data/items.json" with { type: 'json' };
import configuracion from "../config/configuracion.json" with { type: 'json' };

const tabCategoria1 = document.getElementById("tab-categoria-1");

let linksCategorias = document.querySelectorAll("a.tab-categoria");

linksCategorias.forEach((linkCategoria) => {
   linkCategoria.addEventListener("click", () => {
      items.forEach((item) => {
         const { Categoria, Id, Nombre, Autor, Portada, Descripcion, Rating } = item;

         if (linkCategoria.innerText != Categoria) return;
         const articuloContenedor = document.querySelector("article." + Id.split("-")[1])

         articuloContenedor.getElementsByClassName("item-valor-nombre")[0].innerText = Nombre;
         articuloContenedor.getElementsByClassName("item-valor-autor")[0].innerText = Autor;
         articuloContenedor.getElementsByClassName("item-valor-portada")[0].src = Portada;
         articuloContenedor.getElementsByClassName("item-valor-portada")[0].alt = Nombre;
         articuloContenedor.getElementsByClassName("item-valor-descripcion")[0].innerText = Descripcion;
         articuloContenedor.getElementsByClassName("item-valor-rating")[0].innerText = Rating;

         const personalizados = Object.keys(item).filter(key => key.startsWith("personalizado_"));
         
         personalizados.forEach((personalizado, index) => {
            articuloContenedor.getElementsByClassName(`item-campo-personalizado_${index + 1}`)[0].innerText = personalizado.split(".")[1];
            articuloContenedor.getElementsByClassName(`item-valor-personalizado_${index + 1}`)[0].innerText = item[personalizado];
         });

         articuloContenedor.id = Id;
      });
   });
});

if (configuracion["modo-test-prod"] === "prod") {
   tabCategoria1.click();
};