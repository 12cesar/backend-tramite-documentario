const { Router } = require("express");
const { getTramiteInternos, getTramiteInterno, postTramiteInterno, putTramiteInterno, deleteTramiteInterno, getGlobalTramiteInterno } = require("../controllers/tramite-interno");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/global/tramite',getGlobalTramiteInterno)
router.get('/',[
    validarJWT,
    validarCampos
],getTramiteInternos);
router.get('/:codigo',getTramiteInterno);
router.post('/',[
    validarJWT,
    validarCampos
],postTramiteInterno);
router.put('/:id',putTramiteInterno);
router.delete('/:id',deleteTramiteInterno);


module.exports = router;