import { Router } from "express";

import {
    crearArchivo,
    eliminarArchivo,
    modificarArchivo,
    obtenerArchivo,
    obtenerArchivos,
    obtenerArchivosByLeccion,
    crearArchivoByLeccion,
    eliminarArchivoByLeccion
} from '../controllers/archivos.controller.js';

const router = Router();

router.get ("/archivo", obtenerArchivos);

router.get ("/archivo/:id", obtenerArchivo);

router.post ("/archivo", crearArchivo);

router.patch ("/archivo/:id", modificarArchivo);

router.delete ("/archivo/:id", eliminarArchivo);

// archivo-leccion

router.get ("/archivo_leccion/:idLeccion", obtenerArchivosByLeccion);
router.post ("/archivo_leccion", crearArchivoByLeccion);
router.delete ("/archivo_leccion/:idArchivo", eliminarArchivoByLeccion);


export default router;