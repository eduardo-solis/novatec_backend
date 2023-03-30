import { pool } from "../db.js";
import { generarCodigoAutorizacion } from "../lib/codigoAutorizacion.js";

// buscar todas las compras de 1 cliente
export const obtenerCompras_Cliente = async (req, res) => {

    const { idCliente } = req.params

    try {
        // Obteniendo todas las compras
        const [rows] = await pool.query("SELECT * FROM compra WHERE idCliente = ?", [idCliente]);

        // Obteniendo el detalle de cada compra
        for (let i = 0; i < rows.length; i++) {
            // Identificando la compra individual
            let compra = rows[i]

            // Buscando el detalle de dicha compra
            const resultDetalle = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [compra.idCompra])
            // Asignando el detalle dentro del objeto
            compra.detalleCompra = resultDetalle[0]

            // Asignando el objeto actualizado dentro del arreglo
            rows[i] = compra
        }
        res.json(rows)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

// buscar una de las compras de 1 cliente
export const obtenerCompraPorId_Cliente = async (req, res) => {

    const { idCompra, idCliente } = req.params

    try {
        // Obteniendo las compras del cliente
        const [rows] = await pool.query("SELECT * FROM compra WHERE idCliente = ?", [idCliente]);

        let compra = rows.find((c) => c.idCompra == idCompra)

        if (!compra) return res.sendStatus(404).json({ menssage: "no se encontro ninguna compra" })

        // Obteniendo el detalle de la compra
        const resultDetalle = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [idCompra])

        // Asignando el detalle dentro del objeto
        compra.detalleCompra = resultDetalle[0]

        res.json(compra)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

// registrar una compra
export const registrarCompra = async (req, res) => {

    const { idCliente, totalCompra, cursos } = req.body;
    /**
     * NOTA:
     *  los "cursos" son un arreglo de objetos
     *  el objeto luce de la siguiente forma: { idCurso : 1, precio : 15 }
     */

    try {
        // registrar la compra
        // - idCliente, fecha de compra y el total de la compra
        let new_date = new Date()
        let dia = new_date.getDate()
        let mes = new_date.getMonth() + 1
        let anio = new_date.getFullYear()

        let fechaActual = `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}/${anio}`
        // 0 - pendiente, 1 - pagada
        const resultCompra = await pool.query("INSERT INTO compra (idCliente, fechaCompra, totalCompra, estatus) value (?,?,?,?)", [idCliente, fechaActual, totalCompra, 0]);
        let idCompra = resultCompra[0].insertId;

        // registrar el detalle
        // - idCompra, idCurso, subtotal

        // refactorizando el arreglo de cursos
        let detalles = [];
        let relacion = [];
        for (let i = 0; i < cursos.length; i ++){
            
            let curso = cursos[i];

            let auxDetalle = [ idCompra, curso.idCurso, curso.precio ];
            detalles.push(auxDetalle);

            let codigo = generarCodigoAutorizacion(6)
            let auxRelacion = [idCliente, curso.idCurso, fechaActual, false, "", codigo, false]
            relacion.push(auxRelacion)


        }

        const resultDetalle = await pool.query("INSERT INTO detalle_compra (idCompra, idCurso, subtotal) values ?", [detalles])

        // registrar la relacion del cliente con el curso, asignando el codigo de autorizacion
        // - idCliente, idCurso, ultimaConexion(date), finalizado(false), fechaFinalizacionCurso(null), codigoAutorizacion(generar), autorizado(false)
        const resultRelacion = await pool.query("INSERT INTO cliente_curso (idCliente, idCurso, ultimaConexion, finalizado, fechaFinalizacionCurso, codigoAutorizacion, autorizado) values ?", [relacion])

        // Enviando la compra registrada
        // Obteniendo las compras del cliente
        const [rows] = await pool.query("SELECT * FROM compra WHERE idCompra = ?", [idCompra]);

        let compra = rows[0]

        if (!compra) return res.sendStatus(404).json({ menssage: "no se encontro ninguna compra" })

        // Obteniendo el detalle de la compra
        const resultDCompra = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [idCompra])

        // Asignando el detalle dentro del objeto
        compra.detalleCompra = resultDCompra[0]

        res.json(compra)


    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

export const autorizarCurso = async (req, res) => {

    const { idCurso } = req.params
    const { idCliente, codigo } = req.body

    try {

        // Buscar la relacion
        const [rows] = await pool.query("SELECT * FROM cliente_curso WHERE idCliente = ? AND idCurso = ?", [idCliente, idCurso])
        let dataRelacion = rows[0]

        // Comprar los codigos
        if (dataRelacion.codigoAutorizacion != codigo) return res.sendStatus(404).json({ message : "El codigo introducido no es valido" })

        // Actualizar la relacion (autorizado = true)
        const resultUpdate = await pool.query("UPDATE cliente_curso SET autorizado = ? WHERE idRelacion = ?", [true, dataRelacion.idRelacion])
        res.sendStatus(204)
        
    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

//--------------------------- ADMIN -----------------------------------
// buscar todas las compras
export const obtenerCompras_Admin = async (req, res) => {
    try {
        // Obteniendo todas las compras
        const [rows] = await pool.query("SELECT * FROM compra");

        // Obteniendo el detalle de cada compra
        for (let i = 0; i < rows.length; i++) {
            // Identificando la compra individual
            let compra = rows[i]

            // Buscando el detalle de dicha compra
            const resultDetalle = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [compra.idCompra])
            // Asignando el detalle dentro del objeto
            compra.detalleCompra = resultDetalle[0]

            // Asignando el objeto actualizado dentro del arreglo
            rows[i] = compra
        }
        res.json(rows)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

// buscar una compra
export const obtenerCompraPorId_Admin = async (req, res) => {

    const { idCompra } = req.params

    try {
        // Obteniendo la compra
        const [rows] = await pool.query("SELECT * FROM compra WHERE idCompra = ?", [idCompra]);

        let compra = rows[0]

        // Obteniendo el detalle de la compra
        const resultDetalle = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [idCompra])

        // Asignando el detalle dentro del objeto
        compra.detalleCompra = resultDetalle[0]

        res.json(compra)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }
}

// cambiar estatus de la compra y enviar codigo de acceso al curso
export const cambiarEstatusCompra = async(req, res) => {

    const { idCompra, estatus } = req.params

    try {
        
        // Cambiar es estatus de la compra a 1 (pagada)
        const [rows] = await pool.query("UPDATE compra SET estatus = ? WHERE idCompra = ?", [estatus, idCompra])
        if(rows.affectedRows == 0) return res.sendStatus(404).json({ message : "No se encontro ninguna compra" })
        res.sendStatus(204)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado \n ${error}`)
        res.sendStatus(500)
    }

}

export const obtenerCodigosDeAutorizacion = async (req, res) => {
    const { idCliente, idCompra } = req.params

    try {
        
        // Buscar el detalle de la compra
        const resultDetalle = await pool.query("SELECT * FROM detalle_compra WHERE idCompra = ?", [idCompra])
        let detalle = resultDetalle[0]

        // Obtener los cursos del detalle
        let cursos = [];
        for (let i = 0; i < detalle.length; i++) {
            const idCurso = detalle[i].idCurso;
            let [rows] = await pool.query("SELECT * FROM curso WHERE idCurso = ?", [idCurso])
            cursos.push(rows[0]) 
        }

        // Buscar su relacion y obtener el codigo de autorizacion
        for (let j = 0; j < cursos.length; j++) {
            let curso = cursos[j]
            const [rows] = await pool.query("SELECT * FROM cliente_curso WHERE idCliente = ? AND idCurso = ?", [idCliente, curso.idCurso])
            curso.codigoAuth = rows[0].codigoAutorizacion
            cursos[j] = curso
        }

        res.json(cursos)

    } catch (error) {
        console.debug(`Ha ocurrido un error inesperado\n ${error}`)
        res.sendStatus(500)
    }

}