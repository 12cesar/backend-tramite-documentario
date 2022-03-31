const { Router } = require("express");
const { getTipoDocumentos, postTipoDocumento, getTipoDocumento, putTipoDocumento, deleteTipoDocumento } = require("../controllers/tipo-documento");

const router = Router();

router.get('/',getTipoDocumentos);
router.get('/:id',getTipoDocumento);
router.post('/',postTipoDocumento);
router.put('/:id',putTipoDocumento);
router.delete('/:id',deleteTipoDocumento);

module.exports = router;

