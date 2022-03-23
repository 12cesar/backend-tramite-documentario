const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Usuario extends Model{}


Usuario.init({
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    domicilio:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.CHAR
    },
    email:{
        type:DataTypes.STRING
    },
    nacimiento:{
        type:DataTypes.CHAR
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    dni:{
        type:DataTypes.CHAR
    },
    password:{
        type:DataTypes.STRING
    },
    tipoCargo:{
        type:DataTypes.INTEGER
    },
    createdAt: false,
},{
    sequelize,
    tableName:'usuario_interno'
});


module.exports = Usuario;