const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Codigodocumento extends Model{};

Codigodocumento.init({
    codigo:{
        type:DataTypes.CHAR
    },
    idArea:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'codigo_documento'
})