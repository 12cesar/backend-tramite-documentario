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
var fs = require('fs')  
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
  var template = path.join(__dirname,'../uploads/','documentoInterno', 'documento-interno.html');
  var filename = template.replace('.html', '.pdf');
  var image = path.join(__dirname,'../uploads/','logo', 'gobierno.png');
  
  let templateHtml = fs.readFileSync(template, 'utf8');
  templateHtml.replace('{{image}}', image);
  
  /* var options = {
    width: '50mm',
    height: '90mm'
  } */
  /* const ruta = path.join(
    __dirname,
    "../uploads/",
    "documentointerno",
    "html-pdf.pdf"
  );
  */
  pdf.create(templateHtml).toFile(filename, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
      res.sendFile(resp.filename);
    }
  }); 

  console.log(template);
  console.log(filename);
  console.log(image);
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
