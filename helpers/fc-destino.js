const { Model } = require("sequelize");
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

const uploadArchivo = async(archivo,clase=Model, iddoc, carpeta) =>{
    try {
        if (Array.isArray(archivo)) {
            for (let i = 0; i < archivo.length; i++) {
              const nombre  = await subirArchivoImg({archivo:archivo[i]}, undefined, carpeta);
              const docAnexo = await clase.create({
                  idDocumento:iddoc,
                  archivo: nombre
              });
            }
        }else{
              const nombre = await subirArchivoImg({archivo}, undefined, carpeta);
              const docAnexo = await clase.create({
                idDocumento:iddoc,
                archivo: nombre
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    destinoArray,
    uploadArchivo
}