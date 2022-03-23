const { Router } = require("express");
const { Usuario } = require("../models");



const router= Router();

router.get('/',async(req,res)=>{

    const usuario= await Usuario.findAll();

    res.json({
        ok:true,
        usuario
    })
});




module.exports = router;