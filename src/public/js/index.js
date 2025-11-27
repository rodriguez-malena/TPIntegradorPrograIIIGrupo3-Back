            let contenedorProductos = document.getElementById("contenedor-productos");
            let url = "http://localhost:3000";

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
                    htmlProductos += `
                        <div class="card-producto">
                            <img class="producto-img" src="${prod.ruta_img}" alt="${prod.titulo}">
                            <h3>${prod.titulo}</h3>
                            <p>
                                Id: ${prod.id}<br>
                                $${prod.precio}<br>
                                Estado: <span class="${prod.activo === 1 ? "estado-activo" : "estado-inactivo"}">
                                ${prod.activo === 1? "Activo" : "Inactivo"}
                                </span>
                            </p>
                        </div>
                    `;
                });

                contenedorProductos.innerHTML = htmlProductos;
            }

            function init() {
                obtenerProductos();
            }

            init();