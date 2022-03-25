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