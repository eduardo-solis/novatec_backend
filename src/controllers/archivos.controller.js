import { pool } from "../db.js";

export const obtenerArchivos = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM archivo");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }

}

export const obtenerArchivo = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM archivo WHERE idArchivo = ?", [req.params.id]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun archivo" })
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }
}

export const obtenerArchivosByLeccion = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT a.idArchivo, a.nombre, a.url, a.extencion FROM leccion_archivo as l_a inner join archivo as a on l_a.idArchivo = a.idArchivo where l_a.idLeccion = ?", [req.params.idLeccion]);
        res.send(rows);

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }
}

const obtenerArchivoByNombre = async (nombre) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM archivo where nombre = ?`, [nombre])

        if (rows.length != 0) {
            return rows[0];
        }
        else {
            return {
                idArchivo: 0,
                nombre: "",
                url: "",
                extencion: ""
            };
        }
    } catch (error) {
        return {
            idArchivo: 0,
            nombre: "",
            url: "",
            extencion: ""
        };
    }
}

export const crearArchivo = async (req, res) => {

    const { nombre, url, extencion } = req.body;

    try {

        const archivo = await obtenerArchivoByNombre(nombre)

        if (archivo.idArchivo == 0) {
            const [rows] = await pool.query(`INSERT INTO archivo (nombre, url, extencion) value (?,?,?)`, [nombre, url, extencion]);
            res.send({
                idArchivo: rows.insertId,
                nombre: nombre,
                url: url,
                extencion: extencion
            });
        }
        else {
            return res.send(archivo)
        }

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }

}

export const crearArchivoByLeccion = async (req, res) => {

    const { idArchivo, idLeccion } = req.body;

    try {
        const [result] = await pool.query(`INSERT INTO leccion_archivo (idArchivo, idLeccion) value (?,?)`, [idArchivo, idLeccion]);
        
        if (result.affectedRows <= 0) return res.status(404).json({ "mensaje": "No se agrego ningun archivo" });

        res.sendStatus(204);


    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }

}

export const modificarArchivo = async (req, res) => {

    const { id } = req.params;
    const { nombre, url, extencion } = req.body;

    try {

        const [result] = await pool.query("UPDATE archivo SET nombre = IFNULL(?, nombre), url = IFNULL(?, url), extencion = IFNULL(?, extencion) WHERE idArchivo = ?", [nombre, url, extencion, id]);
        if (result.affectedRows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun archivo" });
        const [rows] = await pool.query("SELECT * FROM archivo WHERE idArchivo = ?", [id]);
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }
}

export const eliminarArchivo = async (req, res) => {

    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM archivo WHERE idArchivo = ?", [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun archivo" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }

}

export const eliminarArchivoByLeccion = async (req, res) => {

    const { idArchivo } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM leccion_archivo WHERE idArchivo = ?", [idArchivo]);
        if (result.affectedRows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun archivo" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ "mensaje": "Algo salio mal" });
    }

}
