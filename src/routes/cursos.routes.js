import { Router } from "express";
import { obtenerCursos, obtenerCurso ,crearCurso, modificarCurso, cambiarEstatusCurso } from "../controllers/cursos.controller.js";

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/curso", [ verificarToken ], obtenerCursos)

router.get("/curso/:id", [ verificarToken ], obtenerCurso)

router.post("/curso", [ verificarToken, verificarEsEmpleadoAdmin ], crearCurso)

router.patch("/curso/:id", [ verificarToken, verificarEsEmpleadoAdmin ], modificarCurso)

router.delete("/curso/:id/:op", [ verificarToken, verificarEsAdmin ], cambiarEstatusCurso)

export default router;