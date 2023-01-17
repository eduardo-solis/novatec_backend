import { Router } from "express";

const router = Router();

router.get("/curso", (req, res) => {
    res.send("obteniendo cursos");
})

router.post("/curso", (req, res) => {
    res.send("agregando curso");
})

router.put("/curso", (req, res) => {
    res.send("modificando curso");
})

router.delete("/curso", (req, res) => {
    res.send("eliminando / activando curso");
})

export default router;