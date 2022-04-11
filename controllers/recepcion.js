const { request,response } = require("express");
const {Recepcionexterno, Recepcioninterno, Derivacioninterno, Derivacionexterno} = require("../models");
const recepcionPut = async(req=request, res= response)=>{
    try {
    const {id, coleccion} =req.params;
    const {id:ids} = req.usuarioToken;
    const date = new Date();
    const output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')+ '-' + String(date.getDate()).padStart(2, '0');
    const fecha = output;
    const separ = String(date).split(' ');
    const hora = separ[4];
    let modelo;
    switch (coleccion) {
        case 'interno':
            modelo = await Recepcioninterno.findOne(
                {
                    where:{
                        idDerivacion:Number(id)
                    }
                }
            )
            if (!modelo) {
                return res.status(400).json({
                    ok:false,
                    msg:'No se encontro la recepcion'
                });
            }
            const derivacioninter = await Derivacioninterno.update({
                estado:1
            },{
                where:{
                    id:modelo.idDerivacion
                }
            })
            break;
        case 'externo':
            modelo = await Recepcionexterno.findOne(
                {
                    where:{
                        idDerivacion:Number(id)
                    }
                }
            )
            if (!modelo) {
                return res.status(400).json({
                    ok:false,
                    msg:'No se encontro la recepcion'
                });
            }
            const derivacionexter = await Derivacionexterno.update({
                estado:1
            },{
                where:{
                    id:modelo.idDerivacion
                }
            })
            break;
        default:
            break;
    }
    modelo.fechaRecepcion = fecha;
    modelo.usuarioRecepciona = ids;
    modelo.horaRecepcion = hora;
    modelo.estado =1;
    await modelo.save();
    res.json({
        ok:true,
        msg:'Se recepciono el tramite',
        modelo
    })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error al recepcionar, Error: ${error}`
        });
    }
}



module.exports = {
    recepcionPut
}