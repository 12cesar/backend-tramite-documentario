const { request, response } = require("express");
const { Estadotramite } = require("../models");

const getEstadoTramites = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const estadotramite = await Estadotramite.findAll({
      where: {
        habilitado: Number(habilitado),
      },
    });
    res.json({
      ok: true,
      msg: "Estados del tramite mostrado con exito",
      estadotramite,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los estados del tramite, Error: ${error}`,
    });
  }
};
const getEstadoTramite = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const estadotramite = await Estadotramite.findByPk(id);
    res.json({
      ok: true,
      msg: "Estado de tramite mostrado con exito",
      estadotramite,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los estados del tramite, Error: ${error}`,
    });
  }
};
const postEstadoTramite = async (req = request, res = response) => {
  try {
    const { nombre, estado } = req.body;
    const nomMay = nombre.toUpperCase();
    const estMay = estado.toUpperCase();
    const estadotramite = await Estadotramite.create({
      nombre: nomMay,
      estado: estMay,
    });
    res.json({
      ok: true,
      msg: "Estado de tramite creado con exito",
      estadotramite,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el estado de tramite, Error: ${error}`,
    });
  }
};
const putEstadoTramite = async (req = request, res = response) => {
  try {
    const { nombre, estado } = req.body;
    const { id } = req.params;
    const nomMay = nombre.toUpperCase();
    const estMay = estado.toUpperCase();
    const estadotramite = await Estadotramite.update(
      {
        nombre:`${nomMay}`,
        estado: estMay,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      nomMay,
      msg: "Estado de tramite actualizado con exito",
      estadotramite
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el estado de tramite, Error: ${error}`,
    });
  }
};
const deleteEstadoTramite = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const { id } = req.params;
    const estadotramite = await Estadotramite.update(
      {
        habilitado: Number(habilitado),
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      msg:
        Number(habilitado) === 1
          ? "Estado de tramite desbloqueado con exito"
          : "Estado de tramite bloqueado con exito",
      estadotramite,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: `Error al eliminar el estado de tramite, Error: ${error}`,
    });
  }
};

module.exports = {
  getEstadoTramites,
  getEstadoTramite,
  postEstadoTramite,
  putEstadoTramite,
  deleteEstadoTramite,
};
