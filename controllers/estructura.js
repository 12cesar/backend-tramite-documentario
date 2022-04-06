const { request, response } = require("express");
const Estructura = require("../models/estructura");

const getEstructuras = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

const getEstructura = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

const postEstructura = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const estructura = await Estructura.create({
      nombre: nomMay,
    });
    res.json({
      ok: true,
      estructura,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al ingresar la estructura, error: ${error}`,
    });
  }
};

const putEstructura = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

const deleteEstructura = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

module.exports = {
  getEstructuras,
  getEstructura,
  postEstructura,
  putEstructura,
  deleteEstructura,
};
