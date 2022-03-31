const { request, response } = require("express");
const { Tipodocumento } = require("../models");

const getTipoDocumentos = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const tipodocumento = await Tipodocumento.findAll({
      where: {
        habilitado: Number(habilitado),
      },
    });
    res.json({
      ok: true,
      msg: "Tipos de documentos mostrado con exito",
      tipodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los tipos de documentos, Error: ${error}`,
    });
  }
};
const getTipoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const tipodocumento = await Tipodocumento.findByPk(id);
    res.json({
      ok: true,
      msg: "Tipo de documento mostrado con exito",
      tipodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostra el tipo de documento, Error: ${error}`,
    });
  }
};
const postTipoDocumento = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const tipodocumento = await Tipodocumento.create({
      nombre: nomMay,
    });
    res.json({
      ok: true,
      msg: "Tipo de documento creado con exito",
      tipodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el tipo de documento, Error: ${error}`,
    });
  }
};
const putTipoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const tipodocumento = await Tipodocumento.update(
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
      msg: "Tipo de documento actualizado con exito",
      tipodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el tipo de documento, Error: ${error}`,
    });
  }
};
const deleteTipoDocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.params;
    const tipodocumento = await Tipodocumento.update(
      {
        habilitado: Number(habilitado),
      },
      {
        where: {
          id
        },
      }
    );
    res.json({
      ok: true,
      msg: Number(habilitado) === 1 ? 'Tipo de documento desbloqueado con exito' :'Tipo de documento bloqueado con exito',
      tipodocumento,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el tipo de documento, Error: ${error}`,
    });
  }
};

module.exports = {
  getTipoDocumentos,
  getTipoDocumento,
  postTipoDocumento,
  putTipoDocumento,
  deleteTipoDocumento,
};
