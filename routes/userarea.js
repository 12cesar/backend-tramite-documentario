const { response } = require("express");
const { request } = require("express");
const { Router } = require("express");
const { getUserAreas, getUserArea, postUserArea, putUserArea } = require("../controllers/userarea");




const router = Router();


router.get('/',getUserAreas);
router.get('/:id', getUserArea);
router.post('/',postUserArea);
router.put('/:id', putUserArea);


module.exports = router;