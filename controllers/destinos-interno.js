const { request, response } = require("express");
const funDate = require("../helpers/generar-fecha");
const { DestinoInterno, Tramiteinterno, SeguimientoInterno } = require("../models");

const getDestinosInternos = async (req = request, res = response) => {
  try {
    const idArea = req.idArea;
    const { atendido } = req.query;
    const destinos = await DestinoInterno.findAll({
      include: [
          {
              model:Tramiteinterno
          }
      ],
      where: {
        destinoArea: idArea,
        atendido,
      },
    });
    res.json({
      ok: true,
      msg: "Destinos mostrado con exito",
      destinos,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const getDestinosInterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const postDestinosInterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const putDestinosInterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const deleteDestinosInterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

const recepcionarDestinosInterno = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {ano,fecha,hora} = funDate();
    const destinos = await DestinoInterno.update({
        estadoRecepcion:1
    },{where:{
      id
    }});
    const seguimiento = await SeguimientoInterno.update({
      fechaRecepcion:fecha,
      horaRecepcion:hora
    },{
      where:{
        idDestino:id
      }
    });
    res.json({
      ok: true,
      msg:'Tramite recepcionado con exito',
      destinos
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error al recepcionar el tramite interno`,
      error
    })
  }
  };

module.exports = {
  getDestinosInternos,
  getDestinosInterno,
  postDestinosInterno,
  putDestinosInterno,
  deleteDestinosInterno,
  recepcionarDestinosInterno
};
