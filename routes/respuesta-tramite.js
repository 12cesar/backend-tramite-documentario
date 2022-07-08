const { Router } = require("express");
const { getRespuestaInterno } = require("../controllers/respuesta-tramite");



const router = Router();



router.get('/',getRespuestaInterno);




module.exports = router;
