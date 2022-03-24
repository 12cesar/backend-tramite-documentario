const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Remitente extends Model{};


Remitente.init({
    idPersona:{
        type:DataTypes.INTEGER
    },
    tipoPersona:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    tableName:'remitente'
});


module.exports = Remitente