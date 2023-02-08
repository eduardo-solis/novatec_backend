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
    const { rolesDelUsuario } = req.body;

    try{

        res.send(rolesDelUsuario)

    }catch(error){
        res.status(500).json({ message: "Algo salio mal", error: error })
    }
}