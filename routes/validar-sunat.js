const { Router } = require("express");
const { postValidarSunat } = require("../controllers/validar-sunat");


const router = Router();


router.post('/:tipo',postValidarSunat);



module.exports = router;