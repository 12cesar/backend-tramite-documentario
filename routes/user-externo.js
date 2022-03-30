const { Router } = require("express");
const { getUserExternos, getUserExterno, postUserExterno, putUserExterno, deleteUserExterno } = require("../controllers/user-externo");


const router = Router();

router.get('/', getUserExternos);
router.get('/:id', getUserExterno);
router.post('/', postUserExterno);
router.put('/:id', putUserExterno);
router.delete('/:id', deleteUserExterno);


module.exports = router;