const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Tramiteadjuntarexterno extends Model{};


Tramiteadjuntarexterno.init({
    idTramite:{
        type:DataTypes.INTEGER
    },
    documentoAdjuntar:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'tramite_adjuntar_externo'
});


module.exports = Tramiteadjuntarexterno;