const { Router } = require("express");
const { getDetalleDestinoInterno, postDetalleDestinoInterno } = require("../controllers/detalle-destino-interno");



const router = Router();




router.get('/:codigo',getDetalleDestinoInterno);
router.post('/',postDetalleDestinoInterno);



module.exports = router;