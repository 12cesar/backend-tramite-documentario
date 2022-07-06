const { Router } = require("express");
const { getAnexoInterno } = require("../controllers/pdfAnexo");


const router = Router();

router.get('/:codigo', getAnexoInterno);




module.exports = router;