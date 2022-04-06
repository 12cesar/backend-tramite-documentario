const { Router } = require("express");
const { check } = require("express-validator");
const { putUploadEstructura } = require("../controllers/upload-estructura");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos, validarArchivoSubir } = require('../middlewares')
const router = Router();

router.put('/:id/:coleccion',[
    validarArchivoSubir,
    check('coleccion').custom(c=>coleccionesPermitidas(c,['diresa','gobierno'])),
    validarCampos
],putUploadEstructura);



module.exports = router;