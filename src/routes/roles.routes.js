import { Router } from "express";
import { cambiarRolesUsuario, obtenerRoles } from "../controllers/roles.controller.js";
import { obtenerRolesUsuario } from "../middlewares/roles.js";

import { verificarExistenciaRegistro } from "../middlewares/verificarRegistro.js";

const router = Router();

router.get("/rol", obtenerRoles);

router.put("/rol/:id", [verificarExistenciaRegistro, obtenerRolesUsuario], cambiarRolesUsuario)

export default router;