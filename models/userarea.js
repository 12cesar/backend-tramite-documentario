const { Model, DataTypes } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = require('../db/dbMysql');

class Userarea extends Model{};


Userarea.init({
    idArea:{
        type:DataTypes.INTEGER
    },
    idUsuario:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'usuario_area'
});


module.exports = Userarea;