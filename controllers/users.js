const { response, request } = require("express");
const { Usuario, Cargo, Userarea } = require("../models");
const bcryptjs = require("bcryptjs");
const getUsers = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const user = await Usuario.findAll({
      include: {
        model: Cargo,
        attributes: ["id", "nombre"],
      },
      where: {
        habilitado: Number(habilitado),
      },
    });
    res.json({
      ok: true,
      msg: "Usuarios mostrado con exito",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar usuarios, error: ${error}`,
    });
  }
};
const getUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id, {
      include: {
        model: Cargo,
        attributes: ["id", "nombre"],
      },
    });
    res.json({
      ok: true,
      msg: "Usuario mostrado con exito",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar usuario, error: ${error}`,
    });
  }
};
const postUser = async (req = request, res = response) => {
  try {
    const {
      nombre,
      apellido,
      domicilio,
      telefono,
      email,
      nacimiento,
      password,
      dni,
      tipoCargo,
    } = req.body;
    const nomMay = nombre.toUpperCase();
    const apeMay = apellido.toUpperCase();
    const salt = bcryptjs.genSaltSync();
    const hasPassword = bcryptjs.hashSync(password, salt);
    const user = await Usuario.create({
      nombre: nomMay,
      apellido: apeMay,
      domicilio,
      telefono,
      email,
      nacimiento,
      password: hasPassword,
      dni,
      tipoCargo,
    });
    res.json({
      ok: true,
      msg: "Usuario creado con exito",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al ingresar el usuario, error: ${error}`,
    });
  }
};

const putUser = async (req = request, res = response) => {
  try {
    const { nombre, apellido, password, ...data } = req.body;
    const { id } = req.params;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      data.password = bcryptjs.hashSync(password, salt);
    }
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    const user = await Usuario.update(data, { where: { id } });
    res.json({
      ok: true,
      msg: "Usuario actualizado con exito",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el usuario, error: ${error}`,
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const user = await Usuario.update(
      { habilitado: Number(habilitado) },
      { where: { id } }
    );
    res.json({
      ok: true,
      msg:
        Number(habilitado) === 1
          ? "Usuario desbloqueado con exito"
          : "Usuario bloqueado con exito",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al eliminar el usuario, error: ${error}`,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
