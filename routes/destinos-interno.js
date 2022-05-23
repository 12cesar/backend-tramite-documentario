const { Router } = require("express");
const { getDestinosInternos, getDestinosInterno, postDestinosInterno, putDestinosInterno, deleteDestinosInterno, recepcionarDestinosInterno } = require("../controllers/destinos-interno");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();


router.get('/',[
    validarJWT,
    validarCampos
],getDestinosInternos);
router.put('/recepcionar/:id',[
    validarJWT,
    validarCampos
],recepcionarDestinosInterno);
router.get('/:id',getDestinosInterno);
router.post('/', postDestinosInterno);
router.put('/:id',putDestinosInterno);
router.delete('/:id',deleteDestinosInterno);



module.exports = router;