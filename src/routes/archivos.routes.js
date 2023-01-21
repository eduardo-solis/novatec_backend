import { Router } from "express";

import {
    crearArchivo,
    eliminarArchivo,
    modificarArchivo,
    obtenerArchivo,
    obtenerArchivos
} from '../controllers/archivos.controller.js';

const router = Router();

router.get ("/archivo", obtenerArchivos);

router.get ("/archivo/:id", obtenerArchivo);

router.post ("/archivo", crearArchivo);

router.patch ("/archivo", modificarArchivo);

router.delete ("/archivo/:id", eliminarArchivo);

export default router;