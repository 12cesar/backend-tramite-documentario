const { response, request } = require("express");


const postDocumentoInterno = (req = request,res=response) =>{
    res.json({
        ok:true
    })
}






module.exports = {
    postDocumentoInterno
}