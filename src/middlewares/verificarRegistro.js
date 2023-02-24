import { pool } from "../db.js";

const ROLES = [ "cliente", "staff", "administrador" ];

export const verificarRegistroDuplicado = async (req, res, next) => {

    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ?", [req.body.correo])
    const usuarioEncontrado = rows[0];

    if(usuarioEncontrado) return res.status(400).json({ message: `Ya existe un usuario con el correo: ${usuarioEncontrado.correo}` })

    next();

}

export const verificarExistenciaRegistro = async(req, res, next) => {

    const [rows] = await pool.query("SELECT * FROM usuario WHERE idUsuario = ?", [req.params.id]);

    if(rows.length == 0) return res.status(400).json({ message: "No se encontro a ningun usuario" });

    req.body.estatus = rows[0].estatus

    next();

}

export const verificarExistenciaUsuario = async (req, res, next) => {

    const [rows] = await pool.query("select * from usuario where correo = ?", [req.body.correo]);
    
    if (rows.length == 0) return res.status(404).json("El correo no existe");

    req.body.usuario = rows[0];

    next();

}


export const verificarExistenciaRoles = (req, res, next) => {

    const { roles } = req.body;

    if ( roles ){

        for( let i = 0; i < roles.length; i++ ){
            if ( !ROLES.includes(roles[i]) ) {
                return res.status(400).json({ message: `El rol ${roles[i]} no existe` })
            }
        }

    }

    next();

}