import { Router } from "express";

import {
    obtenerPreguntas,
    obtenerPregunta,
    crearPregunta,
    modificarPregunta,
    eliminarPregunta
} from '../controllers/preguntas.controller.js';

const router = Router();

router.get("/pregunta", obtenerPreguntas);
router.get("/pregunta/:id", obtenerPregunta);
router.post("/pregunta", crearPregunta);
router.patch("/pregunta/:id", modificarPregunta);
router.delete("/pregunta", eliminarPregunta);

export default router;