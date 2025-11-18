
import { Router } from "express";

const router = Router();

import {validateId} from  "../middlewares/middlewares.js";
import{createProduct, getAllProducts, getProductId, modifyproduct, removeProduct} from "../controllers/product.controllers.js"



//Traer todos los productos
router.get("/", getAllProducts);

//Consultar producto por id
router.get("/:id", validateId, getProductId);


// Crear producto
router.post("/", createProduct);

// Actualizar producto
router.put("/", validateId, modifyproduct);

// Eliminar producto 
router.delete("/:id", validateId, removeProduct);

export default router
