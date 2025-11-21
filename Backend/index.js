/*===============
IMPORTACIONES
=================*/
import express from "express";

const app = express();


import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js"

/*===========
MIDDLEWARES
=============*/
app.use(express.json())

app.use(cors());

app.use(loggerUrl);

/*==========
ENDPOINTS
============*/


/*==========
RUTAS
============*/
app.use("/api/products", productRoutes)


// Arranca servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})