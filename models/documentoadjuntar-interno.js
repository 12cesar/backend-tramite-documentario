const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Documentoadjuntarinterno extends Model{};


Documentoadjuntarinterno.init({
    idDocumento:{
        type:DataTypes.INTEGER
    },
    documento:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_adjuntar_interno'
});

module.exports = Documentoadjuntarinterno