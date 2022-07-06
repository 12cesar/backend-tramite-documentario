const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Documentofirmainterno extends Model{};


Documentofirmainterno.init({
    idDocumento:{
        type:DataTypes.INTEGER
    },
    archivo:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_firma_interno',
    timestamps:false
});


module.exports = Documentofirmainterno;