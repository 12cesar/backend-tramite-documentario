const { request, response } = require("express");
const {
  Tramiteinterno,
  Documentointerno,
  Documentoadjuntarinterno,
} = require("../models");

const getAnexoInterno = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const interno = await Documentointerno.findOne({
      where: {
        codigoDocumento: codigo,
      },
    });
    const anexo = await Documentoadjuntarinterno.findAll({
      where: {
        idDocumento: interno.id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra el pdf con exito",
      anexo,
    });
  } catch (error) {
    res.status(400).json({
      ok: true,
      msg: `Error al mostrar los anexos, ${error}`,
    });
  }
};

module.exports = {
  getAnexoInterno,
};
