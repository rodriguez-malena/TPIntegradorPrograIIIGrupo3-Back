import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import { productView } from "../controllers/view.controllers.js";

const router = Router();

router.get("/", requireLogin, productView);


router.get("/consultar", requireLogin, (req, res)  => {
    res.render("consultar",{
            title:"Consultar por id",
            about: "Consultar por id",
            icon: "lupita" 
        });

})


router.get("/crear", requireLogin, (req, res)  => {
    res.render("crear",{
            title:"Crear",
            about: "Crear Producto",
            icon: "mas"
        });

})

router.get("/modificar",requireLogin, (req, res)  => {
    res.render("modificar",{
            title:"Modificar",
            about: "Actualizar Producto",
            icon: "boligrafo"
        });

}) 

router.get("/eliminar",requireLogin, (req, res)  => {
    res.render("eliminar",{
            title:"Eliminar Producto",
            about: "Eliminar Producto",
            icon: "tacho-basura"
        });

}) 

// Vista Login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});


export default router;