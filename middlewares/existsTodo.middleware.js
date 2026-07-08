import * as todosModel from "../models/todos.model.js";

const existsTodo = async (req, res, next) => {
    const found = await todosModel.getTodoById(req.params.id);

    if(!found){
        return res.status(404).json({
            success: false,
            message: "Tarea no encontrada",
        })
    }
    req.todo = found;//Guardamos la tarea
    next();
}

export default existsTodo;