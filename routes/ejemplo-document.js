const { Router } = require("express");
const { getEjemploDocument, postEjemploDocument, deleteEjemploDocument } = require("../controllers/ejemplo-document");



const router = Router();

router.get('/:id', getEjemploDocument);
router.post('/', postEjemploDocument);
router.delete('/:ids', deleteEjemploDocument)








module.exports = router