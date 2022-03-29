const { Router } = require("express");
const { getAreas, getArea, postArea, putArea, deleteArea } = require("../controllers/area");


const router = Router();

router.get('/', getAreas);
router.get('/:id', getArea);
router.post('/', postArea);
router.put('/:id', putArea);
router.delete('/:id', deleteArea);





module.exports = router;