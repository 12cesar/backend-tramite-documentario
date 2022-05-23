const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Derivacioninterno = require("./derivacioninterno");
const DestinoInterno = require("./destino-interno");

class Tramiteinterno extends Model{};

Tramiteinterno.init({
    codigo:{
        type:DataTypes.CHAR,
        primaryKey:true
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
    tableName:'tramite_interno',
    timestamps:false
});

Tramiteinterno.hasMany(DestinoInterno,{
    as:'codTramite',
    foreignKey:'codigoTramite'
});

DestinoInterno.belongsTo(Tramiteinterno,{
    foreignKey:'codigoTramite',
    sourceKey:'codigo'
})

module.exports = Tramiteinterno;