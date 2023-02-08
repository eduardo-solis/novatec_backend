import bcryptjs from 'bcryptjs'

export const protegerContrasenia = async ( contrasenia ) => {

    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(contrasenia, salt)

}

export const compararContrasenia = async (contrasenia, contraseniaProtegida) => {

    return await bcryptjs.compare(contrasenia, contraseniaProtegida)

}