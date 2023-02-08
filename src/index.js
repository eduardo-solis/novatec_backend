import express from "express";
import cors from 'cors';

import indexRoutes from "./routes/index.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import leccionesRoutes from './routes/lecciones.routes.js';
import archivosRoutes from './routes/archivos.routes.js';
import cuestionariosRoutes from './routes/cuestionarios.routes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))

// Rutas del servicio
app.use(indexRoutes);
app.use("/api", cursosRoutes);
app.use("/api", leccionesRoutes);
app.use("/api", archivosRoutes);
app.use("/api", cuestionariosRoutes);
app.use("/api", preguntasRoutes);
app.use("/api", usuariosRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ "mensaje": "No se encontro el endpoint" });
})

app.listen(3000);
console.log("Servidor ejecutandose en el puerto 3000");