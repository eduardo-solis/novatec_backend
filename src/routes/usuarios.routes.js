import { Router } from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, modificarUsuario, modificarEstatusUsuario } from '../controllers/usuarios.controller.js';
import { verificarExistenciaRegistro, verificarExistenciaRoles, verificarRegistroDuplicado } from "../middlewares/verificarRegistro.js";

const router = Router();

router.get("/usuario", obtenerUsuarios)

router.get("/usuario/:id", obtenerUsuarioPorId)

router.post("/usuario", [ verificarRegistroDuplicado, verificarExistenciaRoles ], crearUsuario)

router.patch("/usuario/:id", verificarExistenciaRegistro, modificarUsuario)

router.delete("/usuario/:id", verificarExistenciaRegistro, modificarEstatusUsuario)

export default router