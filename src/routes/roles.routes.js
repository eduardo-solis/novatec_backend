import { Router } from "express";
import { cambiarRolesUsuario, obtenerRoles } from "../controllers/roles.controller.js";
import { obtenerRolesUsuario } from "../middlewares/roles.js";

import { verificarExistenciaRegistro } from "../middlewares/verificarRegistro.js";
import { verificarToken } from '../middlewares/verificarToken.js';
import { verificarEsEmpleadoAdmin, verificarEsAdmin } from '../middlewares/verificarRol.js';

const router = Router();

router.get("/rol", [verificarToken, verificarEsEmpleadoAdmin], obtenerRoles);

router.put("/rol/:id", [ verificarToken, verificarEsAdmin, verificarExistenciaRegistro, obtenerRolesUsuario], cambiarRolesUsuario)

export default router;