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
    const { estadoDerivado, estadoFirma } = req.query;
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
const getDocumentoDerivado = async(req = request, res = response) => {
  try {
    const idArea = req.idArea;
    const Op = Sequelize.Op;
    const { sigla } = await Area.findOne({
      where: {
        id: idArea,
      },
    });
    const documentoInter = await Documentointerno.findAll({
      where: {
        codigoDocumento:{
          [Op.like]: `${sigla}%`,
        },
        tipoEnvio: 3,
        envio: 0,
        estadoFirma:1
      }
    })
    res.json({
      ok: true,
      msg: 'Se mostro los documento interno con exito',
      documentoInter
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error al mostrar los documentos, error: ${error}`
    })
  }
}
const pdfCreate = async (req = request, res = response) => {
  let template = path.join(__dirname, '../uploads/', 'prueba.html')
  let filename = template.replace('.html', '.pdf')
  let html = fs.readFileSync('./uploads/prueba.html', 'utf-8');
  const img = path.join('file://', __dirname, '../uploads/', 'logo', 'gobierno.png');

  const options = {
    "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape

  }
  html.replace('{{logo}}', img)
  pdf.create(html, options).toFile(filename, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
      console.log(img);
      res.sendFile(resp.filename)
    }
  });
};

const postDocumentoInterno = async (req = request, res = response) => {
  try {
    if (req.files) {
      const { archivo } = req.files;
      const { ano, fecha, hora } = funDate();
      const { destino, tipoDocumento,tipoEnvio, ...data } = req.body;
      const idArea = req.idArea;
      const codigoUnico = await codigoDocumen(idArea, ano, tipoDocumento);
      data.destino = destinoArray(destino);
      if (tipoEnvio === '3' || tipoEnvio === 3) {
        data.envio = '0';
        data.tipoEnvio = tipoEnvio
      } else if (tipoEnvio !== '3') {
          data.tipoEnvio = tipoEnvio;
      } 

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
        msg: 'Se creo el documento con exito',
        documentoInter,
      });
    }
    if (!req.files) {
      const { destino, tipoDocumento, tipoEnvio, ...data } = req.body;
      const { ano, fecha, hora } = funDate();
      const idArea = req.idArea;
      const codigoUnico = await codigoDocumen(idArea, ano, tipoDocumento);
      data.destino = destinoArray(destino);
      if (tipoEnvio === '3' || tipoEnvio === 3) {
        data.envio = '0';
        data.tipoEnvio = tipoEnvio
      } else {
        data.tipoEnvio = tipoEnvio;
      }
      data.codigoDocumento = codigoUnico;
      data.fecha = fecha;
      const documentoInter = await Documentointerno.create(data);
      return res.json({
        ok: true,
        msg: 'Se creo el documento con exito',
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
  getDocumentoDerivado,
  pdfCreate,
};
