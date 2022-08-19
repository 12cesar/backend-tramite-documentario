const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class EjemploDocument extends Model{}

EjemploDocument.init({
    titulo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    contenido:{
        type:DataTypes.TEXT
    },
    idUsuario:{
        type:DataTypes.INTEGER
    }

},{
    sequelize,
    tableName:'ejemplo_documento',
    timestamps:false
});


module.exports = EjemploDocument;


