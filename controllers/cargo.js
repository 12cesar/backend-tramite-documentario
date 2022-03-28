const { response } = require("express");
const { request } = require("express");
const { Cargo } = require("../models");

const getCargos = async (req = request, res = response) => {
  try {
    const {unblock} = req.query;
    const cargo = await Cargo.findAll({where:{habilitado:Number(unblock)}});
    res.json({
      ok: true,
      msg: "Se mostro con exito los cargos",
      cargo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar los cargos error: ${error}`,
    });
  }
};

const getCargo = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findByPk(id);
    res.json({
      ok: true,
      cargo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede mostrar los cargos error: ${error}`,
    });
  }
};
const postCargo = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const cargo = await Cargo.create({
      nombre: nomMay,
    });
    res.json({
      ok: true,
      msg: "Cargo creado con exito",
      cargo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `no se puede registrar el cargo, error: ${error}`,
    });
  }
};
const putCargo = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const nomMay = nombre.toUpperCase();
    const cargo = await Cargo.update(
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
      cargo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el cargo, Error: ${error}`,
    });
  }
};

const deleteCargo = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {unblock} = req.query;
    const cargo = await Cargo.update({
        habilitado:Number(unblock)
    },{
        where:{
            id
        }
    })
    res.json({
        ok:true,
        msg: Number(unblock)===1 ? 'Cargo desbloqueado con exito' : 'Cargo bloqueado con exito',
        cargo
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg:`Error al eliminar el cargo, Error: ${error}`
    });
  }
};

module.exports = {
  getCargos,
  getCargo,
  postCargo,
  putCargo,
  deleteCargo,
};
