import { initTema, imprimirDatosAlumno } from "./tema.js";

imprimirDatosAlumno();
initTema();

let listaProductos = document.getElementById("lista-productos");
let formModificar = document.getElementById("form-modificar-producto");
let url = "http://localhost:3000";
let updateFormContainer = document.getElementById("updateFormContainer");


formModificar.addEventListener("submit", async (event) => {

    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    // Tenemos que obtener los datos del formulario, por tanto, vamos a crear un objeto FormData a partir de los datos del formulario
    let formData = new FormData(event.target); //Creamos un nuevo objeto FormData a partir de los datos del formulario

    console.log(formData); // FormData { idProd → "2" }

    // Transformamos a objetos JS los valores de FormData
    let data = Object.fromEntries(formData.entries());
    console.log(data); // Object { idProd: '2' }

    let idProd = data.idProd; // Ahora ya tenemos guardado en una variable el valor del campo del formulario
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);

    // Enviamos en una peticion GET el id pegado a la url
    try{

        let response = await fetch(`${url}/api/products/${idProd}`);

        let datos = await response.json();
        console.log(datos);

        if(response.ok){
            // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
            let producto = datos.payload[0]; //accede al objeto del producto devuelto. Payload: los datos que realmente necesitamos
            console.log(producto);
            mostrarProducto(producto);

        
        } else {
            console.log(datos);
            console.log(datos.message);

            mostrarError(datos.message);

        }

    } catch(error){
    console.log(error);
}
});


async function crearFormulario(producto) {
        console.table(producto);

    let updateFormHTML = `
        <form id="updateProducts_form">
            <div class="input-datos">
                <input class="input-ingreso" type="hidden" name="id" id="idUpdate" value="${producto.id}">

                    <label for="tituloProd">Titulo</label>
                    <input class="input-ingreso" type="text" name="titulo" id="tituloProd" value="${producto.titulo}" required>

                    <label for="autorProd">Autor</label>
                    <input class="input-ingreso" type="text" name="autor" id="autorProd" value="${producto.autor}" required>
                        
                    <label for="imageProd">Imagen</label>
                    <input class="input-ingreso" type="text" name="ruta_img" id="imageProd" value="${producto.ruta_img}" required>
                        
                    <label for="precioProd">Precio</label>
                    <input class="input-ingreso" type="number" name="precio" id="precioProd" value="${producto.precio}" required>

                    <label for="categoriaProd">Categoría</label>
                    <select class="input-ingreso" name="categoria" id="categoriaProd">
                        <option value="usado">Usado</option>
                        <option value="nuevo">Nuevo</option>
                    </select>

                    <label for="sinopsisProd">Sinopsis</label>
                    <input class="input-ingreso" type="text" name="sinopsis" id="sinopsisProd" value="${producto.sinopsis}"required>

                    <label for="activeProd">Activo</label>
                    <select class="input-ingreso" name="activo" id="activeProd">
                        <option value=1>Activo</option>
                        <option value=0>Inactivo</option>
                </select>
            </div>

            <div class="input-enviar">
                <input class="input-submit" type="submit" value="Actualizar">
            </div>

        </form>
            `;

        updateFormContainer.innerHTML = updateFormHTML;
        let updateProducts_form = document.getElementById("updateProducts_form");
        
        updateProducts_form.addEventListener("submit", event => {
            actualizarProducto(event);
            });
        }


async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("Preparando datos del formulario para el PUT");

    let formData = new FormData(event.target); // Le pasamos el formulario dinamico de antes al objeto FormData para obtener los datos del nuevo formulario de actualizacion

    let data = Object.fromEntries(formData.entries());
    console.log(data); // Ya tenemos como objetos JS los datos de nuestro formulario anterior con las nuevas modificaciones

    try {
        let response = await fetch(`${url}/api/products/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

    let result = await response.json();
    console.log(result);

    if(response.ok) {
        console.log(result.message);
        alert(result.message);
    } else {
        // TO DO
        console.log(result.message);
        alert(result.message);
    }

    } catch (error) {
            console.log("Error: ", error);
    }
    
}

function mostrarProducto(producto) {
    const estadoTexto = producto.activo === 1 ? "Activo" : "Inactivo";
    const estadoClase = producto.activo === 1 ? "estado-activo" : "estado-inactivo";

            let htmlProducto = `
                <li class="li-producto">
                    <img class="producto-img" src="${producto.ruta_img}" alt="${producto.titulo}">
                    <p>
                        ID: ${producto.id} <br>
                        ${producto.titulo} - ${producto.autor} <br>
                        Precio $${producto.precio} <br>
                        Estado: <span class="${estadoClase}">${estadoTexto}</span><br>
                    </p>
                </li>
                <li class="li-botonera">
                    <input class="input-submit" type="button" id="updateProduct_button" value="Actualizar producto">
                </li>
    `;
            
            listaProductos.innerHTML = htmlProducto;
            
            let updateProduct_button = document.getElementById("updateProduct_button");

            updateProduct_button.addEventListener("click", event => {
                event.stopPropagation(); // Evitamos la propagacion de eventos
                crearFormulario(producto);
            })

}
function mostrarError(message) {
    listaProductos.innerHTML = `
        <li class="message-error">
            <p>
                <strong><spam>${message}</spam> </strong>
            </p>
        </li>`
        ;
}
