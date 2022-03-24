const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Estadotramite extends Model{};


Estadotramite.init({
    nombre:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'estado_tramite'
});


module.exports = Estadotramite;