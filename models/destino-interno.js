const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const DetalleDestinoInterno = require("./detalle-destino-interno");


class DestinoInterno extends Model  {};


DestinoInterno.init({
    codigoTramite:{
        type:DataTypes.CHAR
    },
    destinoArea:{
        type:DataTypes.INTEGER
    },
    accion:{
        type:DataTypes.STRING
    },
    atendido:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    estadoRecepcion:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'destino_interno',
    timestamps:false
});


DestinoInterno.hasMany(DetalleDestinoInterno,{
    as:'detalledestinointerno',
    foreignKey:"idDestino"
});
DetalleDestinoInterno.belongsTo(DestinoInterno,{
    foreignKey:"idDestino",
    sourceKey:"id"
})

module.exports = DestinoInterno