const { request, response } = require("express");



const getDerivacionExternos = async(req=request,res=response)=>{
    res.json({
        ok:true
    });
}

const getDerivacionExterno = async(req=request,res=response)=>{
    res.json({
        ok:true
    });
}

const postDerivacionExterno = async(req=request,res=response)=>{
    const body = req.body;
    res.json({
        ok:true,
        body
    });
}
const putDerivacionExterno = async(req=request,res=response)=>{
    res.json({
        ok:true
    });
}
const deleteDerivacionExterno = async(req=request,res=response)=>{
    res.json({
        ok:true
    });
}
module.exports = {
    getDerivacionExternos,
    getDerivacionExterno,
    postDerivacionExterno,
    putDerivacionExterno,
    deleteDerivacionExterno
}