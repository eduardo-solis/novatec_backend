import { pool } from "../db.js";

export const obtenerRoles = async (req, res) => {

    try{

        const [rows] = await pool.query("SELECT * FROM rol");
        res.send(rows)

    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error })
    }

}

export const cambiarRolesUsuario = async(req, res) => {
    const { id } = req.params;
    const { roles } = req.body;

    try{

        let rolesPreparados = []

        for (let i = 0; i < roles.length; i++){
            const [rows] = await pool.query("select * from rol where nombre = ?", [roles[i]])
            rolesPreparados.push([Number(id), rows[0].idRol])
        }

        const resultDelete = await pool.query("DELETE FROM usuario_rol WHERE idUsuario = ?", [id])
        const resultAdd = await pool.query("insert into usuario_rol (idUsuario, idRol) values ?", [rolesPreparados])

        const [rows] = await pool.query("select r.nombre as rol from rol as r join usuario_rol as ur on r.idRol = ur.idRol where ur.idUsuario = ?", [id])

        let datos = []
        for(let j = 0; j < rows.length; j++){
            datos.push(rows[j].rol)
        }

        res.json(datos)

    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error })
    }
}