const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Recepcionexterno extends Model{};

Recepcionexterno.init({
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
    },
    hora:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'recepcion_externo'
});


module.exports = Recepcionexterno;