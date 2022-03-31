const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Estadotramite extends Model{};


Estadotramite.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'estado_tramite'
});


module.exports = Estadotramite;