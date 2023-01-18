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

    const [result] = await pool.query(`SELECT agregar_curso(?,?,?) AS insertId`, [nombre, descripcion, precio]);

    const { insertId } = result[0];

    res.send({
        Id: insertId,
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio
    });

}

export const modificarCurso = (req, res) => {
    res.send("modificando curso");
}

export const cambiarEstatusCurso = (req, res) => {
    res.send("eliminando/activando curso");
}
