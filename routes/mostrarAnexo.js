const { Router } = require("express");
const { getMostrarAnexInter } = require("../controllers/mostrarAnexo");




const router = Router();


router.get('/interno/:id',getMostrarAnexInter);




module.exports = router;