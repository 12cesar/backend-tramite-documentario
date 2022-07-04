const { Router } = require("express");
const { postFirmaDocumento } = require("../controllers/firmaDocumentoInterno");
const { validarCampos, validarJWT, validarArchivoSubir } = require("../middlewares");



const router = Router();



router.post('/',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],postFirmaDocumento);






module.exports = router;