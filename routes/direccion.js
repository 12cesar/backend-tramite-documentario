const { Router } = require("express");
const { getDireccions, getDireccion, postDireccion, putDireccion, deleteDireccion } = require("../controllers/direccion");


const router = Router();

router.get('/', getDireccions);
router.get('/:id', getDireccion);
router.post('/', postDireccion);
router.put('/:id', putDireccion);
router.delete('/:id', deleteDireccion);


module.exports = router;