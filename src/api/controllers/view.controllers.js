
import ProductModels from "../models/product.models.js"

export const productView = async (req, res)  => {
    try {
        const[rows] = await ProductModels.selectAllProducts();
        console.log(rows);

        res.render("index",{
            title:"Listado",
            productos: rows,
            icon: "rueda"
        });

    } catch (error) {
    console.error(error)
    }
}

