const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Estadodocumento extends Model{};


Estadodocumento.init({
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'estado_documento'
});


module.exports = Estadodocumento;