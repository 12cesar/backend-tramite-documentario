const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Tipodocumento extends Model{};

Tipodocumento.init({
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'tipo_documento'
});


module.exports = Tipodocumento