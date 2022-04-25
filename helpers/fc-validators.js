
function mayusPrimeraCadena(cadena,separador) {
    const arrayDeCadena = cadena.split(separador);
    let result = '';
    for (let i = 0; i < arrayDeCadena.length; i++) {
        result += arrayDeCadena[i][0].toUpperCase() + arrayDeCadena[i].slice(1).toLowerCase() + " ";
    }
    const title = result.substring(0, result.length - 1);
    return title;
}

function mayusPrimeraLetra(cadena){
    const primero = cadena.charAt(0).toUpperCase();
    const segundo = cadena.slice(1);
    const descripcion = primero+segundo;
    return descripcion;
}

function siglaFun(nombre){
    const separador = nombre.split(' ');
    const remove = separador.filter((item) => item !== 'de' && item !=='y' && item!=='en' && item !== ',');
    let sigla = "";
    console.log(sigla);
    for (let i = 0; i < remove.length; i++) {
        sigla += remove[i].charAt(0).toUpperCase();
            
    }
    console.log(sigla);
    return sigla;
}

module.exports = {
    mayusPrimeraCadena,
    mayusPrimeraLetra,
    siglaFun
}