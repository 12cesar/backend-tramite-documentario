const Server = require("./server");
const Usuario = require("./user");
const Cargo = require("./cargo");
const Area = require('./area');
const Codigodocumento = require("./codigodocumento");
const Derivacionexterno = require("./derivacionexterno");
const Derivacioninterno = require("./derivacioninterno");
const Direccion = require("./direccion");
const Documentoadjuntarexterno = require("./documentoadjuntar-externo");
const Documentoadjuntarinterno = require("./documentoadjuntar-interno");
const Documentoexterno = require("./documentoexterno");
const Documentofirmaexterno = require("./documentofirma-externo");
const Documentofirmainterno = require("./documentofirma-interno");
const Documentointerno = require("./documentointerno");
const Estadodocumento = require("./estadodocumento");
const Estadotramite = require("./estadotramite");
const Estructura = require("./estructura");
const Recepcionexterno = require("./recepcionexterno");
const Recepcioninterno = require("./recepcioninterno");
const Remitente = require("./remitente");
const Tipodocumento = require("./tipodocumento");
const Tipopersona = require("./tipopersona");
const Tramiteexterno = require("./tramite-externo");
const Tramiteinterno = require("./tramite-interno");
const Tramiteadjuntarexterno = require("./tramiteadjuntar-externo");
const Userarea = require("./userarea");
const DestinoInterno = require("./destino-interno");
const SeguimientoInterno = require("./seguimiento-interno");
const TipoEnvio = require("./tipo-envio");
const RespuestaTramite = require("./respuesta-tramite");
const DetalleDestinoInterno = require("./detalle-destino-interno");
const EjemploDocumento = require("./ejemplo-documento");
module.exports = {
  Server,
  Usuario,
  Cargo,
  Area,
  Codigodocumento,
  Derivacionexterno,
  Derivacioninterno,
  Direccion,
  Documentoadjuntarexterno,
  Documentoadjuntarinterno,
  Documentoexterno,
  Documentofirmaexterno,
  Documentofirmainterno,
  Documentointerno,
  Estadodocumento,
  Estadotramite,
  Estructura,
  Recepcionexterno,
  Recepcioninterno,
  Remitente,
  Tipodocumento,
  Tipopersona,
  Tramiteexterno,
  Tramiteinterno,
  Tramiteadjuntarexterno,
  Userarea,
  DestinoInterno,
  SeguimientoInterno,
  TipoEnvio,
  RespuestaTramite,
  DetalleDestinoInterno,
  EjemploDocumento
};
