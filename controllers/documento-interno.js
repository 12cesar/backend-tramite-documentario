const { response, request } = require("express");
const { destinoArray, subirArchivoImg, uploadArchivo } = require("../helpers");
const { funcUserArea } = require("../helpers/fc-area");
const funDate = require("../helpers/generar-fecha");
const Userarea = require("../models/userarea");

const postDocumentoInterno = async (req = request, res = response) => {
  try {
    if (req.files) {
      const {destino,...data} = req.body;
      const {archivo} = req.files;
      await uploadArchivo(archivo);
      data.destino = destinoArray(destino);
      return res.json({
        ok: true,
        data
      });
    }
    if (!req.files) {
      const {destino,...data} = req.body;
      data.destino = destinoArray(destino);
      return res.json({
        ok: true,
        data
      });
    }
  } catch (error) {
      console.log(error);
    res.status(400).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  postDocumentoInterno,
};
