import { Router } from "express";
import { obtenerCertificadosCliente, registrarCertificado, generarCertificado } from "../controllers/certificaciones.controller.js";
import { verificarEsUsuario } from "../middlewares/verificarRol.js";
import { verificarToken } from "../middlewares/verificarToken.js";


const router = Router();

router.get("/certificacion/:idCliente", [verificarToken, verificarEsUsuario], obtenerCertificadosCliente)

// Crear certificación
router.post("/certificacion", [verificarToken, verificarEsUsuario], registrarCertificado)

// Enviar certificación
router.get("/certificacion_gem/:idCertificado", [verificarToken, verificarEsUsuario], generarCertificado)

export default router;