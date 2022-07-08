const { Router } = require("express");
const { getTipoEnvio } = require("../controllers/tipo-envio");



const router = Router();



router.get('/',getTipoEnvio);



module.exports = router;