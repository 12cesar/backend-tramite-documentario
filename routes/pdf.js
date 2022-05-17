const { Router } = require("express");
const { getDocumentoInternoPdf } = require("../controllers/pdf");

const router = Router();


router.get('/',getDocumentoInternoPdf);




module.exports =router;