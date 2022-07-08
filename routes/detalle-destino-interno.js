const { Router } = require("express");
const { getDetalleDestinoInterno, postDetalleDestinoInterno } = require("../controllers/detalle-destino-interno");



const router = Router();




router.get('/',getDetalleDestinoInterno);
router.post('/',postDetalleDestinoInterno);



module.exports = router;