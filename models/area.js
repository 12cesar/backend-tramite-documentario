const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Codigodocumento = require("./codigodocumento");
const Derivacionexterno = require("./derivacionexterno");
const Derivacioninterno = require("./derivacioninterno");
const Userarea = require("./userarea");

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

Area.hasOne(Userarea,{
    as:'areauser',
    foreignKey:'idArea'
});

Userarea.belongsTo(Area,{
    foreignKey:'idArea',
    sourceKey:'id'
});

Area.hasMany(Codigodocumento,{
    as:'codigodocumento',
    foreignKey:'idArea'
});
Codigodocumento.belongsTo(Area,{
    foreignKey:'idArea',
    sourceKey:'id'
})

Area.hasMany(Derivacionexterno,{
    as:'destinoareaexterno',
    foreignKey:'destinoArea'
});

Derivacionexterno.belongsTo(Area,{
    foreignKey:'destinoArea',
    sourceKey:'id'
});

Area.hasMany(Derivacioninterno,{
    as:'destinoareainterno',
    foreignKey:'destinoArea'
});

Derivacioninterno.belongsTo(Area,{
    foreignKey:'destinoArea',
    sourceKey:'id'
});

module.exports = Area;