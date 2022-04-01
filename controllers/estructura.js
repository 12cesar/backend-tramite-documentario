const { request, response } = require("express");
const Estructura = require("../models/estructura");


const getEstructuras = async(req=request, res=response)=> {
    res.json({
        ok:true
    })
}

const getEstructura = async(req=request, res=response)=> {
    res.json({
        ok:true
    })
}

const postEstructura = async(req=request, res=response)=> {
    const {logoDiresa, logoGobierno,nombre} = req.body;
    const estructura = await Estructura.create({
        
    })
    res.json({
        ok:true
    })
}

const putEstructura = async(req=request, res=response)=> {
    res.json({
        ok:true
    })
}

const deleteEstructura = async(req=request, res=response)=> {
    res.json({
        ok:true
    })
}


module.exports = {
    getEstructuras,
    getEstructura,
    postEstructura,
    putEstructura,
    deleteEstructura
}