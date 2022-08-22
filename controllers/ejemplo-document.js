const { request, response } = require("express");
const { mayusPrimeraCadena } = require("../helpers");
const EjemploDocument = require("../models/ejemplo-documento");

const getEjemploDocument = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const ejemplo = await EjemploDocument.findAll({
      where: {
        idUsuario: Number(id),
      },
    });
    res.json({
      ok: true,
      msg: "Se mostro los ejemplo con exito",
      ejemplo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error : ${error}`,
    });
  }
};

const getEjemploDocumentUnico = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const ejemplo = await EjemploDocument.findAll({
      where: {
        id: Number(id),
      },
    });
    res.json({
      ok: true,
      msg: "Se mostro el ejemplo con exito",
      ejemplo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error : ${error}`,
    });
  }
};

const postEjemploDocument = async (req = request, res = response) => {
  try {
    const { titulo, idUsuario, ...data } = req.body;
    data.titulo = mayusPrimeraCadena(titulo, " ");
    data.idUsuario = Number(idUsuario);
    const ejemplo = await EjemploDocument.create(data);
    res.json({
      ok: true,
      msg: "Se creo el ejemplo del documento con exito",
      ejemplo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error : ${error}`,
    });
  }
};

const deleteEjemploDocument = async (req = request, res = response) => {
  try {
    const { ids } = req.params;
    const id = Number(ids)
    const ejemplo = await EjemploDocument.destroy({where:{id}});
    res.json({
      ok: true,
      msg: "Se elimino el ejempo del documento, de forma correcta",
      ejemplo,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error : ${error}`,
    });
  }
};

module.exports = {
  getEjemploDocument,
  postEjemploDocument,
  deleteEjemploDocument,
  getEjemploDocumentUnico
};
