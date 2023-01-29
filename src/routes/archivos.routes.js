import { Router } from "express";

import {
    crearArchivo,
    eliminarArchivo,
    modificarArchivo,
    obtenerArchivo,
    obtenerArchivos,
    obtenerArchivosByLeccion
} from '../controllers/archivos.controller.js';

const router = Router();

router.get ("/archivo", obtenerArchivos);

router.get ("/archivo/:id", obtenerArchivo);

router.get ("/archivo_leccion/:idLeccion", obtenerArchivosByLeccion);

router.post ("/archivo", crearArchivo);

router.patch ("/archivo/:id", modificarArchivo);

router.delete ("/archivo/:id", eliminarArchivo);

export default router;