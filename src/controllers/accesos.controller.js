import jwt from "jsonwebtoken";

import { pool } from "../db.js";
import { protegerContrasenia, compararContrasenia } from '../lib/contrasenia.js';
import { SECRET } from "../config.js";

export const registrarCliente = async (req, res) => {

    const { nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contrasenia } = req.body
    
    try {

        const contraseniaProtegida = await protegerContrasenia(contrasenia)

        const [rows] = await pool.query("INSERT INTO usuario (nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contrasenia) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contraseniaProtegida]);

        if (!rows.insertId) return res.status(400).json({ message: "No se ha podido registrar al usuario" });

        await pool.query("INSERT INTO usuario_rol (idUsuario, idRol) value (?,?)", [rows.insertId, 1]);

        const token = jwt.sign({ idUsuario: rows.insertId }, SECRET, { expiresIn: 86400 });

        res.json({ acceso: true, token });

    } catch (error) {
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}

export const accederAlSistema = async (req, res) => {

    const { contrasenia, usuario } = req.body;

    try{

        const validacionContrasenia = await compararContrasenia(contrasenia, usuario.contrasenia);

        if ( !validacionContrasenia ) return res.status(401).json({ acceso: false, token: null });

        const token = jwt.sign({ idUsuario: usuario.idUsuario }, SECRET, { expiresIn: 86400 })

        res.json({ acceso: true, token });

    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error });
    }

}

export const perfil = async (req, res) => {
    const { usuario } = req.body;

    try{
        res.send(usuario);
    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error });
    }
}