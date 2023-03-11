import { pool } from "../db.js";

export const obtenerCursosCliente = async (req, res) => {
    const {idCliente} = req.params

    try {
        const [rows] = await pool.query("select cc.idRelacion, cc.idCliente, cc.ultimaConexion, cc.finalizado, cc.fechaFinalizacionCurso, cc.codigoAutorizacion, cc.autorizado, c.* from cliente_curso as cc inner join curso as c on cc.idCurso = c.idCurso where cc.idCliente = ?", [idCliente]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}

export const obtenerCursoCliente = async (req,res) => {
    const {idCliente, idCurso} = req.params

    try {
        const [rows] = await pool.query("select cc.idRelacion, cc.idCliente, cc.ultimaConexion, cc.finalizado, cc.fechaFinalizacionCurso, cc.codigoAutorizacion, cc.autorizado, c.* from cliente_curso as cc inner join curso as c on cc.idCurso = c.idCurso where cc.idCliente = ? AND cc.idCurso = ?", [idCliente, idCurso]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}

export const modificarCursoCliente = async (req, res) => {
    const { idRelacion } = req.params;
    const { fechaFinalizacionCurso, finalizado, ultimaConexion } = req.body;

    try {
        
        const [result] = await pool.query("UPDATE cliente_curso SET fechaFinalizacionCurso = IFNULL(?, fechaFinalizacionCurso), finalizado = IFNULL(?, finalizado), ultimaConexion = IFNULL(?, ultimaConexion) WHERE idRelacion = ?", [fechaFinalizacionCurso, finalizado, ultimaConexion, idRelacion]);

        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });
        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}

export const activarCursoCliente = async (req, res) => {
    const { idRelacion } = req.params;
    const { codigoAutorizacion } = req.body;

    try {
        const [rows] = await pool.query ("SELECT * FROM cliente_curso WHERE idRelacion = ?", [idRelacion])

        const curso = rows[0];

        if(curso.codigoAutorizacion != codigoAutorizacion) return res.status(404).json({ "mensaje": "No ha sido posible activar el curso porque no coincide el codigo de autorización" })

        const [result] = await pool.query("UPDATE cliente_curso SET autorizado = 1 WHERE idRelacion = ?", [idRelacion])

        if( result.affectedRows <= 0 ) return res.status(404).json({ "mensaje" : "No se encontro ningun curso" });
        res.sendStatus(204);


    } catch (error) {
        res.status(500).json({"mensaje": "Algo salio mal", "error": error});
    }
}