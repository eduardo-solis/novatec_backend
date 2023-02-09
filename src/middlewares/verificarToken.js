import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'

import { pool } from '../db.js';

export const verificarToken = async (req, res, next) => {

    const token = req.headers["x-access-token"];

    try {

        if (!token) return res.status(401).json({ acceso: false, message: "No se encontro el token" })

        const decoded = jwt.verify(token, SECRET);

        const [rows] = await pool.query("SELECT * FROM usuario WHERE idUsuario = ?", [decoded.idUsuario])

        const dataUser = rows[0]

        const resultRolesUsuario = await pool.query("select r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [dataUser.idUsuario])
        const dataRoles = resultRolesUsuario[0]

        dataUser.roles = dataRoles.map((item) => item.rol)

        req.body.usuario = dataUser;
        
        next();
    }
    catch (error) {
        res.status(404).json({ acceso: false, message: "El token ha expirado" })
    }

}