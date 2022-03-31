const { request, response } = require("express");
const { Estadodocumento } = require("../models");

const getEstadoDocumentos = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const estadodocumento = await Estadodocumento.findAll({
      where: {
        habilitado: Number(habilitado),
      },
    });
    res.json({
      ok: true,
      msg: "Estados del documento mostrado con exito",
      estadodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los estados del documento, Error: ${error}`,
    });
  }
};

const getEstadoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const estadodocumento = await Estadodocumento.findByPk(id);
    res.json({
      ok: true,
      msg: "Estado de documento mostrado con exito",
      estadodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostra el Estado de documento, Error: ${error}`,
    });
  }
};
const postEstadoDocumento = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const estadodocumento = await Estadodocumento.create({
      nombre: nomMay,
    });
    res.json({
      ok: true,
      msg: "Estado de documento creado con exito",
      estadodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el estado de documento, Error: ${error}`,
    });
  }
};
const putEstadoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const estadodocumento = await Estadodocumento.update(
      {
        nombre: nomMay,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      msg: "Estado de documento actualizado con exito",
      estadodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el estado de documento, Error: ${error}`,
    });
  }
};
const deleteEstadoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.params;
    const estadodocumento = await Estadodocumento.update(
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
          ? "Estado de documento desbloqueado con exito"
          : "Estado de documento bloqueado con exito",
      estadodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el estado de documento, Error: ${error}`,
    });
  }
};

module.exports = {
  getEstadoDocumentos,
  getEstadoDocumento,
  postEstadoDocumento,
  putEstadoDocumento,
  deleteEstadoDocumento,
};
