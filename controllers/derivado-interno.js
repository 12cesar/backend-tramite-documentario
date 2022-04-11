const { request, response } = require("express");
const {
  Derivacioninterno,
  Tramiteinterno,
  Recepcioninterno,
  Userarea,
  Area,
  Usuario,
} = require("../models");

const getDerivadoInternos = async(req = request, res = response) => {
    const {habilitado} = req.query;
    const user = req.usuarioToken;
    const {areauser:{id,...data}} = await Userarea.findOne(
        {
            include:{
                as:'areauser',
                model:Area
            },
            where:{
                idUsuario:user.id
            }
        }
    )
    const derivacioninter = await Derivacioninterno.findOne(
      {
        include:[
          {
            model:Usuario
          },
          {
            model:Tramiteinterno         
          },
          {
            model:Area
          }
        ],  
        where:{
          destinoArea:id,
          habilitado:Number(habilitado)
        }
      }
    )

  res.json({
    ok: true,
    derivacioninter
  });
};

const getDerivadoInterno = (req = request, res = response) => {
  res.json({
    ok: true,
  });
};

const postDerivadoInterno = async (req = request, res = response) => {
  try {
    const { tramite, ...data } = req.body;
    const user = req.usuarioToken;
    data.usuarioDerivador = user.id;
    data.tramite = tramite;
    const tramiteinter = await Tramiteinterno.update(
      {
        estadoTramite: 1,
      },
      {
        where: {
          id: tramite,
        },
      }
    );
    const { id } = await Derivacioninterno.create(data);
    const recepcioninter = await Recepcioninterno.create({
      idDerivacion: id,
    });
    res.json({
      ok: true,
      msg: "se derivo el documento al area destino",
      derivacioninter: null,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al derivar el documento, Error: ${error}`,
    });
  }
};

const putDerivadoInterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = req.usuarioToken;
    data.usuarioDerivador = user.id;
    const derivacioninter = await Derivacioninterno.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se edito la derivacion del tramite interno",
      derivacioninter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al editar la derivacion del documento, Error: ${error}`,
    });
  }
};

const deleteDerivadoInterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const derivacioninter = await Derivacioninterno.update(
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
      msg:'Derivacion eliminada con exito',
      derivacioninter
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al eliminar la derivacion del documento, Error: ${error}`,
    });
  }
};

module.exports = {
  getDerivadoInternos,
  getDerivadoInterno,
  postDerivadoInterno,
  putDerivadoInterno,
  deleteDerivadoInterno,
};
