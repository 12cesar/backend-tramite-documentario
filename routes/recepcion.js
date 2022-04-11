const { Router } = require("express");
const { check } = require("express-validator");
const { recepcionPut } = require("../controllers/recepcion");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/:id/:coleccion',[
    validarJWT,
    check('coleccion').custom(c=>coleccionesPermitidas(c,['interno','externo'])),
    validarCampos
], recepcionPut);




module.exports = router;



