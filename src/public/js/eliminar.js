import { initTema, imprimirDatosAlumno } from "./tema.js";
initTema();
imprimirDatosAlumno();
let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";


        getProductForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            let formData = new FormData(event.target);
            let data = Object.fromEntries(formData.entries());
            let idProd = data.idProd;

            let respuesta = await fetch(`${url}/api/products/${idProd}`);
            let datos = await respuesta.json();

            
            if(!respuesta.ok){
                console.log(datos);
                console.log(datos.message);
                mostrarError(datos.message);
                return; 
            }   
            let producto = datos.payload[0]; // Accedo al objeto que se encuentra en la posicion 0 de payload


            let htmlProducto = `
                <li class="li-producto">
                    <img src="${producto.ruta_img}">
                    <p>ID: ${producto.id} <br> ${producto.titulo} - ${producto.autor} <br> Precio $${producto.precio}</p>
                </li>
                <li class="li-botonera">
                    <input class="input-submit" type="button" id="deleteProduct_button" value="Eliminar producto">
                </li>
            `;

            listaProductos.innerHTML = htmlProducto;

            let deleteProduct_button = document.getElementById("deleteProduct_button");
            deleteProduct_button.addEventListener("click", () => {
                eliminarProducto(producto.id);
            });
        });

        async function eliminarProducto(idProd) {
            try {
                let respuesta = await fetch(`${url}/api/products/${idProd}`, {
                    method: "DELETE"
                });

                if (!respuesta.ok) {
                    alert("No se pudo dar de baja el producto.");
                    return;
                }

                let data = await respuesta.json();
                console.log("Respuesta DELETE:", data);

                alert("Producto eliminado correctamente.");
                listaProductos.innerHTML = "";

            } catch (error) {
                console.error("Error al hacer DELETE:", error);
                alert("Ocurrió un error al intentar eliminar el producto.");
            }
        }

        function mostrarError(message) {
            listaProductos.innerHTML = `
                <li class="message-error">
                    <p>
                        <strong>${message}</strong>
                    </p>
                </li>`
                ;
        }