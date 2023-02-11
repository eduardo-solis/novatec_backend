import { Router } from "express";
import {
    obtenerCuestionarios,
    obtenerCuestionario,
    crearCuestionario,
    modificarCuestionario,
    eliminarCuestionario
} from '../controllers/cuestionarios.controller.js';

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/cuestionario", [ verificarToken ], obtenerCuestionarios);
router.get("/cuestionario/:id", [ verificarToken ], obtenerCuestionario);
router.post("/cuestionario", [ verificarToken, verificarEsEmpleadoAdmin ], crearCuestionario);
router.patch("/cuestionario/:id", [ verificarToken, verificarEsEmpleadoAdmin ], modificarCuestionario);
router.delete("/cuestionario/:id", [ verificarToken, verificarEsAdmin ], eliminarCuestionario);

export default router;