const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Remitente = require("./remitente");

class Tipopersona extends Model{};


Tipopersona.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type: DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_persona'
});

Tipopersona.hasMany(Remitente,{
    as:'tipoPersonas',
    foreignKey:'tipoPersona'
});

Remitente.belongsTo(Tipopersona,{
    foreignKey:'tipoPersona',
    sourceKey:'id'
});

module.exports = Tipopersona;