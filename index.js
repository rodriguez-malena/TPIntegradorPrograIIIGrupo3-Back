/*===============
IMPORTACIONES
=================*/
import express from "express";

const app = express();


import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";
// Importamos las rutas
import { productRoutes, viewRoutes } from "./src/api/routes/index.js"

import { __dirname, join } from "./src/api/utils/index.js";

/*===========
MIDDLEWARES
=============*/
app.use(express.json())

app.use(cors());

app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public")))

/*==========
CONFIG
============*/
// Configuramos EJS como motor de plantilla
app.set("view engine", "ejs");

app.set("views", join(__dirname,"src/views"));  // Nuestras vistas se serviranm desde la carpeta views


/*==========
RUTAS
============*/
//Rutas producto
app.use("/api/products", productRoutes)

// Rutas vista
app.use("/", viewRoutes);


// Arranca servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})