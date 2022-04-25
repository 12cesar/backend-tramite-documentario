const { request, response } = require("express");
const sunatApi = require("../apiAxios/apiDniRuc");

const postValidarSunat = async (req = request, res = response) => {
  try {
    const { tipo } = req.params;
    const { documento: numero } = req.body;
    let nombreCompleto = "";
    let nombre="";
    let apellido="";
    let documento = "";
    let direccion = "";
    let data = {};
    switch (tipo) {
      case "1":
        const resp = await sunatApi.get("/dni", {
          params: {
            numero,
          },
        });
        console.log(resp.data);
        nombreCompleto = `${resp.data.nombre}`;
        documento = `${resp.data.numeroDocumento}`;
        direccion = `${resp.data.direccion}`;
        apellido = `${resp.data.apellidoPaterno} ${resp.data.apellidoMaterno}`,
        nombre = `${resp.data.nombres}`
        data = {
          nombreCompleto,
          documento,
          direccion,
          apellido,
          nombre
        }
        return res.json({
          ok: true,
          data,
        });
      case "2":
        const resp1 = await sunatApi.get("/ruc", {
          params: {
            numero,
          },
        });
        nombreCompleto = `${resp1.data.nombre}`;
        documento = `${resp1.data.numeroDocumento}`;
        direccion = `${resp1.data.direccion}`;
        data = {
          nombreCompleto,
          documento,
          direccion
        }
        return res.json({
          ok: true,
          data,
        });
      default:
        break;
    }
    
    
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
