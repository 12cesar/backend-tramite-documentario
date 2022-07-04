const { request, response } = require("express");
const { subirArchivoImg } = require("../helpers");
const { Documentofirmainterno, Documentointerno } = require("../models");

const postFirmaDocumento = async (req = request, res = response) => {
  try {
    const { codigo } = req.body;
    let modelo = {};

    modelo.archivo = await subirArchivoImg(req.files, ["pdf"], "firmainterno");
    modelo.idDocumento = codigo;
    const firma = await Documentofirmainterno.create(modelo);
    const estadoFirma = await Documentointerno.update({
        estadoFirma:1
    },{
        where:{
            id:codigo
        }
    });
    res.json({
      ok: true,
      msg: "Se subio el documento firmado correctamente",
      firma,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "Se subio el documento firmado correctamente",
      firma,
    });
  }
};

module.exports = {
  postFirmaDocumento,
};
