const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Tipopersona extends Model{};


Tipopersona.init({
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'tipo_persona'
});

module.exports = Tipopersona;