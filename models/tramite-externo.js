const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Derivacionexterno = require("./derivacionexterno");


class Tramiteexterno extends Model{};


Tramiteexterno.init({
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
    folio:{
        type:DataTypes.CHAR
    },
    destino:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.TEXT
    },
    idRemitente:{
        type:DataTypes.INTEGER
    },
    idUsuario:{
        type:DataTypes.INTEGER
    },
    idArea:{
        type:DataTypes.INTEGER
    },
    estadoTramite:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'tramite_externo'
});


Tramiteexterno.hasMany(Derivacionexterno,{
    as:'derivacionexterno',
    foreignKey:'tramite'
})
Derivacionexterno.belongsTo(Tramiteexterno,{
    foreignKey:'tramite',
    sourceKey:'id'
})

module.exports = Tramiteexterno;