const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Recepcioninterno extends Model{};

Recepcioninterno.init({
    fecha:{
        type:DataTypes.CHAR
    },
    usuarioRecepciona:{
        type:DataTypes.STRING
    },
    idDerivacion:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    tableName:'recepcion_interno'
});


module.exports = Recepcioninterno;