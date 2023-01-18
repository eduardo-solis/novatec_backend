import { pool } from "../db.js";


export const obtenerCursos = (req, res) => {
    res.send("obteniendo cursos");
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
