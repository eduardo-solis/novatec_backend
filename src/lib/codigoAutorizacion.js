
export const generarCodigoAutorizacion = ( longitud ) => {

    let codigo = ""

    for(let i = 0; i < longitud; i++){
        let numRandom = Math.random() * 10
        numRandom = numRandom.toFixed(0)

        if(numRandom >= 10){
            numRandom = numRandom - 1
        }

        //console.log(numRandom);
        codigo += `${numRandom}`
    }

    console.log(codigo);

}
