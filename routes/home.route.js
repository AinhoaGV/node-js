import { Router } from "express";
import { todos } from "../data/todos.js";

export const homeRouter = Router();
homeRouter.get("/", (request, response) => {//Para escuchar un evento
    //response.send("Respuesta de la ruta /");
    // response.json({
    //     message: "Hola desde Express JS",
    //     query: request.query,
    // });
    response.render("home", { name: "Ainhoa", todos });
});