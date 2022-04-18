const { request, response } = require("express");
const funDate = require("../helpers/generar-fecha");
const { Userarea, Derivacionexterno, Usuario, Tramiteexterno, Area, Recepcionexterno } = require("../models");



const getDerivacionExternos = async(req=request,res=response)=>{
    try {
        const {habilitado, estado} = req.query;
    const user = req.usuarioToken;
    const {areauser:{id,...data}} = await Userarea.findOne(
        {
            include:{
                as:'areauser',
                model:Area
            },
            where:{
                idUsuario:user.id
            }
        }
    )
    const derivacionexter = await Derivacionexterno.findAll(
      {
        include:[
          {
            model:Tramiteexterno
          },
          {
            model:Area
          }
        ],  
        where:{
          destinoArea:id,
          estado:Number(estado),
          habilitado:Number(habilitado)
        }
      }
    )

  res.json({
    ok: true,
    msg:'Derivaciones mostrado con exito',
    derivacionexter
  });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error al mostrar las derivaciones externas, error: ${error}`
        })
    }
}

const getDerivacionExterno = async(req=request,res=response)=>{

    res.json({
        ok:true
    });
}

const postDerivacionExterno = async(req=request,res=response)=>{
    try {
    const {idDerivacion,...data}  = req.body;
    const {fecha,hora} = funDate();
    data.fecha = fecha;
    const busqDerivacion = await Derivacionexterno.update({
        estado:1
    },{
        where:{
            id:idDerivacion
        }
    })
    const derivacionexter = await Derivacionexterno.create(data);
    const recepcionexter = await Recepcionexterno.create({
      idDerivacion: derivacionexter.id,
      fechaDerivacion:fecha,
      horaDerivacion:hora
    });
    res.json({
      ok: true,
      msg: "se derivo el documento al area destino",
      derivacionexter
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error al derivar el documento, Error: ${error}`,
    });
  }
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