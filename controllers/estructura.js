const { request, response } = require("express");
const Estructura = require("../models/estructura");

const getEstructuras = async (req = request, res = response) => {
  try {
    const estructura = await Estructura.findAll();
    res.json({
      ok: true,
      msg: "Estructuras mostradas con exito",
      estructura,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar las estructuras, error: ${error}`,
    });
  }
};

const getEstructura = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const estructura = await Estructura.findByPk(id);
    res.json({
      ok: true,
      msg: "Estructura mostrada con exito",
      estructura,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar la estructura, error: ${error}`,
    });
  }
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
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const estructura = await Estructura.update(
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
      msg: "Estructura actualizada con exito",
      estructura,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar la estructura, error: ${error}`,
    });
  }
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
