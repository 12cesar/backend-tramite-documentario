const { Router } = require("express");
const { getTramiteExternos, getTramiteExterno, postTramiteExterno, putTramiteExterno, deleteTramiteExterno } = require("../controllers/tramite-externo");
const { validarCampos, validarJWT, validarArchivoSubir } = require("../middlewares");



const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], getTramiteExternos);
router.get('/:id', getTramiteExterno);
router.post('/',[
    validarArchivoSubir,
    validarCampos
], postTramiteExterno);
router.put('/:id', putTramiteExterno);
router.delete('/:id', deleteTramiteExterno);





module.exports = router;