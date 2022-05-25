const { Router } = require("express");
const { getSeguimiento } = require("../controllers/seguimiento-interno");


const router = Router();

router.get('/:codigo',getSeguimiento);




module.exports = router;


