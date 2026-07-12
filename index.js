//const express = require("express");//antigua forma de llamar
import express from "express";
import { logger } from "./middlewares/logger.js";//Al no tener vite hay que poner .js
import { todosRouter } from "./routes/todos.route.js";
import { todos } from "./data/todos.js";
import { homeRouter } from "./routes/home.route.js";
import { authRouter } from "./routes/auth.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

import helmet from "helmet";

const app = express();
const port = process.env.PORT;
// Añade CORS
app.use(helmet());
//Middlewares
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
//Registramos un middleware
app.use(logger);

//Rutas
// Importamos el router de tareas como middleware para la ruta /todos
app.use("/todos", authMiddleware, todosRouter);
// Importamos el router de autentificación como middleware para la ruta /auth
app.use("/auth", authRouter);
// Importamos el router de tareas como middleware para la ruta / home
app.use("/", homeRouter);

app.use((req, res)=> {
    return res.status(404).json({
        success: false,
        message: "Ruta no encontrada",
    })
});
//Iniciamos el servidor
app.listen(port,()=>{
    console.log(`Arrancando servidor en localhost: ${port}`);
});