import { Router } from "express";

import {
    cambiarEstatus,
    crearLeccion,
    modificarLeccion,
    obtenerLeccion,
    obtenerLecciones
} from '../controllers/lecciones.controller.js';

const router = Router();

router.get ("/leccion", obtenerLecciones);

router.get ("/leccion/:id", obtenerLeccion);

router.post ("/leccion", crearLeccion);

router.patch ("/leccion/:id", modificarLeccion);

router.delete ("/leccion/:id/:op", cambiarEstatus);

export default router;