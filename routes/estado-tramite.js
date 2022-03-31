const { Router } = require("express");
const { getEstadoTramites, getEstadoTramite, postEstadoTramite, putEstadoTramite, deleteEstadoTramite } = require("../controllers/estado-tramite");


const router = Router();

router.get('/',getEstadoTramites);
router.get('/:id',getEstadoTramite);
router.post('/',postEstadoTramite);
router.put('/:id',putEstadoTramite);
router.delete('/:id',deleteEstadoTramite);

module.exports = router;