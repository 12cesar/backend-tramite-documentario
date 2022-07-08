const { request, response } = require("express");
const funDate = require("../helpers/generar-fecha");
const {
  DetalleDestinoInterno,
  DestinoInterno,
  SeguimientoInterno,
  Documentointerno,
} = require("../models");

const getDetalleDestinoInterno = async (req = request, res = response) => {
  const detalle = await DetalleDestinoInterno.findAll();
  res.json({
    ok: true,
    detalle,
  });
};

const postDetalleDestinoInterno = async (req = request, res = response) => {
  try {
    const { envio, idDoc, ...data } = req.body;
    const { fecha, ano, hora } = funDate();
    const codTra = await DestinoInterno.findOne({
      where: {
        id: Number(idDoc),
      },
    });
    let modelo = {};
    switch (envio) {
      case "3":
        if (data.area) {
          const destino = await DestinoInterno.create({
            codigoTramite: codTra.codigoTramite,
            destinoArea: Number(data.area),
            accion: "",
          });
          const seguimiento = await SeguimientoInterno.create({
            fechaDerivado: fecha,
            horaDerivado: hora,
            codigoTramite: codTra.codigoTramite,
            idDestino: Number(data.area),
          });
        }
        if (data.codigoDoc) {
          modelo.codigoDocumento = data.codigoDoc;
          const document = await Documentointerno.update({
            envio:1
          },{
            where:{
                codigoDocumento:data.codigoDoc
            }
          })
        }
        if (data.observacion) {
          modelo.observacion = data.observacion;
        }
        const dest1 = await DestinoInterno.update(
          {
            atendido: 1,
          },
          {
            where: {
              id: Number(idDoc),
            },
          }
        );
        
        modelo.idDestino = Number(idDoc);
        modelo.fecha = fecha;
        modelo.idRespuesta = Number(envio);
        break;
      case "4":
        modelo.idDestino = Number(idDoc);
        modelo.fecha = fecha;
        modelo.idRespuesta = Number(envio);
        if (data.codigoDoc) {
          modelo.codigoDocumento = data.codigoDoc;
          const document = await Documentointerno.update({
            envio:1
          },{
            where:{
                codigoDocumento:data.codigoDoc
            }
          })
        }
        if (data.observacion) {
          modelo.observacion = data.observacion;
        }
        const dest2 = await DestinoInterno.update(
          {
            atendido: 1,
          },
          {
            where: {
              id: Number(idDoc),
            },
          }
        );
        
        break;
      case "5":
        if (data.observacion) {
          modelo.observacion = data.observacion;
        }
        modelo.idDestino = Number(idDoc);
        modelo.fecha = fecha;
        modelo.idRespuesta = Number(envio);
        break;
      default:
        break;
    }
    const detalleDestino = await DetalleDestinoInterno.create(modelo);
    res.json({
      ok: true,
      msg: "Respuesta Creada con exito",
      detalleDestino,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al responder el tramite, error: ${error}`,
    });
  }
};

module.exports = {
  getDetalleDestinoInterno,
  postDetalleDestinoInterno,
};
