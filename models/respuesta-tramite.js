const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class RespuestaTramite extends Model{};


RespuestaTramite.init({
    codigo:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'respuesta_tramite',
    timestamps:false
});




module.exports = RespuestaTramite

