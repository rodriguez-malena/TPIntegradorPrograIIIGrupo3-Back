

import ProductModels from "../models/product.models.js";

// Traer todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();
        console.log(rows);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos":"Productos encontrados"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error al obtener productos"
        })
    }
}

export const getProductId = async (req,res) => {
    try {
        let { id } = req.params;

        const [rows] = await ProductModels.selectProductWhereId(id)
        
        if (rows.length === 0){
            console.log("El producto con ese id no existe");
            return res.status(400).json({
                message: `El producto con el id ${id} no existe`
            })
        }

        res.status(200).json({
            payload:rows,
            message: `Producto con id: ${id} encontrado!`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener producto"
        })
    }
}

export const createProduct = async (req,res)  => {
    try {
            let { titulo, precio, ruta_img, autor, categoria, sinopsis, activo} = req.body;
            
            if(!titulo || !precio || !ruta_img || !autor || !categoria || !sinopsis || !activo){
                console.log("Falta completar algun campo");
                return res.status(404).json({
                    message: "No se completaron los campos requeridos"
                    })
            }
                
            let [rows] = await ProductModels.insertProduct(titulo, precio, ruta_img, autor, categoria, sinopsis, activo);
            console.log(rows);
            

            res.status(200).json({
                payload: rows,
                message: "Producto creado con éxito"
            })

    } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al crear producto"
            })
        }
    }

export const removeProduct  = async (req,res)  => {
    try {
            let { id } = req.params;
    
            let [result] = await ProductModels.deleteProduct(id);
            console.log(result);
    
            if (result.affectedRows === 0){
                console.log("Error al eliminar producto");
    
                return res.status(404).json({
                    message: "No se eliminó el producto"
                })
            }
    
            res.status(200).json({
                message: `El producto con id ${id} fue dado de baja`
            })
    
    
        } catch (error) {
            console.log("Error eliminando producto ", error)
    
            res.status(500).json({
                message: "Error interno del servidor"
            })
            
        }
}

export const reactivateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await ProductModels.activateProduct(id);

        if (result.affectedRows === 0) {
            console.log("Error al reactivar el producto");
            return res.status(404).json({
                message: `No se reactivó el producto`
            });
        }

        res.status(200).json({
            message: `Producto ${id} reactivado correctamente`
        });

    } catch (error) {
        console.error("Error al reactivar producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const modifyproduct  = async (req,res)  => {
    try {
        let { id } = req.params;
        let { titulo, precio, ruta_img, autor, categoria, sinopsis, activo } = req.body;

        if(!id || !titulo || !precio || !ruta_img || !autor || !categoria || !sinopsis || !activo){
            console.log("Falta completar algun campo");
            
            return res.status(404).json({
                message: "No se completaron los campos requeridos"
                })
        }

        
        let [result] = await ProductModels.updateProduct(id, titulo, precio, ruta_img, autor, categoria, sinopsis, activo);

        if (result.affectedRows === 0){
            console.log("Error al actualizar producto");

            return res.status(404).json({
                message: "No se actualizó el producto"
            })
        }

        res.status(200).json({
            message:"Producto actualizado con exito",
            
        })
        
    } catch (error) {
        console.error(`Error al actualizar producto: `, error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}