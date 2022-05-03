const { response } = require('express');
const jwt = require('jsonwebtoken');
const generarJWT = (id = '', idArea='',cargo='') =>{
    return new Promise((resolve, reject)=> {
        const payload = {id,idArea,cargo};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '7h'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}
module.exports = {
    generarJWT
}