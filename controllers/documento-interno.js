const { response, request } = require("express");
const { funcUserArea } = require("../helpers/fc-area");
const funDate = require("../helpers/generar-fecha");
const Userarea = require("../models/userarea");


const postDocumentoInterno = async(req = request,res=response) =>{
    const {archivo}= req.files;
    const body= req.body;
    res.json({
        ok:true,
        body,
        archivo
    })
}






module.exports = {
    postDocumentoInterno
}