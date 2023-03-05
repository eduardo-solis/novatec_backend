import { Router } from "express";
import { obtenerCursos, obtenerCurso ,crearCurso, modificarCurso, cambiarEstatusCurso, obtenerCursosCliente } from "../controllers/cursos.controller.js";

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin, verificarEsUsuario } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/curso", obtenerCursos)

router.get("/curso/:id", obtenerCurso)

router.get("/curso_c/:idCliente", [verificarToken, verificarEsUsuario], obtenerCursosCliente)

router.post("/curso", [ verificarToken, verificarEsEmpleadoAdmin ], crearCurso)

router.patch("/curso/:id", [ verificarToken, verificarEsEmpleadoAdmin ], modificarCurso)

router.delete("/curso/:id/:op", [ verificarToken, verificarEsAdmin ], cambiarEstatusCurso)

export default router;