//const express = require("express");//antigua forma de llamar
import express from "express";

const app = express();

app.get("/", (request, response) => {//Para escuchar un evento
    console.log("GET [200] /");
    //response.send("Respuesta de la ruta /");
    response.json({
        message: "Hola desde Express JS",
        query: request.query,
    });
});

app.get("/:id", (req, res) => {
    res.send(`ID: ${req.params.id}`);
})

app.listen(3000,()=>{
    console.log("Arrancando servidor desde el puerto 3000");
});