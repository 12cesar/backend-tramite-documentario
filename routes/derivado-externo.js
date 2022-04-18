const { Router } = require("express");
const { getDerivacionExternos, getDerivacionExterno, postDerivacionExterno, putDerivacionExterno, deleteDerivacionExterno } = require("../controllers/derivacion-externo");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], getDerivacionExternos);
router.get('/:id', getDerivacionExterno);
router.post('/',[
    validarJWT,
    validarCampos
], postDerivacionExterno);
router.put('/:id',[
    validarJWT,
    validarCampos
], putDerivacionExterno);
router.delete('/:id',[
    validarJWT,
    validarCampos
], deleteDerivacionExterno);



module.exports = router;