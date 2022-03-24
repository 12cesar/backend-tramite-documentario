const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


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


module.exports = Tramiteexterno;