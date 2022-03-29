const { response } = require("express");
const { request } = require("express");
const { Area, Usuario, Userarea } = require("../models");

const getUserAreas = async (req = request, res = response) => {
  try {
    const userarea = await Userarea.findAll({
      include: [
        {
          model: Usuario,
        },
        {
          model: Area,
        },
      ],
    });
    res.json({
      ok: true,
      msg: "Usuario y areas mostrado con exito",
      userarea,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error en mostrar los usuarios y area, error: ${error}`,
    });
  }
};
const getUserArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const userarea = await Userarea.findByPk(id);
    res.json({
      ok: true,
      msg: "Usuario y area relacionado con exito",
      userarea,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error en mostrar el usuarios y area, error: ${error}`,
    });
  }
};
const postUserArea = async (req = request, res = response) => {
  try {
    const { idArea, idUsuario } = req.body;
    const userarea = await Userarea.create({
      idArea,
      idUsuario,
    });

    res.json({
      ok: true,
      msg: "Usuario y area relacionado con exito",
      userarea,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: `Error al ingresar el usuario y area, error: ${error}`,
    });
  }
};

const putUserArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { idArea, idUsuario } = req.body;
    const userarea = await Userarea.update(
      {
        idArea,
        idUsuario,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      ok: true,
      msg: "Usuario y area actualizado con exito",
      userarea
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: `Error al actualizar el usuario y area, error: ${error}`,
    });
  }
};

module.exports = {
  getUserAreas,
  getUserArea,
  postUserArea,
  putUserArea,
};
