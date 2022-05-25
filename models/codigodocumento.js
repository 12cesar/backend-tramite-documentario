const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Tramiteinterno = require("./tramite-interno");

class Codigodocumento extends Model{};

Codigodocumento.init({
    codigoUnico:{
        type : DataTypes.CHAR,
        primaryKey: true
    },
    codigo:{
        type:DataTypes.CHAR
    },
    tipoDocumento:{
        type:DataTypes.INTEGER
    },
    idArea:{
        type:DataTypes.INTEGER
    },
    ano:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'codigo_documento',
    timestamps:false
});

Codigodocumento.hasMany(Tramiteinterno,{
    as:'tramitedocinterno',
    foreignKey:"codigoDocumento"
});
Tramiteinterno.belongsTo(Codigodocumento,{
    foreignKey:"codigoDocumento",
    sourceKey:"codigoUnico"
})


module.exports = Codigodocumento