import { Router } from "express";
import { obtenerCalificacionesCliente, registrarCalificacion, modificarCalificacion } from "../controllers/calificaciones.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarEsUsuario } from "../middlewares/verificarRol.js";

const router = Router();

router.get("/calificacion/:idCliente/:idCurso", [verificarToken, verificarEsUsuario], obtenerCalificacionesCliente);
router.post("/calificacion", [verificarToken, verificarEsUsuario], registrarCalificacion);
router.patch("/calificacion/:idCalificacion", [verificarToken, verificarEsUsuario], modificarCalificacion)

export default router;