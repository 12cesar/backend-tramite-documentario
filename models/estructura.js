const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Estructura extends Model{};

Estructura.init({
    logoDiresa:{
        type:DataTypes.STRING
    },
    logoGobierno:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'estructura',
    timestamps:false
});


module.exports = Estructura;