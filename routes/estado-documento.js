const { Router } = require("express");
const { getEstadoDocumentos, getEstadoDocumento, postEstadoDocumento, putEstadoDocumento, deleteEstadoDocumento } = require("../controllers/estado-documento");


const router = Router();

router.get('/',getEstadoDocumentos);
router.get('/:id',getEstadoDocumento);
router.post('/',postEstadoDocumento);
router.put('/:id',putEstadoDocumento);
router.delete('/:id',deleteEstadoDocumento);




module.exports = router;