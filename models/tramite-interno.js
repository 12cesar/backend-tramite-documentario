const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Derivacioninterno = require("./derivacioninterno");

class Tramiteinterno extends Model{};

Tramiteinterno.init({
    codigo:{
        type:DataTypes.CHAR
    },
    asunto:{
        type:DataTypes.STRING
    },
    fecha:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    },
    destino:{
        type:DataTypes.STRING
    },
    idArea:{
        type:DataTypes.INTEGER
    },
    idUsuario:{
        type:DataTypes.INTEGER
    },
    estadoTramite:{
        type:DataTypes.INTEGER
    },
    descripcion:{
        type:DataTypes.TEXT
    },
},{
    sequelize,
    tableName:'tramite_interno'
});

Tramiteinterno.hasMany(Derivacioninterno,{
    as:'derivacioninterno',
    foreignKey:'tramite'
});
Derivacioninterno.belongsTo(Tramiteinterno,{
    foreignKey:'tramite',
    sourceKey:'id'
});


module.exports = Tramiteinterno;