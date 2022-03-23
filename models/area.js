const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Area extends Model{}


Area.init({
    nombre:{
        type: DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.TEXT
    },
    sigla:{
        type: DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    idDireccion:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'area'
});



module.exports = Area;