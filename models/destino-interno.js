const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


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



module.exports = DestinoInterno