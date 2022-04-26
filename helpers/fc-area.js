const Userarea = require("../models/userarea");



const funcUserArea = async(id)=>{
    const {idUsuario, idArea} = await Userarea.findOne({
        where:{
            idUsuario:id
        }
    });

    return idArea;
}


module.exports = {
    funcUserArea
}