const { Router } = require("express");
const { getRespuestaInterno, getDocumentosAnexosRespuesta } = require("../controllers/respuesta-tramite");



const router = Router();



router.get('/',getRespuestaInterno);
router.get('/codigodoc/:codigo',getDocumentosAnexosRespuesta)



module.exports = router;
