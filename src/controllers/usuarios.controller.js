import { pool } from "../db.js";
import { protegerContrasenia } from "../lib/contrasenia.js";

export const obtenerUsuarios = async (req, res) => {

    try {

        const resultUsuarios = await pool.query("SELECT * FROM usuario");

        const dataUsers = resultUsuarios[0]

        for (let i = 0; i < dataUsers.length; i++) {

            const dataUser = dataUsers[i]

            const resultRolesUsuario = await pool.query("select r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [dataUser.idUsuario])
            const dataRoles = resultRolesUsuario[0]

            dataUser.roles = dataRoles.map((item) => item.rol)
        }

        res.json(dataUsers)

    } catch (error) {
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}

export const obtenerUsuarioPorId = async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT * FROM usuario WHERE idUsuario = ?", [req.params.id])

        const dataUser = rows[0]

        const resultRolesUsuario = await pool.query("select r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [dataUser.idUsuario])
        const dataRoles = resultRolesUsuario[0]

        dataUser.roles = dataRoles.map((item) => item.rol)

        res.json(dataUser)

    } catch (error) {
        res.status(500).json({ message: "Algo salio mal", error: error })
    }
}

export const crearUsuario = async (req, res) => {

    const { nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contrasenia, roles } = req.body

    try {

        const contraseniaProtegida = await protegerContrasenia(contrasenia)
        console.log(contraseniaProtegida)

        if (!roles) {
            roles = ["cliente"]
        }

        const [rows] = await pool.query("INSERT INTO usuario (nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contrasenia) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contraseniaProtegida]);

        if (!rows.insertId) return res.status(400).json({ message: "No se ha podido registrar al usuario" });

        const idUsuario = rows.insertId;
        const rolesPreparados = [];

        for (let i = 0; i < roles.length; i++) {

            let [rows] = await pool.query("SELECT * FROM rol WHERE nombre = ?", [roles[i]])
            let auxValue = [idUsuario, rows[0].idRol]

            rolesPreparados.push(auxValue)
        }

        await pool.query("INSERT INTO usuario_rol (idUsuario, idRol) values ?", [rolesPreparados])

        res.send({
            idUsuario: rows.insertId,
            nombre,
            primerApellido,
            segundoApellido,
            ultimoGradoEstudio,
            fechaNac,
            genero,
            curp,
            telefono,
            imagen,
            correo,
            contrasenia,
            estatus: 1,
            roles
        })

    } catch (error) {
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}

export const modificarUsuario = async (req, res) => {

    const { id } = req.params;
    const { nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contrasenia } = req.body;

    let contraseniaProtegida = null

    try {
        if (contrasenia) {
            contraseniaProtegida = await protegerContrasenia(contrasenia)
        }

        const [result] = await pool.query("UPDATE usuario SET nombre = IFNULL(?, nombre), primerApellido = IFNULL(?, primerApellido), segundoApellido = IFNULL(?, segundoApellido), ultimoGradoEstudio = IFNULL(?, ultimoGradoEstudio), fechaNac = IFNULL(?, fechaNac), genero = IFNULL(?, genero), curp = IFNULL(?, curp), telefono = IFNULL(?, telefono), imagen = IFNULL(?, imagen), correo = IFNULL(?, correo), contrasenia = IFNULL(?, contrasenia) WHERE idUsuario = ?", [nombre, primerApellido, segundoApellido, ultimoGradoEstudio, fechaNac, genero, curp, telefono, imagen, correo, contraseniaProtegida, id])

        // Proceso para enviar los datos actualizados
        const [rows] = await pool.query("SELECT * FROM usuario WHERE idUsuario = ?", [id])

        const dataUser = rows[0]

        const resultRolesUsuario = await pool.query("select r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [dataUser.idUsuario])
        const dataRoles = resultRolesUsuario[0]

        dataUser.roles = dataRoles.map((item) => item.rol)

        res.json(dataUser)

    } catch (error) {
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}

export const modificarEstatusUsuario = async (req, res) => {

    const { id } = req.params;
    const { estatus } = req.body;

    let sql = ""

    try{

        if(estatus == 1){// Esta activo el registro
            sql = "UPDATE usuario SET estatus = 0 WHERE idUsuario = ?"
        }
        else{
            sql = "UPDATE usuario SET estatus = 1 WHERE idUsuario = ?"
        }

        const [result] = await pool.query(sql, [id]);
        res.sendStatus(204);

    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}