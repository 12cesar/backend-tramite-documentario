const { request, response } = require("express");
const { RespuestaTramite } = require("../models");



const getRespuestaInterno = async(req=request,res=response)=>{
    const respuesta = await RespuestaTramite.findAll();
    res.json({
        ok:false,
        respuesta
    })
}


module.exports = {
    getRespuestaInterno
}