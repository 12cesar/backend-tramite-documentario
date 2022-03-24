const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Documentointerno extends Model{};


Documentointerno.init({
    codigoDoc:{
        type:DataTypes.INTEGER
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
    descripcion:{
        type:DataTypes.TEXT
    },
    idTramite:{
        type:DataTypes.INTEGER
    },
    estadoDocumento:{
        type:DataTypes.TINYINT
    },
    tipoDocumento:{
        type:DataTypes.TINYINT
    },
    usuario:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_interno'
});

module.exports = Documentointerno;