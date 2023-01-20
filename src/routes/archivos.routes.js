import { Router } from "express";

const router = Router();

router.get ("/archivo", (req, res) => {
    res.send("obteniendo archivos");
});

router.get ("/archivo/:id", (req, res) => {
    res.send("obteniendo 1 archivo");
});

router.post ("/archivo", (req, res) => {
    res.send("agregando archivo");
});

router.patch ("/archivo", (req, res) => {
    res.send("modificando archivo");
});

router.delete ("/archivo/:id", (req, res) => {
    res.send("borrar archivo");
});

export default router;