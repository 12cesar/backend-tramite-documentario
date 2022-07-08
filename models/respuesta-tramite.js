const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const DetalleDestinoInterno = require("./detalle-destino-interno");


class RespuestaTramite extends Model{};


RespuestaTramite.init({
    codigo:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'respuesta_tramite',
    timestamps:false
});

RespuestaTramite.hasMany(DetalleDestinoInterno,{
    as:'detalledestinointer',
    foreignKey:'idRespuesta'
});

DetalleDestinoInterno.belongsTo(RespuestaTramite,{
    foreignKey:'idRespuesta',
    sourceKey:'id'
})


module.exports = RespuestaTramite

