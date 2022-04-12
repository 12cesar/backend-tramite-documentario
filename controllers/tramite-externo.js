const { response, request } = require("express");
const { Tramiteexterno } = require("../models");

const getTramiteExternos = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const getTramiteExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const postTramiteExterno = async (req = request, res = response) => {
  try {
    const data = req.body;
    const countExter = await Tramiteexterno.count();
    data.codigo = `${countExter+1}`;
    data.estadoTramite = 1;
    const tramiteexter = new Tramiteexterno(data);
    res.json({
      ok: true,
      data,
      countExter,
      tramiteexter
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el tramite externo, error: ${error}`,
    });
  }
};
const putTramiteExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const deleteTramiteExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

module.exports = {
  getTramiteExternos,
  getTramiteExterno,
  postTramiteExterno,
  putTramiteExterno,
  deleteTramiteExterno,
};
