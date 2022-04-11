const { Router } = require("express");
const { getDerivacionExternos, getDerivacionExterno, postDerivacionExterno, putDerivacionExterno, deleteDerivacionExterno } = require("../controllers/derivacion-externo");


const router = Router();

router.get('/', getDerivacionExternos);
router.get('/:id', getDerivacionExterno);
router.post('/', postDerivacionExterno);
router.put('/:id', putDerivacionExterno);
router.delete('/:id', deleteDerivacionExterno);



module.exports = router;