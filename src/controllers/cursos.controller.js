import { pool } from "../db.js";


export const obtenerCursos = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM vista_curso");
    res.json(rows);
}

export const obtenerCurso = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM vista_curso WHERE Id = ?", [req.params.id]);

    if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun curso" })

    res.send(rows[0]);
}

export const crearCurso = async (req, res) => {

    const { nombre, descripcion, precio } = req.body;

    const [rows] = await pool.query(`INSERT INTO curso (nombre, descripcion, precio) value (?,?,?)`, [nombre, descripcion, precio]);

    res.send({
        Id: rows.insertId,
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio
    });

}

export const modificarCurso = async (req, res) => {

    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    const [result] = await pool.query("UPDATE curso SET nombre = ?, descripcion = ?, precio = ? WHERE idCurso = ?", [nombre, descripcion, precio, id]);

    if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });

    res.send({
        Id: id,
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio
    });

}

export const cambiarEstatusCurso = async (req, res) => {
    const { id, op } = req.params;
    let sql = "select 1 + 1";

    if( op == 0 ){ // Eliminando curso
        sql = "UPDATE curso SET estatus = false WHERE idCurso = ?";
    }

    if ( op == 1 ){ // Activando curso
        sql = "UPDATE curso SET estatus = true WHERE idCurso = ?";
    }

    const [result] = await pool.query(sql, [id]);

    if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });

    res.sendStatus(204);

}
