const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Tramiteinterno = require("./tramite-interno");


class Estadotramite extends Model{};


Estadotramite.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.STRING
    },
    habilitado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'estado_tramite'
});

/* Tramite interno */
Estadotramite.hasMany(Tramiteinterno,{
    as:'estadotramiteinterno',
    foreignKey:'estadoTramite'
});

Tramiteinterno.belongsTo(Estadotramite,{
    foreignKey:'estadoTramite',
    sourceKey:'id'
})


module.exports = Estadotramite;