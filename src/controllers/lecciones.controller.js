import { pool } from "../db.js";

export const obtenerLecciones = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM leccion");
        res.json(rows);
    }
    catch(error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const obtenerLeccion = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM leccion WHERE idLeccion = ?", [req.params.id]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun archivo" })
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const crearLeccion = async (req, res) => {

    try {
        const idVideo = 0;
        const { idCurso, nombre, informacion } = req.body;
        const [rows] = await pool.query(`INSERT INTO leccion (idCurso, nombre, informacion, idVideo) value (?,?,?,?)`, [idCurso, nombre, informacion, idVideo]);
        res.send({
            idLeccion: rows.insertId,
            idCurso: idCurso,
            nombre: nombre,
            informacion: informacion,
            idVideo: idVideo,
            estatus: 1
        });

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const modificarLeccion = async (req, res) => {

    const { id } = req.params;
    const { nombre, informacion, idVideo } = req.body;

    try {
        
        const [result] = await pool.query("UPDATE leccion SET nombre = IFNULL(?, nombre), informacion = IFNULL(?, informacion), idVideo = IFNULL(?, idVideo) WHERE idLeccion = ?", [nombre, informacion, idVideo, id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ninguna lección" });
        const [rows] = await pool.query("SELECT * FROM leccion WHERE idLeccion = ?", [id]);
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const cambiarEstatus = async (req, res) => {

    const { id, op } = req.params;
    let sql = "";

    try {

        if ( op == 1 ) {
            sql = "UPDATE leccion SET estatus = 1 WHERE idLeccion = ?"
        }
        else{
            sql = "UPDATE leccion SET estatus = 0 WHERE idLeccion = ?"
        }

        const [result] = await pool.query(sql, [id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun archivo" });

        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}
