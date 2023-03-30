import { pool } from "../db.js";

export const obtenerRolesUsuario = async (req, res, next) => {

    const { id } = req.params;

    const resultRolesUsuario = await pool.query("select r.idRol as idRol, r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [id])
    req.body.rolesDelUsuario = resultRolesUsuario[0]

    next();


}