import { initTema, imprimirDatosAlumno } from "./tema.js";
imprimirDatosAlumno();
initTema();

let url = "http://localhost:3000";
let contenedorProductos = document.getElementById("contenedor-productos");

async function obtenerProductos() {
    try {
        let response = await fetch(`${url}/api/products`);
                    
        console.log(`Solicitud fetch GET a ${url}/api/products`);

        let data = await response.json();

        console.log(data);
        let productos = data.payload;
        console.log(productos);

        mostrarProductos(productos);

    } catch (error) {
        console.error("Error obteniendo productos: ", error);
    }
}


function mostrarProductos(array) {
    let htmlProductos = "";
                
    array.forEach(prod => {

        const estadoTexto = prod.activo === 1 ? "Activo" : "Inactivo";
        const estadoClase = prod.activo === 1 ? "estado-activo" : "estado-inactivo";
        
        let botonReactivar = "";
        if (!prod.activo){
            botonReactivar = `
            <button onclick="reactivarProducto(${prod.id})" class="input-submit">Reactivar</button>`;
        }
            
        htmlProductos += `
            <div class="card-producto">
                <img class="producto-img" src="${prod.ruta_img}" alt="${prod.titulo}">
                <h3>${prod.titulo}</h3>
                <p>
                    Id: ${prod.id}<br>
                    $${prod.precio}<br>
                    Estado: <span class="${estadoClase}">${estadoTexto}</span><br>
                    ${botonReactivar} 
                </p>
            </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProductos;
}

async function reactivarProducto(id) {
    try {
        let response = await fetch(`${url}/api/products/${id}/activate`, {
            method: "PATCH"
        });

        if (!response.ok) {
            throw new Error("No fue posible reactivar el producto");
        }

        obtenerProductos();
    } 
    catch (error) {
        console.error("Error en reactivarProducto:", error);
    }
}




function init() {
    obtenerProductos();
}

init();
window.reactivarProducto = reactivarProducto;