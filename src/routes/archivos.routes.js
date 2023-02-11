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

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get ("/archivo", obtenerArchivos);

router.get ("/archivo/:id", obtenerArchivo);

router.post ("/archivo", [verificarToken, verificarEsEmpleadoAdmin], crearArchivo);

router.patch ("/archivo/:id", [verificarToken, verificarEsEmpleadoAdmin], modificarArchivo);

router.delete ("/archivo/:id", [verificarToken, verificarEsAdmin], eliminarArchivo);

// archivo-leccion

router.get ("/archivo_leccion/:idLeccion", obtenerArchivosByLeccion);
router.post ("/archivo_leccion", [verificarToken, verificarEsEmpleadoAdmin], crearArchivoByLeccion);
router.delete ("/archivo_leccion/:idArchivo", [verificarToken, verificarEsAdmin], eliminarArchivoByLeccion);


export default router;