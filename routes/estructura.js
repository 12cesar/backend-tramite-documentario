const { Router } = require("express");
const { getEstructuras, getEstructura, postEstructura, putEstructura, deleteEstructura } = require("../controllers/estructura");



const router = Router();


router.get('/',getEstructuras);
router.get('/:id',getEstructura);
router.post('/',postEstructura);
router.put('/:id',putEstructura);
router.delete('/:id',deleteEstructura);



module.exports = router