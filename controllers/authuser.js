const bcryptjs = require("bcryptjs");
const { response } = require("express")
const { request } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const { Usuario, Userarea, Area, Cargo } = require("../models");


const postLogin = async(req=request, res=response)=>{
    const {dni, password} = req.body;

    const user = await Usuario.findOne({where:{
        dni
    }});

    if (!user) {
        return res.status(400).json({
            ok:false,
            msg:'Dni incorrecto, ingrese uno valido',
            user:null
        });
    }
    // Verificar si el usuario esta activo
    if (user.habilitado === 0) {
        return res.status(400).json({
            ok:false,
          msg: "Usuario bloqueado, converse con el administrador",
          user:null
        });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
          ok:false,
          msg: "Password no valido",
          user:null
      });
    }
    
    const userarea = await Userarea.findOne({
    include:[
        {
            model:Usuario,
            attributes:['id','nombre','apellido','tipoCargo'],
            include:{
                model:Cargo
            }
        },
        {
            model:Area,
            as:'areauser',
            attributes:['id','nombre']
        }
    ],
    where:{
        idUsuario:user.id
    }
    });
    const token = await generarJWT(user.id, userarea.idArea, userarea.Usuario.Cargo.nombre);
    res.json({
        ok:true,
        userarea,
        token
    })
}







module.exports = {
    postLogin
}