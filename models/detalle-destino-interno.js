const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class DetalleDestinoInterno extends Model{}


DetalleDestinoInterno.init({
    idDestino:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.CHAR,
    },
    codigoDocumento:{
        type:DataTypes.CHAR,
    },
    observacion:{
        type:DataTypes.TEXT,
    },
    idRespuesta:{
        type:DataTypes.INTEGER,
    }
},{
    sequelize,
    tableName:'detalle_destino_interno',
    timestamps:false
});

module.exports = DetalleDestinoInterno;