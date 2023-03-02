import { Router } from "express";
import { registrarCliente,modificarCliente, accederAlSistema, perfil } from "../controllers/accesos.controller.js";
import { verificarExistenciaUsuario, verificarRegistroDuplicado } from '../middlewares/verificarRegistro.js'
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarEsUsuario } from "../middlewares/verificarRol.js";

const router = Router();

router.post("/registro", verificarRegistroDuplicado, registrarCliente);

router.patch("/editar/:id", [verificarToken,verificarEsUsuario,verificarExistenciaUsuario], modificarCliente);

router.post("/acceso", verificarExistenciaUsuario, accederAlSistema);

router.get("/perfil", verificarToken, perfil);

export default router;