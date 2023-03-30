import { pool } from "../db.js";

export const obtenerCuestionarios = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM cuestionario");
        res.json(rows);
    }
    catch(error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const obtenerCuestionarioPorLeccion = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM cuestionario WHERE idLeccion = ?", [req.params.idLeccion]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun cuestionario" })

        let cuestionario = rows[0]

        const [result] = await pool.query("select * from pregunta where idCuestionario = ?", [cuestionario.idCuestionario])
        cuestionario.preguntas = result

        res.send(cuestionario);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const obtenerCuestionario = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM cuestionario WHERE idCuestionario = ?", [req.params.id]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun cuestionario" })
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const crearCuestionario = async (req, res) => {

    try {

        const { idLeccion, nombre } = req.body;
        const [rows] = await pool.query(`INSERT INTO cuestionario (idLeccion, nombre) value (?,?)`, [idLeccion, nombre]);
        res.send({
            idCuestionario: rows.insertId,
            idLeccion: idLeccion,
            nombre: nombre
        });

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}

export const modificarCuestionario = async (req, res) => {

    const { id } = req.params;
    const { idLeccion, nombre } = req.body;

    try {
        
        const [result] = await pool.query("UPDATE cuestionario SET idLeccion = IFNULL(?, idLeccion), nombre = IFNULL(?, nombre) WHERE idCuestionario = ?", [idLeccion, nombre, id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun cuestionario" });
        const [rows] = await pool.query("SELECT * FROM cuestionario WHERE idCuestionario = ?", [id]);
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const eliminarCuestionario = async (req, res) => {

    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM cuestionario WHERE idCuestionario = ?", [id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun cuestionario" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}
