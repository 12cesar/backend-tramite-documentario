const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Tramiteinterno = require("./tramite-interno");
class Estadotramite extends Model{};

Estadotramite.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.CHAR 
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }    
},{
    sequelize,
    tableName:'estado_tramite',
    timestamps: false,
});


module.exports = Estadotramite;