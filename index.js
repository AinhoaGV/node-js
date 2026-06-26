//const express = require("express");//antigua forma de llamar
import express from "express";

const app = express();
const port = process.env.PORT;

const todos = [
    {
        id: 1,
        title: "Tarea 1",
    },
    {
        id: 2,
        title: "Tarea 2",
    },
    {
        id: 3,
        title: "Tarea 3",
    }
]
//Midlewares
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {//Para escuchar un evento
    console.log("GET [200] /");
    //response.send("Respuesta de la ruta /");
    // response.json({
    //     message: "Hola desde Express JS",
    //     query: request.query,
    // });
    response.render("home", { name: "Ainhoa", todos });
});

app.get("/:id", (req, res) => {
    res.send(`ID: ${req.params.id}`);
})
//Crear la rutatodos/id
//Buscar dentro de nuestra lista todos la tarea con el ID, sino lo encontramos devolvemos el mensaje : "Tarea no encontrada"
app.get("/todos/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id === Number(req.params.id));
    if(todo){
        res.send(`ID: ${todo.id}<br>Title: ${todo.title}`);
    }else{
        res.send("Tarea no encontrada");
    }
})

app.post("/todos/create", (req, res)=>{
    //console.log(req.body);
    //Agregar una nueva tarea a la lista
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title
    }
    todos.push(newTodo);
    //Responder con nuestra plantilla home.hbs pasándole la lista actualizada
    //res.render("home", {name: "Ainhoa", todos});//La ruta falla hay que enviarlo a la home
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Arrancando servidor en localhost: ${port}`);
});