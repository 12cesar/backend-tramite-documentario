const { Model, DataTypes } = require("sequelize");
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