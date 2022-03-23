const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


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
    tableName:'cargo'
});


module.exports = Cargo;