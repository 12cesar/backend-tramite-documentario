const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Derivacioninterno extends Model{};

Derivacioninterno.init({
    fecha:{
        type:DataTypes.CHAR
    },
    tramite:{
        type:DataTypes.INTEGER
    },
    usuarioDerivador:{
        type:DataTypes.STRING
    },
    destinoArea:{
        type:DataTypes.INTEGER
    },
    observacion:{
        type:DataTypes.TEXT
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'derivacion_interno'
})

module.exports = Derivacioninterno