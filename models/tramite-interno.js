const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Derivacioninterno = require("./derivacioninterno");

class Tramiteinterno extends Model{};

Tramiteinterno.init({
    codigo:{
        type:DataTypes.CHAR
    },
    asunto:{
        type:DataTypes.STRING
    },
    referencia:{
        type:DataTypes.STRING
    },  
    fecha:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    },
    idArea:{
        type:DataTypes.INTEGER
    },
    codigoDocumento:{
        type:DataTypes.CHAR
    },
    observacion:{
        type:DataTypes.STRING
    },
    hora:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'tramite_interno'
});

Tramiteinterno.hasMany(Derivacioninterno,{
    as:'derivacioninterno',
    foreignKey:'tramite'
});
Derivacioninterno.belongsTo(Tramiteinterno,{
    foreignKey:'tramite',
    sourceKey:'id'
});


module.exports = Tramiteinterno;