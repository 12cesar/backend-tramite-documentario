const { response } = require("express");
const { request } = require("express");
const { siglaFun } = require("../helpers/fc-validators");
const { Area, Direccion } = require("../models");

const getAreas = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const area = await Area.findAll({
        include:{
            model:Direccion,
            attributes:['id','nombre']
        },
        where: { 
            habilitado: Number(habilitado) 
        }
    });
    res.json({
      ok: true,
      msg: "Se mostro con exito las Areas",
      area,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar las Areaes error: ${error}`,
    });
  }
};

const getArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const area = await Area.findByPk(id,{
        include:{
            model:Direccion,
            attributes:['id','nombre']
        }
    });
    res.json({
      ok: true,
      area,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar las Areaes error: ${error}`,
    });
  }
};
const postArea = async (req = request, res = response) => {
  try {
    const { nombre, descripcion, textoNumeracion, idDireccion } = req.body;
    const sigla = siglaFun(nombre);
    const nomMay = nombre.toUpperCase();
    const textNum = textoNumeracion.toUpperCase();
    const area = await Area.create({
      nombre: nomMay,
      descripcion,
      sigla,
      textoNumeracion:textNum,
      idDireccion,
    });
    res.json({
      ok: true,
      msg: "Area creado con exito",
      area
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede registrar el Area, error: ${error}`,
    });
  }
};
const putArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, sigla, idDireccion } = req.body;
    const sigMay = sigla.toUpperCase();
    const nomMay = nombre.toUpperCase();
    const area = await Area.update(
      {
        nombre: nomMay,
        descripcion,
        sigla: sigMay,
        idDireccion,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      area,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el Area, Error: ${error}`,
    });
  }
};

const deleteArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const area = await Area.update(
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
          ? "Area desbloqueado con exito"
          : "Area bloqueado con exito",
      area,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al eliminar el Area, Error: ${error}`,
    });
  }
};

module.exports = {
  getAreas,
  getArea,
  postArea,
  putArea,
  deleteArea,
};
