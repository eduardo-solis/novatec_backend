import { pool } from "../db.js";

export const obtenerCalificacionesCliente = async (req, res) => {
    const { idCliente, idCurso } = req.params

    try {
        const [rows] = await pool.query("SELECT * FROM calificacion WHERE idCliente = ? AND idCurso = ?", [idCliente, idCurso])
        res.send(rows)
    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const registrarCalificacion = async (req, res) => {

    const { idCuestionario,idCurso, idLeccion, idCliente, calificacion } = req.body;

    try {
        
        const [rows] = await pool.query("INSERT INTO calificacion (idCuestionario, idCurso, idLeccion, idCliente, calificacion) value (?,?,?,?,?)", [idCuestionario, idCurso, idLeccion, idCliente, calificacion])

        if (rows.insertId == 0) return res.sendStatus(404).json({"mensaje": "No se pudo registrar la calificacion"})

        res.json({
            idCalificacion : rows.insertId,
            idCuestionario,
            idCurso,
            idLeccion,
            idCliente,
            calificacion
        });

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const modificarCalificacion = async (req, res) => {
    const { idCalificacion } = req.params
    const { calificacion } = req.body

    try {
        const [result] = await pool.query("UPDATE calificacion SET calificacion = ? WHERE idCalificacion = ?", [calificacion, idCalificacion])

        if(result.affectedRows == 0) return res.sendStatus(404).json({"mensaje": "No se pudo registrar la calificacion"})

        res.sendStatus(204)

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}