import { pool } from "../db.js";


export const obtenerCursos = async (req, res) => {
    try {
        
        const [rows] = await pool.query("SELECT * FROM curso");
        res.json(rows);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}

export const obtenerCursosCliente = async (req, res) => {

    const {idCliente} = req.params

    try {
        const [rows] = await pool.query("select cc.idRelacion, cc.idCliente, cc.ultimaConexion, cc.finalizado, cc.fechaFinalizacionCurso, cc.codigoAutorizacion, cc.autorizado, c.* from cliente_curso as cc inner join curso as c on cc.idCurso = c.idCurso where cc.idCliente = ?", [idCliente]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}

export const obtenerCurso = async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT * FROM curso WHERE idCurso = ?", [req.params.id]);
        if (rows <= 0) return res.status(404).json({ "mensaje": "No se encontro ningun curso" })
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const crearCurso = async (req, res) => {

    const { nombre, objetivos, descripcion, precio, duracion, idVideo, idMiniatura } = req.body;
    try {

        const [rows] = await pool.query(`INSERT INTO curso (nombre, objetivos, descripcion, precio, duracion, idVideo, idMiniatura) value (?,?,?,?,?,?,?)`, [nombre, objetivos, descripcion, precio, duracion, idVideo, idMiniatura]);
        res.send({
            idCurso: rows.insertId,
            nombre: nombre,
            objetivos: objetivos,
            descripcion: descripcion,
            precio: precio,
            duracion: duracion,
            idVideo: idVideo,
            idMiniatura: idMiniatura,
            estatus: 1
        });

    } catch (error) {
        res.status(500).json({"mensaje": error});
    }

}

export const modificarCurso = async (req, res) => {

    const { id } = req.params;
    const { nombre, objetivos, descripcion, precio, duracion, idVideo, idMiniatura } = req.body;

    try {
        
        const [result] = await pool.query("UPDATE curso SET nombre = IFNULL(?, nombre), objetivos = IFNULL(?, objetivos), descripcion = IFNULL(?, descripcion), precio = IFNULL(?, precio), duracion = IFNULL(?, duracion), idVideo = IFNULL(?, idVideo), idMiniatura = IFNULL(?, idMiniatura) WHERE idCurso = ?", [nombre, objetivos, descripcion, precio, duracion, idVideo, idMiniatura, id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });
        const [rows] = await pool.query("SELECT * FROM curso WHERE idCurso = ?", [id]);
        res.send(rows[0]);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }
}

export const cambiarEstatusCurso = async (req, res) => {
    const { id, op } = req.params;
    let sql = "select 1 + 1";

    try {
        
        if( op == 0 ){ // Eliminando curso
            sql = "UPDATE curso SET estatus = false WHERE idCurso = ?";
        }
        if ( op == 1 ){ // Activando curso
            sql = "UPDATE curso SET estatus = true WHERE idCurso = ?";
        }

        const [result] = await pool.query(sql, [id]);
        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal"});
    }

}
