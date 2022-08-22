const { request, response } = require("express");
const {
  RespuestaTramite,
  Documentointerno,
  Documentoadjuntarinterno,
} = require("../models");

const getRespuestaInterno = async (req = request, res = response) => {
  const respuesta = await RespuestaTramite.findAll();
  res.json({
    ok: false,
    respuesta,
  });
};

const getDocumentosAnexosRespuesta = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;

    const { id } = await Documentointerno.findOne({
      where: {
        codigoDocumento: codigo,
      },
    });
    const anexo = await Documentoadjuntarinterno.findAll({
      where: {
        idDocumento: Number(id),
      },
    });
    res.json({
      ok: false,
      anexo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  getRespuestaInterno,
  getDocumentosAnexosRespuesta,
};
