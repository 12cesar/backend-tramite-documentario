const { request, response } = require("express");
const sunatApi = require("../apiAxios/apiDniRuc");

const postValidarSunat = async (req = request, res = response) => {
  try {
    const { tipo } = req.params;
    const { documento: numero } = req.body;
    let nombre = "";
    let documento = "";
    let direccion = "";
    switch (tipo) {
      case "1":
        const resp = await sunatApi.get("/dni", {
          params: {
            numero,
          },
        });
        nombre = `${resp.data.nombre}`;
        documento = `${resp.data.numeroDocumento}`;
        direccion = `${resp.data.direccion}`;
        break;
      case "2":
        const resp1 = await sunatApi.get("/ruc", {
          params: {
            numero,
          },
        });
        nombre = `${resp1.data.nombre}`;
        documento = `${resp1.data.numeroDocumento}`;
        direccion = `${resp1.data.direccion}`;
        break;
      default:
        break;
    }
    const data = {
        nombre,
        documento,
        direccion
    }
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
        ok: false,
        msg:`Error al validar el documento de identidad`,
    });
  }
};

module.exports = {
  postValidarSunat,
};
