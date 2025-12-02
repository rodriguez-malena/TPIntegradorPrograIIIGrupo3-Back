import { initTema, imprimirDatosAlumno } from "./tema.js";
imprimirDatosAlumno();
initTema();        
let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");

let url = "http://localhost:3000";

getProductForm.addEventListener("submit", async (event) => {

event.preventDefault(); //prevenimos enviar x defecto el formulario, evita que recargue la página

// Tenemos que obtener los datos del formulario, por lo tanto se crea un objeto FormData
let formData = new FormData(event.target); // FormData permite leer inputs del formulario

// Transformamos a objetos JS los valores de FormData
let data = Object.fromEntries(formData.entries());
console.log(data); // {idProd: '2'}

let idProd = data.idProd; // guardo id
console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);

        //Enviamos en una petición GET el id pegado en la url
        try{
            let respuesta = await fetch(`${url}/api/products/${idProd}`) //solicitud GET
            let datos = await respuesta.json();
            
            if(respuesta.ok){
                // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
                let productos = datos.payload[0]; //accede al objeto del producto devuelto. Payload: los datos que realmente necesitamos
                console.log(productos);
                mostrarProductos(productos);

            } else {
                console.log(datos);
                console.log(datos.message);
                mostrarError(datos.message);
            }
        }catch(error){
            console.log(error);
            alert("No existe producto con ese id");
        }
        });


        function mostrarProductos(producto) {
            let htmlProducto = `
                <li class="li-producto">
                    <img src="${producto.ruta_img}">
                    <p>ID: ${producto.id} <br> ${producto.titulo} - ${producto.autor} <br> Precio $${producto.precio}</p>
                </li>`; //Insertar resultado en la página
                
                listaProductos.innerHTML= htmlProducto;
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