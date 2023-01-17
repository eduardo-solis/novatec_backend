import express from "express";
import { pool } from "./db.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hola mundo");
});


// Consulta para verificar la conexión del proyecto con la base de datos
app.get("/ping", async (req, res) => {
    const [result] = await pool.query('select "PONG" as result');
    res.json(result[0]);
});

app.listen(3000);
console.log("Servidor ejecutandose en el puerto 3000");