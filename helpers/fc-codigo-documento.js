const { QueryTypes } = require("sequelize");
const sequelize = require("../db/dbMysql");
const { Tipodocumento, Codigodocumento, Area } = require("../models");

const codigoDocumen = async (idArea, ano, tipoDocumento) => {
  try {
    let codigo;
    const codg = await sequelize.query(
      'SELECT * FROM codigo_documento where idArea = '+idArea+' and ano = '+ano +' and tipoDocumento = '+tipoDocumento +' order by codigo desc limit 1',
      { type: QueryTypes.SELECT }
    );
    if (codg[0]) {
      const numero = `${Number(codg[0].codigo) + 1}`;
      codigo = numero.padStart(5, "0");
    }
    else if (!codg[1]) {
      const numero = "1";
      codigo = numero.padStart(5, "0");
    }
    const { sigla: siglaDoc } = await Tipodocumento.findOne({
      where: {
        id: tipoDocumento,
      },
    });
    const { sigla } = await Area.findOne({
      where: {
        id: idArea,
      },
    });
    const anoCor = `${ano}`.slice(2);
    const codigoUnic = `${sigla}-${codigo}-${siglaDoc}-${anoCor}`;
    const { codigoUnico } = await Codigodocumento.create({
      codigoUnico: codigoUnic,
      codigo,
      tipoDocumento: tipoDocumento,
      idArea: idArea,
      ano: ano,
    });

    return codigoUnico;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  codigoDocumen,
};
