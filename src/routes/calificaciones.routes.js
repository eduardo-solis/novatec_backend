import { Router } from "express";
import { obtenerCalificacionesCliente, registrarCalificacion, modificarCalificacion, obtenerCalificacionCliente } from "../controllers/calificaciones.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarEsUsuario } from "../middlewares/verificarRol.js";

const router = Router();

router.get("/calificacion/:idCliente/:idCurso", [verificarToken, verificarEsUsuario], obtenerCalificacionesCliente);
router.get("/calificacion_una/:idCliente/:idCuestionario", [verificarToken, verificarEsUsuario], obtenerCalificacionCliente);
router.post("/calificacion", [verificarToken, verificarEsUsuario], registrarCalificacion);
router.patch("/calificacion/:idCalificacion", [verificarToken, verificarEsUsuario], modificarCalificacion)

export default router;