const { request, response } = require("express");
const funDate = require("../helpers/generar-fecha");
const {
  Userarea,
  Usuario,
  Area,
  Tramiteinterno,
  Estadotramite,
  Documentointerno,
} = require("../models");

const getTramiteInternos = async (req = request, res = response) => {
  try {
    const { estado } = req.params;
    const {habilitado} = req.query;
    const { id } = req.usuarioToken;
    const { idArea } = await Userarea.findOne(
      {
        attributes: ["id", "idArea", "idUsuario"],
        include: [
          {
            model: Usuario,
            attributes: ["id", "nombre", "apellido"],
          },
          {
            model: Area,
            as:'areauser',
            attributes: ["id", "nombre"],
          },
        ],
      },
      {
        where: {
          idUsuario: id
        },
      }
    );
    const tramiteinter = await Tramiteinterno.findAll({
      include: [
        {
          model: Area,
          attributes: ["id", "nombre"],
        },
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido"],
        },
        {
          model: Estadotramite,
          attributes: ["id", "nombre"],
        },
      ],
      where: {
        idArea,
        estadoTramite: estado,
        habilitado:Number(habilitado)
      },
    });
    res.json({
      ok: true,
      msg: "Tramites internos mostrados con exito",
      tramiteinter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar los tramites internos, error: ${error}`,
    });
  }
};

const getTramiteInterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const tramiteinter = await Tramiteinterno.findOne({
      include: [
        {
          model: Area,
          attributes: ["id", "nombre"],
        },
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido"],
        },
        {
          model: Estadotramite,
          attributes: ["id", "nombre"],
        },
      ],
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Tramite mostrado con exito",
      tramiteinter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostra el tramite internos, error: ${error}`,
    });
  }
};
const postTramiteInterno = async (req = request, res = response) => {
  try {
    const {codigoDocumento,observacion} = req.body;
    const idArea= req.idArea;
    const {ano,fecha,hora} = funDate();
    const documentoInterno = await Documentointerno.findOne({
      where:{
        codigoDocumento
      }
    });
    res.json({
      ok:true,
      codigoDocumento,
      observacion,
      documentoInterno,
      idArea,
      ano,
      fecha,
      hora
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el tramite interno, error: ${error}`,
    });
  }
};
const putTramiteInterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const tramiteinter = await Tramiteinterno.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Tramite interno actualizado con exito",
      tramiteinter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al actualizar el tramite interno, error: ${error}`,
    });
  }
};
const deleteTramiteInterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const tramiteinter = await Tramiteinterno.update(
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
          ? "Tramite interno desbloqueado con exito"
          : "tramite interno bloqueado con exito",
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al eliminar el tramite interno, error: ${error}`,
    });
  }
};

module.exports = {
  getTramiteInternos,
  getTramiteInterno,
  postTramiteInterno,
  putTramiteInterno,
  deleteTramiteInterno,
};
