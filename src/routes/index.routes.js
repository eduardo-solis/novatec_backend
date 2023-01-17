import { Router } from "express";
import { ping } from "../controllers/index.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola mundo");
});


// Consulta para verificar la conexión del proyecto con la base de datos
router.get("/ping", ping);

export default router;