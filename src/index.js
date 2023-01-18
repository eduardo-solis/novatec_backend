import express from "express";

import indexRoutes from "./routes/index.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";

const app = express();

app.use(express.json());

// Rutas del servicio
app.use(indexRoutes);
app.use("/api", cursosRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ "mensaje": "No se encontro el endpoint" });
})

app.listen(3000);
console.log("Servidor ejecutandose en el puerto 3000");