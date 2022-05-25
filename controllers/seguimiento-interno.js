const { request,response } = require("express");
const { SeguimientoInterno } = require("../models");
const {Area} =require("../models");

const getSeguimiento = async(req=request,res=response)=>{
    const {codigo} = req.params;
    const seguimiento = await SeguimientoInterno.findAll({
        include:[
            {
                model:Area
            }
        ],
        where:{
            codigoTramite:codigo
        }
    })
    res.json({
        ok:true,
        seguimiento
    })
}





module.exports ={
    getSeguimiento
}