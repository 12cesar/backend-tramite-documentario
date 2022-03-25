const { Router } = require("express");
const { Usuario, Cargo } = require("../models");



const router= Router();

router.get('/',async(req,res)=>{

    const usuario= await Usuario.findAll({
        include:{
            model:Cargo
        }
    });
    res.json({
        ok:true,
        usuario
    })
});




module.exports = router;