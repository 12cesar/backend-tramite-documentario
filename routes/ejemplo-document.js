const { Router } = require("express");
const { getEjemploDocument, postEjemploDocument, deleteEjemploDocument, getEjemploDocumentUnico } = require("../controllers/ejemplo-document");



const router = Router();

router.get('/:id', getEjemploDocument);
router.get('/unico/:id', getEjemploDocumentUnico);
router.post('/', postEjemploDocument);
router.delete('/:ids', deleteEjemploDocument)








module.exports = router