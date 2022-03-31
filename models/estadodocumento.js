const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Estadodocumento extends Model{};


Estadodocumento.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'estado_documento'
});


module.exports = Estadodocumento;