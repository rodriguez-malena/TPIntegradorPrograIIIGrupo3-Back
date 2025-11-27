let altaProuctsContainer = document.getElementById("altaProucts-container");

        let url = "http://localhost:3000";

        altaProuctsContainer.addEventListener("submit", async (event) => {

            event.preventDefault(); //evitamos el envio x defecto del formulario
            
            console.log(event.target); // trae todo el formulario html que activó el evento
            
            alert("Formulario enviado");

            let formData = new FormData(event.target);//Guardamos toda la info del formulario en el objeto nativo FormData

            // Transformamos la info de FormData en un objeto JavaScript
            let data = Object.fromEntries(formData.entries()); //Nuestro objeto ya esta listo para enviarse previo parseo a JSON
            
            console.log(JSON.stringify(data));

            //Ahora ya le modemos meter en el cuerpo de la peticion HTTP Post este objeto con los datos del formulario  en JSON.

            try {
                // En peticiones distintas a GET, tenemos que especificar mas informacion en un parametro de opciones

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


            } catch (error) { //el catch solo captura errores de red
                console.error("Error al enviar los datos: ", error);
                alert("Error al procesar la solicitud");
            }
        });
    
    