const { subirArchivoImg } = require("./subir-archivo");


const destinoArray=(destino)=>{
    let destinos='';
      if (Array.isArray(destino)) {
          for (let i = 0; i < destino.length; i++) {
              destinos += destino[i]+`${(destino.length-1 === i) ? '':','}`;
          }
          return destinos;
      }else{
        destinos = destino;
        return destinos;
      }
}

const uploadArchivo = async(archivo) =>{
    if (Array.isArray(archivo)) {
        for (let i = 0; i < archivo.length; i++) {
          await subirArchivoImg({archivo:archivo[i]}, undefined, 'docinterno');
        
        }
    }else{
          await subirArchivoImg({archivo}, undefined, 'docinterno');
    }
}

module.exports = {
    destinoArray,
    uploadArchivo
}