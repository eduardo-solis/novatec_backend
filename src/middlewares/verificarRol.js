
// Roles de la base de datos
const ROLES = [ "cliente", "empleado", "administrador" ];

export const verificarEsUsuario = (req, res, next) => {

    const { usuario } = req.body;
    if (usuario.roles.includes(ROLES[0])) return next();

    res.status(400).json({ message: "El usuario no cuenta con el permiso requerido para realizar esta acción" });

}

export const verificarEsEmpleadoAdmin = (req, res, next) => {

    const { usuario } = req.body;
    for ( let i = 0; usuario.roles.length; i++ ){
        if ( ROLES[1] == usuario.roles[i] || ROLES[2] == usuario.roles[i] ) return next();
    }

    res.status(400).json({ message: "El usuario no cuenta con el permiso requerido para realizar esta acción" });
}

export const verificarEsAdmin = (req, res, next) => {
    const { usuario } = req.body;
    if (usuario.roles.includes(ROLES[2])) return next();

    res.status(400).json({ message: "El usuario no cuenta con el permiso requerido para realizar esta acción" });
}