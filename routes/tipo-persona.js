const { Router } = require("express");
const { getTipoPersonas, getTipoPersona, postTipoPersona, putTipoPersona, deleteTipoPersona } = require("../controllers/tipo-persona");



const router = Router();

router.get('/',getTipoPersonas);
router.get('/:id',getTipoPersona);
router.post('/',postTipoPersona);
router.put('/:id',putTipoPersona);
router.delete('/:id',deleteTipoPersona);


module.exports = router;