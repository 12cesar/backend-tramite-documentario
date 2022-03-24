const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Documentoadjuntarexterno extends Model{};


Documentoadjuntarexterno.init({
    idDocumento:{
        type:DataTypes.INTEGER
    },
    documento:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_adjuntar_externo'
});

module.exports = Documentoadjuntarexterno