import { Router } from "express";
import { registrarCliente, accederAlSistema, perfil } from "../controllers/accesos.controller.js";
import { verificarExistenciaUsuario, verificarRegistroDuplicado } from '../middlewares/verificarRegistro.js'
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/registro", verificarRegistroDuplicado, registrarCliente);

router.post("/acceso", verificarExistenciaUsuario, accederAlSistema);

router.get("/perfil", verificarToken, perfil);

export default router;