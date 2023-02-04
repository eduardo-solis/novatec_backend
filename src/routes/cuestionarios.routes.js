import { Router } from "express";
import {
    obtenerCuestionarios,
    obtenerCuestionario,
    crearCuestionario,
    modificarCuestionario,
    eliminarCuestionario
} from '../controllers/cuestionarios.controller.js';

const router = Router();

router.get("/cuestionario", obtenerCuestionarios);
router.get("/cuestionario/:id", obtenerCuestionario);
router.post("/cuestionario", crearCuestionario);
router.patch("/cuestionario/:id", modificarCuestionario);
router.delete("/cuestionario/:id", eliminarCuestionario);

export default router;