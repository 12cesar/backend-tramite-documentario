const { request, response } = require("express");
const { TipoEnvio } = require("../models");

const getTipoEnvio = async (req = request, res = response) => {
  try {
    const tipoenvio = await TipoEnvio.findAll();
    res.json({
      ok: true,
      msg: "Tipo de envio mostrado con exito",
      tipoenvio,
    });
  } catch (error) {
    res.status(400).json({
        ok:false,
        msg:`Error al mostrar el tipo de envio, error: ${error}`
    })
  }
};

module.exports = {
  getTipoEnvio,
};
