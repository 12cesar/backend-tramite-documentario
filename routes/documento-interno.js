const { Router } = require("express");
const { postDocumentoInterno } = require("../controllers/documento-interno");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();


router.post('/',[
    validarJWT,
    validarCampos
], postDocumentoInterno)



module.exports = router;