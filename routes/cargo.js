const { Router } = require("express");
const { getCargos, getCargo, postCargo, putCargo, deleteCargo } = require("../controllers/cargo");


const router = Router();

router.get('/', getCargos);
router.get('/:id', getCargo);
router.post('/', postCargo);
router.put('/:id', putCargo);
router.delete('/:id', deleteCargo);




module.exports = router;
