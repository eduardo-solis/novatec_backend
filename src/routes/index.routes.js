import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola mundo");
});


// Consulta para verificar la conexión del proyecto con la base de datos
router.get("/ping", async (req, res) => {
    const [result] = await pool.query('select "PONG" as result');
    res.json(result[0]);
});

export default router;