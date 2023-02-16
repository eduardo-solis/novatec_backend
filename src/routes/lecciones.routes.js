import { Router } from "express";

import {
    cambiarEstatus,
    crearLeccion,
    modificarLeccion,
    obtenerLeccion,
    obtenerLecciones,
    obtenerLeccionesPorCurso
} from '../controllers/lecciones.controller.js';

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get ("/leccion", obtenerLecciones);
router.get ("/leccion_curso/:idCurso", obtenerLeccionesPorCurso);

router.get ("/leccion/:id", obtenerLeccion);

router.post ("/leccion", [ verificarToken, verificarEsEmpleadoAdmin ], crearLeccion);

router.patch ("/leccion/:id", [ verificarToken, verificarEsEmpleadoAdmin ], modificarLeccion);

router.delete ("/leccion/:id/:op", [ verificarToken, verificarEsAdmin ], cambiarEstatus);

export default router;