const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Tipodocumento extends Model{};

Tipodocumento.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type: DataTypes.CHAR
    },  
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_documento',
    timestamps:false
});


module.exports = Tipodocumento