const { Router } = require("express");
const { postFirmaDocumento, getFirmaDocumento } = require("../controllers/firmaDocumentoInterno");
const { validarCampos, validarJWT, validarArchivoSubir } = require("../middlewares");



const router = Router();

router.get('/:codigo',getFirmaDocumento)

router.post('/',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],postFirmaDocumento);






module.exports = router;