
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
class Personanatural extends Model{};

Personanatural.init({
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    dni:{
        type:DataTypes.CHAR
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.CHAR
    },
    direccion:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'personalnatural'
});


module.exports = Personanatural