const { response, request } = require("express");
const { Tipopersona } = require("../models");

const getTipoPersonas = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const tipopersona = await Tipopersona.findAll({
      where: {
        habilitado,
      },
    });
    res.json({
      ok: true,
      msg: "Tipos de personas mostrado con exito",
      tipopersona,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar todos los tipos de personas, Error: ${error}`,
    });
  }
};

const getTipoPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const tipopersona = await Tipopersona.findByPk(id);
    res.json({
      ok: true,
      msg: "Tipo de persona mostrado con exito",
      tipopersona,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar el tipo de persona, Erro: ${error}`,
    });
  }
};

const postTipoPersona = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const tipopersona = await Tipopersona.create({ nombre: nomMay });
    res.json({
      ok: true,
      msg: "Tipo de persona creado con exito",
      tipopersona,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el tipo de persona Error: ${error}`,
    });
  }
};

const putTipoPersona = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const { id } = req.params;
    const nomMay = nombre.toUpperCase();
    const tipopersona = await Tipopersona.update(
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
      msg: "Tipo de persona ctualizado con exito",
      tipopersona,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el tipo de persona, Error: ${error}`,
    });
  }
};

const deleteTipoPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const tipopersona = await Tipopersona.update(
      {
        habilitado,
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
          ? "tipo de persona desbloqueado"
          : "tipo de persona bloqueado",
      tipopersona,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al habilitar/deshabilitar el tipo de persona, Error: ${error}`,
    });
  }
};

module.exports = {
  getTipoPersonas,
  getTipoPersona,
  postTipoPersona,
  putTipoPersona,
  deleteTipoPersona,
};
