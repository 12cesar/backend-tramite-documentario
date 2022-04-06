const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const { subirArchivoImg } = require("../helpers/subir-archivo");
const { Estructura } = require("../models")

const putUploadEstructura = async (req = request, res = response) => {
  const { coleccion, id } = req.params;

  //const subirImg = await subirArchivoImg(req.files,['png','jpg', 'jpeg'],'estructura');
  let modelo;
  switch (coleccion) {
    case "diresa":
      modelo = await Estructura.findByPk(id);
      if (!modelo) {
        return res.status(400).json({
          ok:false,
          msg:`No existe una estructura con el id: ${id}`
        })
      }
      if (modelo.logoDiresa) {
        const pathImagen = path.join(__dirname,'../uploads/','estructura', modelo.logoDiresa);
        if (fs.existsSync(pathImagen)) {
          fs.unlinkSync(pathImagen);
        }
      }
      modelo.logoDiresa = await subirArchivoImg(req.files,undefined,'estructura');
      break;
    case "gobierno":
      modelo = await Estructura.findByPk(id);
      if (!modelo) {
        return res.status(400).json({
          ok:false,
          msg:`No existe una estructura con el id: ${id}`
        })
      }
      if (modelo.logoGobierno) {
        const pathImagen = path.join(__dirname,'../uploads/','estructura', modelo.logoGobierno);
        if (fs.existsSync(pathImagen)) {
          fs.unlinkSync(pathImagen);
        }
      }
      modelo.logoGobierno = await subirArchivoImg(req.files,undefined,'estructura');
      break;
    default:
      return res.status(500).json({
        ok:false,
        msg:'Se me olvido validar esto'
      })
  }
  //Limpiar imagenes previas
  await modelo.save();
  res.json({
    ok: true,
    msg:'Imagen actualizada con exito',
    modelo
  });
};

module.exports = {
  putUploadEstructura,
};
