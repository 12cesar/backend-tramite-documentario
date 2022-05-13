const { Router } = require("express");
const { postDocumentoInterno, getDocumentoInternos } = require("../controllers/documento-interno");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], getDocumentoInternos);

router.post('/',[
    validarJWT,
    validarCampos
], postDocumentoInterno);



module.exports = router;