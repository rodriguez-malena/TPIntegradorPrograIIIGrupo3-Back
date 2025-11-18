

const loggerUrl = (req,res,next) => {

    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

const validateId = (req, res, next) => {
    let { id } = req.params;

    if(!id || isNaN(Number(id))){
        return res.status(400).json({
            message:"El id del producto debe ser un numero válido"
        });
    }

    req.id = parseInt(id, 10); // se convierte a entero el id pq viene como string en la url

    console.log("Id validado: ", req.id);

    next();
}

export {
    loggerUrl,
    validateId
}