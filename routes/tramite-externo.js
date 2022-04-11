const { Router } = require("express");
const { getTramiteExternos, getTramiteExterno, postTramiteExterno, putTramiteExterno, deleteTramiteExterno } = require("../controllers/tramite-externo");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();

router.get('/', getTramiteExternos);
router.get('/:id', getTramiteExterno);
router.post('/',[
    validarCampos
], postTramiteExterno);
router.put('/:id', putTramiteExterno);
router.delete('/:id', deleteTramiteExterno);





module.exports = router;