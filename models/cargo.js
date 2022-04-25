const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Usuario = require("./user");


class Cargo extends Model{}


Cargo.init({
    nombre:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'cargo',
    timestamps:false
});

Cargo.hasMany(Usuario,{
    as:'cargo',
    foreignKey:'tipoCargo'
});
Usuario.belongsTo(Cargo,{
    foreignKey:'tipoCargo',
    sourceKey:'id'
})

module.exports = Cargo;