const { Router } = require("express");
const { getTramiteInternos, getTramiteInterno, postTramiteInterno, putTramiteInterno, deleteTramiteInterno } = require("../controllers/tramite-interno");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/mostrar/:estado',[
    validarJWT,
    validarCampos
],getTramiteInternos);
router.get('/:id',getTramiteInterno);
router.post('/',[
    validarJWT,
    validarCampos
],postTramiteInterno);
router.put('/:id',putTramiteInterno);
router.delete('/:id',deleteTramiteInterno);


module.exports = router;