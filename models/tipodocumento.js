const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Codigodocumento = require("./codigodocumento");


class Tipodocumento extends Model{};

Tipodocumento.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type: DataTypes.CHAR
    },  
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_documento',
    timestamps:false
});

Tipodocumento.hasMany(Codigodocumento,{
    as:'tipodocumento',
    foreignKey:'tipoDocumento'
});

Codigodocumento.belongsTo(Tipodocumento,{
    foreignKey:'tipoDocumento',
    sourceKey:'id'
})

module.exports = Tipodocumento