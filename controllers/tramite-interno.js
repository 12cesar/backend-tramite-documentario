const { request, response } = require("express");
const { Userarea, Usuario, Area, Tramiteinterno } = require("../models");



const getTramiteInternos =async(req=request, res=response)=>{
    const {id} = req.usuarioToken;
    const {idArea, idUsuario} = await Userarea.findOne({
        attributes:['id','idArea','idUsuario'],
        include:[
            {
                model:Usuario,
                attributes:['id','nombre','apellido']
            },
            {
                model:Area,
                attributes:['id','nombre']
            }
        ]
    },{where:{idUsuario:id}});
    const tramiteinter = await Tramiteinterno.findAll({
        where:{
            idArea
        }
    });
    res.json({
        ok:true,
        tramiteinter
    })
}

const getTramiteInterno =async(req=request, res=response)=>{
    
    res.json({
        ok:true
    })
}
const postTramiteInterno =async(req=request, res=response)=>{
    const {ano, ...data} = req.body;
    const {id} = req.usuarioToken;
    const {idArea, idUsuario} = await Userarea.findOne({
        attributes:['id','idArea','idUsuario'],
        include:[
            {
                model:Usuario,
                attributes:['id','nombre','apellido']
            },
            {
                model:Area,
                attributes:['id','nombre']
            }
        ]
    },{where:{idUsuario:id}});
    const count = await Tramiteinterno.count({
        where:{
            idArea,
            ano
        }
    })
    data.codigo = `${count+1}`;
    data.ano=ano;
    data.idArea = idArea;
    data.idUsuario=idUsuario;
    const tramiteinter = await Tramiteinterno.create(data)
    res.json({
        ok:true,
        msg:'Tramite interno creado con exito',
        tramiteinter

    })
}
const putTramiteInterno =async(req=request, res=response)=>{
    res.json({
        ok:true
    })
}
const deleteTramiteInterno =async(req=request, res=response)=>{
    res.json({
        ok:true
    })
}


module.exports = {
    getTramiteInternos,
    getTramiteInterno,
    postTramiteInterno,
    putTramiteInterno,
    deleteTramiteInterno
}