const { request, response } = require("express");
const funDate = require("../helpers/generar-fecha");
const {
  Userarea,
  Usuario,
  Area,
  Tramiteinterno,
  Estadotramite,
  Documentointerno,
  SeguimientoInterno,
  DestinoInterno,
  Codigodocumento,
} = require("../models");

const getTramiteInternos = async (req = request, res = response) => {
  try {
    const idArea = req.idArea;
    const tramiteinter = await Tramiteinterno.findAll({
      include: [
        {
          model: Area,
          attributes: ["id", "nombre"],
        },
        {
          model:Codigodocumento
        }
      ],
      where: {
        idArea
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
    const { codigo } = req.params;
    const tramiteinter = await Tramiteinterno.findOne({
      include: [
        {
          model: Area
        },
        {
          model:Codigodocumento
        }
      ],
      where:{
        codigo
      }
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
    const {codigoDocumento,observacion, accion} = req.body;
    const idArea= req.idArea;
    const {ano,fecha,hora} = funDate();
    const documentoInterno = await Documentointerno.findOne({
      where:{
        codigoDocumento
      }
    });
    const count = await Tramiteinterno.count({
      where:{
        ano
      }
    });
    const numero = `${count+1}`;
    const codigo = numero.padStart(5, "0");
    const destino = documentoInterno.destino;
    const arrayDest = destino.split(',');
    const data = {
      codigo,
      asunto:documentoInterno.asunto,
      referencia:documentoInterno.referencia,
      fecha,
      ano,
      idArea,
      codigoDocumento,
      observacion,
      hora
    }
    
    const tramiteInterno = await Tramiteinterno.create(data);
    for (let i = 0; i < arrayDest.length; i++) {
      const {id} = await DestinoInterno.create({
        codigoTramite: tramiteInterno.codigo,
        destinoArea:arrayDest[i],
        accion
      });
      const seguimiento = await SeguimientoInterno.create({
        fechaDerivado:fecha,
        horaDerivado:hora,
        codigoTramite:tramiteInterno.codigo,
        idDestino:arrayDest[i]
      });
    }
    const documentoInter = await Documentointerno.update({
      estadoDerivado:1
    },{
      where:{
        codigoDocumento
      }
    });
    res.json({
      ok:true,
      msg:`Se creo el tramite N° ${tramiteInterno.codigo}`, 
      tramiteInterno
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
