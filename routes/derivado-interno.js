const { Router } = require("express");
const { getDerivadoInternos, getDerivadoInterno, postDerivadoInterno, putDerivadoInterno, deleteDerivadoInterno } = require("../controllers/derivado-interno");
const { validarCampos, validarJWT } = require("../middlewares");




const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],getDerivadoInternos);
router.get('/:id',getDerivadoInterno);
router.post('/',[
    validarJWT,
    validarCampos
],postDerivadoInterno);
router.put('/:id',[
    validarJWT,
    validarCampos
],putDerivadoInterno);
router.delete('/:id',[
    validarJWT,
    validarCampos
],deleteDerivadoInterno);




module.exports = router;