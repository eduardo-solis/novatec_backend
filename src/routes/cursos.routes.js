import { Router } from "express";
import { obtenerCursos, obtenerCurso ,crearCurso, modificarCurso, cambiarEstatusCurso } from "../controllers/cursos.controller.js";

const router = Router();

router.get("/curso", obtenerCursos)

router.get("/curso/:id", obtenerCurso)

router.post("/curso", crearCurso)

router.patch("/curso/:id", modificarCurso)

router.delete("/curso/:id/:op", cambiarEstatusCurso)

export default router;