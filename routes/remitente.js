const { Router } = require("express");
const { getRemitentes, getRemitente, postRemitente, putRemitente, deleteRemitente } = require("../controllers/remitente");



const router = Router();

router.get('/', getRemitentes);
router.get('/:id', getRemitente);
router.post('/', postRemitente);
router.put('/:id', putRemitente);
router.delete('/:id', deleteRemitente);


module.exports = router;