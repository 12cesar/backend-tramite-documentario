const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Tipodocumento extends Model{};

Tipodocumento.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_documento'
});


module.exports = Tipodocumento