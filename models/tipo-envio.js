const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Documentointerno = require("./documentointerno");


class TipoEnvio extends Model{};


TipoEnvio.init({
    codigo:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
},{
    sequelize,
    tableName:'tipo_envio',
    timestamps:false
});

TipoEnvio.hasMany(Documentointerno,{
    as:'tipoenviodoc',
    foreignKey:'tipoEnvio'
});
Documentointerno.belongsTo(TipoEnvio,{
    foreignKey:'tipoEnvio',
    sourceKey:'id'
})



module.exports = TipoEnvio


