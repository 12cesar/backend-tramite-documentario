const { response, request } = require("express");
const { funcUserArea } = require("../helpers/fc-area");
const funDate = require("../helpers/generar-fecha");
const Userarea = require("../models/userarea");


const postDocumentoInterno = async(req = request,res=response) =>{
    const {tipoDocumento,...data} = req.body;
    const user = req.usuarioToken;
    const idArea = await funcUserArea(user.id);
    const {fecha,hora,ano} = funDate();
    
    res.json({
        ok:true,
        body,
        user,
        idArea
    })
}






module.exports = {
    postDocumentoInterno
}