const { request, response } = require("express");



const getDerivadoInternos = (req=request,res=response)=>{
    res.json({
        ok:true
    })
}

const getDerivadoInterno = (req=request,res=response)=>{
    res.json({
        ok:true
    })
}

const postDerivadoInterno = (req=request,res=response)=>{
    res.json({
        ok:true
    })
}

const putDerivadoInterno = (req=request,res=response)=>{
    res.json({
        ok:true
    })
}

const deleteDerivadoInterno = (req=request,res=response)=>{
    res.json({
        ok:true
    })
}


module.exports = {
    getDerivadoInternos,
    getDerivadoInterno,
    postDerivadoInterno,
    putDerivadoInterno,
    deleteDerivadoInterno
}