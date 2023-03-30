import express from "express";
import cors from 'cors';

import indexRoutes from "./routes/index.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import leccionesRoutes from './routes/lecciones.routes.js';
import archivosRoutes from './routes/archivos.routes.js';
import cuestionariosRoutes from './routes/cuestionarios.routes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import accesosRoutes from './routes/accesos.routes.js';
import compraRoutes from './routes/compra.routes.js';
import curso_clientesRoutes from "./routes/curso_clientes.routes.js";
import calificacionesRoutes from "./routes/calificaciones.routes.js";
import certificacionesRoutes from "./routes/certificaciones.routes.js";

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
app.use("/api", rolesRoutes);
app.use("/api", accesosRoutes);
app.use("/api", compraRoutes);
app.use("/api", curso_clientesRoutes);
app.use("/api", calificacionesRoutes);
app.use("/api", certificacionesRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ "mensaje": "No se encontro el endpoint" });
})

export default app;