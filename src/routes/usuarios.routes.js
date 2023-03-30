import { Router } from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, modificarUsuario, modificarEstatusUsuario } from '../controllers/usuarios.controller.js';
import { verificarExistenciaRegistro, verificarExistenciaRoles, verificarRegistroDuplicado } from "../middlewares/verificarRegistro.js";

import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/usuario", [ verificarToken, verificarEsEmpleadoAdmin ], obtenerUsuarios)

router.get("/usuario/:id", [ verificarToken, verificarEsEmpleadoAdmin ], obtenerUsuarioPorId)

router.post("/usuario", [ verificarToken, verificarEsEmpleadoAdmin ,verificarRegistroDuplicado, verificarExistenciaRoles ], crearUsuario)

router.patch("/usuario/:id", [verificarToken, verificarEsEmpleadoAdmin, verificarExistenciaRegistro], modificarUsuario)

router.delete("/usuario/:id", [verificarToken, verificarEsEmpleadoAdmin, verificarExistenciaRegistro], modificarEstatusUsuario)

export default router