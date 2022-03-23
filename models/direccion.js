const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Direccion extends Model{}


Direccion.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'direccion'
});


module.exports = Direccion