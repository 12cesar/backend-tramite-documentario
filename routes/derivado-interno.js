const { Router } = require("express");
const { getDerivadoInternos, getDerivadoInterno, postDerivadoInterno, putDerivadoInterno, deleteDerivadoInterno } = require("../controllers/derivado-interno");




const router = Router();

router.get('/',getDerivadoInternos);
router.get('/:id',getDerivadoInterno);
router.post('/',postDerivadoInterno);
router.put('/:id',putDerivadoInterno);
router.delete('/:id',deleteDerivadoInterno);




module.exports = router;