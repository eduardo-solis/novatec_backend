import { Router } from "express";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarEsUsuario, verificarEsEmpleadoAdmin } from "../middlewares/verificarRol.js";
import { autorizarCurso, cambiarEstatusCompra, obtenerCodigosDeAutorizacion, obtenerCompraPorId_Admin, obtenerCompraPorId_Cliente, obtenerCompras_Admin, obtenerCompras_Cliente, registrarCompra } from "../controllers/compras.controller.js";



const router = Router();

// Usuario => Cliente
router.get("/compra_c/:idCliente", [verificarToken, verificarEsUsuario], obtenerCompras_Cliente)

router.get("/compra_c/:idCliente/:idCompra", [verificarToken, verificarEsUsuario], obtenerCompraPorId_Cliente)

router.post("/compra_c", [verificarToken, verificarEsUsuario], registrarCompra)

router.patch("/compra_c_autorizar/:idCurso",[verificarToken, verificarEsUsuario], autorizarCurso)

// Usuario => Staff
router.get("/compra", [verificarToken, verificarEsEmpleadoAdmin], obtenerCompras_Admin)

router.get("/compra/:idCompra", [verificarToken, verificarEsEmpleadoAdmin], obtenerCompraPorId_Admin)

router.patch("/compra/:idCompra/:estatus", [verificarToken, verificarEsEmpleadoAdmin], cambiarEstatusCompra)

router.get("/compra/:idCliente/:idCompra", [verificarToken, verificarEsEmpleadoAdmin], obtenerCodigosDeAutorizacion)

export default router;