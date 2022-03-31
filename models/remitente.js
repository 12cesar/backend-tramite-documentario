const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Tramiteexterno = require("./tramite-externo");


class Remitente extends Model{};


Remitente.init({
    nombre:{
        type:DataTypes.STRING
    },
    documento:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    fecha:{
        type: DataTypes.CHAR
    },
    password:{
        type: DataTypes.STRING
    },
    direccion:{
        type:DataTypes.STRING
    },
    habilitado:{
        type: DataTypes.TINYINT,
        defaultValue:1
    },
    tipoPersona:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    tableName:'remitente'
});

Remitente.hasMany(Tramiteexterno,{
    as:'remitenteExterno',
    foreignKey:'idRemitente'
});

Tramiteexterno.belongsTo(Remitente,{
    foreignKey:'idRemitente',
    sourceKey:'id'
})

module.exports = Remitente