const { response, request } = require("express");
const Sequelize = require("sequelize");
const { destinoArray, uploadArchivo, codigoDocumen } = require("../helpers");
const funDate = require("../helpers/generar-fecha");
const {
  Documentointerno,
  Documentoadjuntarinterno,
  Codigodocumento,
  Area,
} = require("../models");
const pdf = require("html-pdf");
const path = require("path");
var fs = require("fs");
const getDocumentoInternos = async (req = request, res = response) => {
  try {
    const Op = Sequelize.Op;
    const idArea = req.idArea;
    const { sigla } = await Area.findOne({
      where: {
        id: idArea,
      },
    });
    const buscar = sigla + "%";
    const documentoInter = await Documentointerno.findAll({
      where: {
        codigoDocumento: {
          [Op.like]: `${sigla}%`,
        },
      },
      order: [["fecha", "DESC"]],
    });
    res.json({
      ok: true,
      msg: "Documentos mostrados con exito",
      documentoInter,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: error,
    });
  }
};

const pdfCreate = async (req = request, res = response) => {
  const image = path.join('file://', __dirname,'../uploads/', 'imagen.jpg');
  console.log(image);
  let html = fs.readFileSync('./uploads/prueba.html','utf-8');
  
  const options = {
    "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape
  }
  html.replace('{{image}}', 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8b3Bwb3J0dW5pdHl8ZW58MHx8MHx8&w=1000&q=80');
  html = html.replace('{{desc}}','hola como estas');
  html = html.replace('{{asunto}}','hola como estas');
  pdf.create(html, options).toFile("./uploads/html-pdf.pdf", function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
      res.sendFile(resp.filename)
    }
  });
};

const postDocumentoInterno = async (req = request, res = response) => {
  try {
    if (req.files) {
      const { archivo } = req.files;
      const { ano, fecha, hora } = funDate();
      const { destino, tipoDocumento, ...data } = req.body;
      const idArea = req.idArea;
      const codigoUnico = await codigoDocumen(idArea, ano, tipoDocumento);
      data.destino = destinoArray(destino);
      data.codigoDocumento = codigoUnico;
      data.fecha = fecha;
      const documentoInter = await Documentointerno.create(data);
      await uploadArchivo(
        archivo,
        Documentoadjuntarinterno,
        documentoInter.id,
        "documentoInterno"
      );
      return res.json({
        ok: true,
        documentoInter,
      });
    }
    if (!req.files) {
      const { destino, tipoDocumento, ...data } = req.body;
      const { ano, fecha, hora } = funDate();
      const idArea = req.idArea;
      const codigoUnico = await codigoDocumen(idArea, ano, tipoDocumento);
      data.destino = destinoArray(destino);
      data.codigoDocumento = codigoUnico;
      data.fecha = fecha;
      const documentoInter = await Documentointerno.create(data);
      return res.json({
        ok: true,
        documentoInter,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  getDocumentoInternos,
  postDocumentoInterno,
  pdfCreate,
};
