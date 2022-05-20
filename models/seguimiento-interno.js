const { Model,DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class SeguimientoInterno extends Model{};


SeguimientoInterno.init({
    fechaDerivado:{
        type:DataTypes.CHAR
    },
    horaDerivado:{
        type:DataTypes.CHAR
    },
    fechaRecepcion:{
        type:DataTypes.CHAR
    },
    horaRecepcion:{
        type:DataTypes.CHAR
    },
    codigoTramite:{
        type:DataTypes.CHAR
    },
    idDestino:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'seguimiento_interno',
    timestamps:false
});




module.exports = SeguimientoInterno