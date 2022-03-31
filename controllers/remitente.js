const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { Remitente, Tipopersona } = require("../models");

const getRemitentes = async (req = request, res = response) => {
  try {
    const { habilitado } = req.query;
    const remitente = await Remitente.findAll({
      include: {
        model: Tipopersona,
        attributes: ["id", "nombre"],
      },
      where: {
        habilitado,
      },
    });
    res.json({
      ok: true,
      msg:'Remitentes mostrado con exito',
      remitente,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los remitentes, error: ${error}`,
    });
  }
};
const getRemitente = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const remitente = await Remitente.findByPk(id, {
      include: {
        model: Tipopersona,
        attributes: ["id", "nombre"],
      },
    });
    res.json({
      ok: true,
      msg:'Remitente mostrado con exito',
      remitente,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar el remitente, error: ${error}`,
    });
  }
};
const postRemitente = async (req = request, res = response) => {
  try {
    const {
      nombre,
      documento,
      email,
      telefono,
      direccion,
      fecha,
      password,
      tipoPersona,
    } = req.body;
    const salt = bcryptjs.genSaltSync();
    const hasPassword = bcryptjs.hashSync(password, salt);
    const dirMay = direccion.toUpperCase();
    const remitente = await Remitente.create({
      nombre,
      documento,
      email,
      telefono,
      fecha,
      tipoPersona,
      password: hasPassword,
      direccion: dirMay,
    });
    res.json({
      ok: true,
      msg: "Remitente creado con exito",
      remitente,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el remitente, error: ${error}`,
    });
  }
};
const putRemitente = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {
        password,
        direccion,
        ...data
      } = req.body;
    
    if (password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    data.direccion = direccion.toUpperCase();
    const remitente = await Remitente.update(data,{
        where:{
            id
        }
    });
    res.json({
      ok: true,
      remitente,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el remitente, error: ${error}`,
    });
  }
};
const deleteRemitente = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const {habilitado} = req.query;
        const remitente = await Remitente.update({
            habilitado:Number(habilitado)
        },{
            where:{
                id
            }
        });
        res.json({
          ok: true,
          msg:Number(habilitado)===1 ? 'Remitente desbloqueado con exito':'Remitente bloqueado con exito',
          remitente,
        });
      } catch (error) {
        res.status(400).json({
          ok: false,
          msg: `Error al eliminar el remitente, error: ${error}`,
        });
      }
};

module.exports = {
  getRemitentes,
  getRemitente,
  postRemitente,
  putRemitente,
  deleteRemitente,
};
