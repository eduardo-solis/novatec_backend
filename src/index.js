import express from "express";

import indexRoutes from "./routes/index.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";

const app = express();

app.use(indexRoutes);
app.use(cursosRoutes);

app.listen(3000);
console.log("Servidor ejecutandose en el puerto 3000");