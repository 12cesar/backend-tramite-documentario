const { response, request } = require("express");
const funDate = require("../helpers/generar-fecha");
const { subirArchivoImg } = require("../helpers/subir-archivo");
const {
  Tramiteexterno,
  Tramiteadjuntarexterno,
  Derivacionexterno,
  Recepcionexterno,
  Remitente,
  Userarea,
} = require("../models");

const getTramiteExternos = async (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "Se mostro el tramite externo con exito",
  });
};
const getTramiteExterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const tramiteexter = await Tramiteexterno.findByPk(id, {
      include: [
        {
          model: Remitente,
        },
      ],
    });
    res.json({
      ok: true,
      msg: "Se mostro el tramite externo con exito",
      tramiteexter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al mostrar el tramite externo, error ${error}`,
    });
  }
};
const postTramiteExterno = async (req = request, res = response) => {
  try {
    /* Obtenemos los documentos recibidos del body */
    const data = req.body;
    const { archivo } = req.files;
    /* Obtenemos la fecha, hora, ano */
    const { fecha, hora, ano } = funDate();
    /* Generamos un codigo para el tramite externo */
    const countExter = await Tramiteexterno.count({
      where: {
        ano,
      },
    });
    const cod = `${countExter + 1}`;
    if (cod.length <= 5) {
      data.codigo = cod.padStart(5, "0");
      data.ano = ano;
      data.fecha = fecha;
      data.hora = hora;
    } else {
      return res.status(400).json({
        ok: false,
        msg: "Error al ingresar el codigo del tramite",
      });
    }
    /* Creamos el tramite externo */
    let tramiteexter = await Tramiteexterno.create(data);
    let modelo = {};
    /* Subimos los documento del tramite-externo */
    if (!Array.isArray(archivo)) {
      modelo.idTramite = tramiteexter.id;
      modelo.documentoAdjuntar = await subirArchivoImg(
        { archivo },
        ["pdf", "doc", "docx", "xlsx", "xlsm", "pptx"],
        "tramite-externo"
      );
      const documentoExter = await Tramiteadjuntarexterno.create(modelo);
    } else {
      for (let i = 0; i < archivo.length; i++) {
        modelo.idTramite = tramiteexter.id;
        modelo.documentoAdjuntar = await subirArchivoImg(
          { archivo: archivo[i] },
          ["pdf", "doc", "docx", "xlsx", "xlsm", "pptx"],
          "tramite-externo"
        );
        const documentoExter = await Tramiteadjuntarexterno.create(modelo);
        modelo = {};
      }
    }
    /* Creamos la derivacion del documento */
    const derivacionexter = await Derivacionexterno.create({
      fecha,
      tramite: tramiteexter.id,
      destinoArea: 3,
    });
    /* Creamos la derivacion del documento */
    const recepcionexter = await Recepcionexterno.create({
      fechaDerivacion: fecha,
      idDerivacion: derivacionexter.id,
      horaDerivacion: hora,
    });
    res.json({
      ok: true,
      msg: `Se creo el tramite externo con codigo: ${data.codigo}`,
      tramiteexter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al crear el tramite externo, error: ${error}`,
    });
  }
};
const putTramiteExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const deleteTramiteExterno = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { habilitado } = req.query;
    const tramiteexter = await Tramiteexterno.update(
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
          ? "Tramite externo debloqueado"
          : "Tramite externo bloqueado",
      tramiteexter,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al eliminar el tramite externo, error: ${error}`,
    });
  }
};

module.exports = {
  getTramiteExternos,
  getTramiteExterno,
  postTramiteExterno,
  putTramiteExterno,
  deleteTramiteExterno,
};
