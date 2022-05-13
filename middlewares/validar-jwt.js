const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id,idArea} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (usuario.habilitado === 0) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.usuarioToken = usuario;
        req.idArea = idArea;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
module.exports = {
    validarJWT  
}