const { Router } = require("express");
const { postLogin } = require("../controllers/authuser");

const router = Router();


router.post('/',postLogin);



module.exports = router;