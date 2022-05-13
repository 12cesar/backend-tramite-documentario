const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');


class Documentoadjuntarinterno extends Model{};


Documentoadjuntarinterno.init({
    idDocumento:{
        type:DataTypes.INTEGER
    },
    archivo:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'documento_anexo_interno',
    timestamps:false
});

module.exports = Documentoadjuntarinterno