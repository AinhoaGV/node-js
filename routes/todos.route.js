import { Router } from "express";
import { todos } from "../data/todos.js";//Importante poner .js
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todos.controller.js";
import todoIdValidator from "../middlewares/todoId.validator.middleware.js";
import todoValidator from "../middlewares/todo.validator.middleware.js";
import existsTodo from "../middlewares/existsTodo.middleware.js";
import createTodoSchema from "../schemas/createTodo.schema.js";
import updateTodoSchema from "../schemas/updateTodo.schema.js";
import rateLimit from "express-rate-limit";

export const todosRouter = Router();
// Pipeline para validar el parametro id en las rutas que lo requieran
todosRouter.param("id",todoIdValidator);

const todosRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
});

todosRouter.use(todosRateLimit);

// READ
todosRouter.get("/", getTodos);

//Crear la rutatodos/id
//Buscar dentro de nuestra lista todos la tarea con el ID, sino lo encontramos devolvemos el mensaje : "Tarea no encontrada"
todosRouter.get("/:id", existsTodo, getTodoById)
// CREATE
todosRouter.post("/", todoValidator(createTodoSchema), createTodo)
// DELETE
todosRouter.delete("/:id", existsTodo, deleteTodo);
// PUT
todosRouter.put("/:id", existsTodo, todoValidator(updateTodoSchema), updateTodo);
