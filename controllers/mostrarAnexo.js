const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const { Documentoadjuntarinterno } = require("../models");

const getMostrarAnexInter = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const anexo = await Documentoadjuntarinterno.findOne({
      where: {
        id,
      },
    });

    const pathPdf = path.join(
      __dirname,
      "../uploads/",
      "documentoInterno",
      anexo.archivo
    );
    if (fs.existsSync(pathPdf)) {
      return res.sendFile(pathPdf);
    }
  } catch (error) {
    res.status(400).json({
        ok:false,
        msg:`Error al mostrar el documento, ${error}`
    })
  }
};

module.exports = {
  getMostrarAnexInter,
};
