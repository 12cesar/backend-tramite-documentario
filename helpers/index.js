const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcValidators = require('./fc-validators');
const dniValidators = require('./dni-validators');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcValidators,
  ...dniValidators
};
