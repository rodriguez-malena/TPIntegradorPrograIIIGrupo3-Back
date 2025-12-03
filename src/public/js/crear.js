import { initTema, imprimirDatosAlumno } from "./tema.js";
imprimirDatosAlumno();
initTema();

let altaProuctsContainer = document.getElementById("altaProucts-container");
let altaUsers_container =  document.getElementById("altaUsers-container");
let url = "http://localhost:3000";

// Alta Usuarios
altaUsers_container.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target); 

    let data = Object.fromEntries(formData.entries()); 

    console.log(data);

    // Envia los datos de nuestro usuario al endpoint /api/users
    try {
        let response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }

    } catch(error) { 
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});


// Alta productos
altaProuctsContainer.addEventListener("submit", async (event) => {

    event.preventDefault(); 
    
    alert("Formulario enviado");

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries()); 

    console.log(JSON.stringify(data));

    try {
        let response = await fetch (`${url}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            });

            if(response.ok){
                console.log(response);

                let result = await response.json();
                console.log(result.message);
                alert(result.message);
            }


            } catch (error) { 
                console.error("Error al enviar los datos: ", error);
                alert("Error al procesar la solicitud");
            }
        });
    
    