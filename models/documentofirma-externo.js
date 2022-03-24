const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Documentofirmaexterno extends Model{};


Documentofirmaexterno.init({
    idDocumento:{
        type:DataTypes.INTEGER
    },
    documentoFirma:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_firma_externo'
});


module.exports = Documentofirmaexterno;