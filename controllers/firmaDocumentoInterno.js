const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const { subirArchivoImg } = require("../helpers");
const { Documentofirmainterno, Documentointerno } = require("../models");

const getFirmaDocumento = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const firma = await Documentointerno.findOne({
      where: {
        codigoDocumento: codigo,
      },
    });
    const docFirmado = await Documentofirmainterno.findOne({
      where: {
        idDocumento: firma.id,
      },
    });
    const pathPdf = path.join(
      __dirname,
      "../uploads/",
      "firmainterno",
      docFirmado.archivo
    );
    if (fs.existsSync(pathPdf)) {
      return res.sendFile(pathPdf);
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar el documento Firmado, ${error}`,
    });
  }
};

const postFirmaDocumento = async (req = request, res = response) => {
  try {
    const { codigo } = req.body;
    let modelo = {};

    modelo.archivo = await subirArchivoImg(req.files, ["pdf"], "firmainterno");
    modelo.idDocumento = codigo;
    const firma = await Documentofirmainterno.create(modelo);
    const estadoFirma = await Documentointerno.update(
      {
        estadoFirma: 1,
      },
      {
        where: {
          id: codigo,
        },
      }
    );
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
  getFirmaDocumento,
};
