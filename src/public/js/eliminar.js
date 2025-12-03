import { initTema, imprimirDatosAlumno } from "./tema.js";
initTema();
imprimirDatosAlumno();

let listaProductos = document.getElementById("lista-productos");

let formEliminar = document.getElementById("form-eliminar-producto");
let url = "http://localhost:3000";


formEliminar.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let idProd = data.idProd;
    
    try{
        
        let respuesta = await fetch(`${url}/api/products/${idProd}`);
        let datos = await respuesta.json();
        
        
        if(!respuesta.ok){
            console.log(datos);
            console.log(datos.message);
            mostrarError(datos.message);
            return; 
        }   
        let producto = datos.payload[0]; // Accedo al objeto que se encuentra en la posicion 0 de payload
        
        
        validarEstado(producto);
        
        let deleteProduct_button = document.getElementById("deleteProduct_button");
        deleteProduct_button.addEventListener("click", function(){
            idProdEliminar = producto.id;
            modal.style.display = "block";
            body.style.overflow = "hidden";
        })
        
    } catch(error){
        console.log(error);
    }
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
        
        alert("Producto dado de baja correctamente.");
        listaProductos.innerHTML = "";
        
    } catch (error) {
        console.error("Error al hacer DELETE:", error);
        alert("Ocurrió un error al intentar dar de baja el producto.");
    }
}

function validarEstado (producto) {
    if (producto.activo === 0) {
        listaProductos.innerHTML = `
        <li class="li-producto">
        <img src="${producto.ruta_img}">
        <p>
        ID: ${producto.id} <br> 
        ${producto.titulo} - ${producto.autor} <br> 
        Precio $${producto.precio} <br>
        Estado: <span class="estado-inactivo">Inactivo</span>
        </p>
        </li>
        <li class="li-botonera">
        <p class="message-error">Este producto ya está dado de baja.</p>
        </li>`;
        return;
    } else {
        let htmlProducto = `
        <li class="li-producto">
        <img src="${producto.ruta_img}">
        <p>
        ID: ${producto.id} <br> 
        ${producto.titulo} - ${producto.autor} <br> 
        Precio $${producto.precio} <br>
        Estado: <span class="estado-activo">Activo</span>
        </p>
        </li>
        <li class="li-botonera">
        <input class="input-submit" type="button" id="deleteProduct_button" value="Dar de baja">
        </li>
        `;
        listaProductos.innerHTML = htmlProducto;
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

/*===============
MODAL
==================*/
let idProdEliminar = null;
var modal = document.getElementById("ButtonModal");
var body = document.getElementsByTagName("body")[0];

var btnConfirmar = document.getElementById("btnConfirmarImpresion");
var btnCancelar = document.getElementById("btnCancelarModal");

btnCancelar.onclick = function() {
    cerrarModal();
}

btnConfirmar.onclick = function() {
    eliminarProducto(idProdEliminar);
    cerrarModal();
}

function cerrarModal() {
    modal.style.display = "none";
    body.style.overflow = "visible";
}
/*====*/