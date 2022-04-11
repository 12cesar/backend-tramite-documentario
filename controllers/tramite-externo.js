const { response,request } = require("express");


const getTramiteExternos =async(req=request,res=response)=>{
    res.json({
        ok:true
    })
}
const getTramiteExterno =async(req=request,res=response)=>{
    res.json({
        ok:true
    })
}
const postTramiteExterno =async(req=request,res=response)=>{
    const body = req.body;
    res.json({
        ok:true,
        body
    })
}
const putTramiteExterno =async(req=request,res=response)=>{
    res.json({
        ok:true
    })
}
const deleteTramiteExterno =async(req=request,res=response)=>{
    res.json({
        ok:true
    })
}

module.exports = {
    getTramiteExternos,
    getTramiteExterno,
    postTramiteExterno,
    putTramiteExterno,
    deleteTramiteExterno
}