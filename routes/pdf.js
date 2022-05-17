const { Router } = require("express");
const { getDocumentoInternoPdf, pdfDocInter } = require("../controllers/pdf");

const router = Router();


router.get('/',getDocumentoInternoPdf);
router.get('/documento-interno',pdfDocInter);



module.exports =router;