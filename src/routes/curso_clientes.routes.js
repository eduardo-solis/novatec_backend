import { Router } from "express";
import { obtenerCursosCliente, obtenerCursoCliente, modificarCursoCliente, activarCursoCliente } from "../controllers/curso_clientes.controllers.js"
import { verificarToken } from "../middlewares/verificarToken.js"
import { verificarEsUsuario } from "../middlewares/verificarRol.js"

const router = Router();

router.get("/curso_cliente/:idCliente", [verificarToken, verificarEsUsuario], obtenerCursosCliente)

router.get("/curso_cliente/:idCliente/:idCurso", [verificarToken, verificarEsUsuario], obtenerCursoCliente)

router.patch("/curso_cliente/:idRelacion", [verificarToken, verificarEsUsuario], modificarCursoCliente)

router.put("/curso_cliente/:idRelacion", [verificarToken, verificarEsUsuario], activarCursoCliente)

export default router;