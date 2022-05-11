const path = require('path');
const { v4: uuidv4 } = require('uuid');
const subirArchivoImg = (files, extensionesValidas=['pdf','docx', 'xlsx','pptx'], carpeta= '') =>{
  
  
    return new Promise((resolve, reject)=>{

        const {archivo} = files;
  
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
      
        // Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, deber ser de tipo ${extensionesValidas}`)
        }
      
        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);
      
        archivo.mv(uploadPath,  (err) => {
          if (err) {
            reject(err)
          }
      
          resolve(nombreTemporal);
        });
    });
    
}

module.exports = {
    subirArchivoImg
}