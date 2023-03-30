import { Router } from "express";

import {
    obtenerPreguntas,
    obtenerPregunta,
    crearPregunta,
    modificarPregunta,
    eliminarPregunta
} from '../controllers/preguntas.controller.js';

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/pregunta", obtenerPreguntas);
router.get("/pregunta/:id", obtenerPregunta);
router.post("/pregunta", [ verificarToken, verificarEsEmpleadoAdmin ], crearPregunta);
router.patch("/pregunta/:id", [ verificarToken, verificarEsEmpleadoAdmin ], modificarPregunta);
router.delete("/pregunta/:id", [ verificarToken, verificarEsEmpleadoAdmin ], eliminarPregunta);

export default router;