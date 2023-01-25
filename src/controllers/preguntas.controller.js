import { pool } from "../db.js";

export const obtenerPreguntas = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM pregunta");
        res.json(rows);
    }
    catch(error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const obtenerPregunta = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM pregunta WHERE idPregunta = ?", [req.params.id]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ninguna pregunta" })
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const crearPregunta = async (req, res) => {

    try {

        const { idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4 } = req.body;
        const [rows] = await pool.query(`INSERT INTO pregunta (idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4) value (?,?,?,?,?,?,?)`, [idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4]);
        res.send({
            idPregunta: rows.insertId,
            idCuestionario: idCuestionario,
            enunciado: enunciado,
            respuesta_correcta: respuesta_correcta,
            respuesta1: respuesta1,
            respuesta2: respuesta2,
            respuesta3: respuesta3,
            respuesta4: respuesta4
        });

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const modificarPregunta = async (req, res) => {

    const { id } = req.params;
    const { idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4 } = req.body;

    try {
        
        const [result] = await pool.query("UPDATE pregunta SET idCuestionario = IFNULL(?, idCuestionario), enunciado = IFNULL(?, enunciado), respuesta_correcta = IFNULL(?, respuesta_correcta), respuesta1 = IFNULL(?, respuesta1), respuesta2 = IFNULL(?, respuesta2), respuesta3 = IFNULL(?, respuesta3), respuesta4 = IFNULL(?, respuesta4) WHERE idPregunta = ?", [idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4, id]);

        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ninguna pregunta" });
        const [rows] = await pool.query("SELECT * FROM pregunta WHERE idPregunta = ?", [id]);
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const eliminarPregunta = async (req, res) => {

    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM pregunta WHERE idPregunta = ?", [id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ninguna pregunta" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}
