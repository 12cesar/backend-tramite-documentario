const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Area = require("./area");


class Direccion extends Model{}


Direccion.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'direccion',
    timestamps:false
});

Direccion.hasMany(Area,{
    as:'direccionarea',
    foreignKey:'idDireccion'
});
Area.belongsTo(Direccion,{
    foreignKey:'idDireccion',
    sourceKey:'id'
})

module.exports = Direccion