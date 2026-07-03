const todoIdValidator = (req, res, next, value) => {
    const id = Number(value?.trim());
    //Validamos que le paranetro id sea un número entero positivo
    if(!Number.isSafeInteger(id) || id <= 0){
        return res.status(400).json({
            success: false,
            message: "El parámetro id debe ser un número entero positivo",
        })
    }
    //Si es cálido, lo asignamos a req.params.id para que este disponible en los controladores
    req.params.id = id;
    //Llmamos a next() para continuar con la ejecución de la ruta
    next();
}

export default todoIdValidator;