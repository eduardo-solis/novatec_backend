import { Router } from "express";
import { obtenerCursos, obtenerCurso ,crearCurso, modificarCurso, cambiarEstatusCurso } from "../controllers/cursos.controller.js";

const router = Router();

router.get("/curso", obtenerCursos)

router.get("/curso/:id", obtenerCurso)

router.post("/curso", crearCurso)

router.put("/curso", modificarCurso)

router.delete("/curso", cambiarEstatusCurso)

export default router;