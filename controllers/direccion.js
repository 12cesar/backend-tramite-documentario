const { response } = require("express");
const { request } = require("express");
const {Direccion } = require("../models");

const getDireccions = async (req = request, res = response) => {
  try {
    const {unblock} = req.query;
    const direccion = await Direccion.findAll({where:{habilitado:Number(unblock)}});
    res.json({
      ok: true,
      msg: "Se mostro con exito las direcciones",
      direccion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar las direcciones error: ${error}`,
    });
  }
};

const getDireccion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const direccion = await Direccion.findByPk(id);
    res.json({
      ok: true,
      direccion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar las direcciones error: ${error}`,
    });
  }
};
const postDireccion = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const direccion = await Direccion.create({
      nombre: nomMay,
    });
    res.json({
      ok: true,
      msg: "direccion creado con exito",
      direccion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede registrar el direccion, error: ${error}`,
    });
  }
};
const putDireccion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const direccion = await Direccion.update(
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
      direccion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el direccion, Error: ${error}`,
    });
  }
};

const deleteDireccion = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {unblock} = req.query;
    const direccion = await Direccion.update({
        habilitado:Number(unblock)
    },{
        where:{
            id
        }
    })
    res.json({
        ok:true,
        msg: Number(unblock)===1 ? 'direccion desbloqueado con exito' : 'direccion bloqueado con exito',
        direccion
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg:`Error al eliminar el direccion, Error: ${error}`
    });
  }
};

module.exports = {
  getDireccions,
  getDireccion,
  postDireccion,
  putDireccion,
  deleteDireccion,
};
