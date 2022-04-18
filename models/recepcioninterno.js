const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Recepcioninterno extends Model{};

Recepcioninterno.init({
    fechaRecepcion:{
        type:DataTypes.CHAR
    },
    fechaDerivacion:{
        type:DataTypes.CHAR
    },
    usuarioRecepciona:{
        type:DataTypes.STRING
    },
    idDerivacion:{
        type:DataTypes.INTEGER
    },
    estado:{    
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    horaRecepcion:{
        type:DataTypes.CHAR
    },
    horaDerivacion:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'recepcion_interno'
});


module.exports = Recepcioninterno;