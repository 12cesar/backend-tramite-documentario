const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Recepcionexterno = require("./recepcionexterno");


class Derivacionexterno extends Model{};

Derivacionexterno.init({
    fecha:{
        type:DataTypes.CHAR
    },
    tramite:{
        type:DataTypes.INTEGER
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
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'derivacion_externo'
});
Derivacionexterno.hasMany(Recepcionexterno,{
    as:'recepcionexterno',
    foreignKey:'idDerivacion'
});
Recepcionexterno.belongsTo(Derivacionexterno,{
    foreignKey:'idDerivacion',
    sourceKey:'id'
});

module.exports = Derivacionexterno