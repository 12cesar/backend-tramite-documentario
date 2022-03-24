const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Personajuridica extends Model{}

Personajuridica.init({
    ruc:{
        type:DataTypes.CHAR
    },
    razon:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    direccion:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.CHAR
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'personajuridica'
});
module.exports = Personajuridica;