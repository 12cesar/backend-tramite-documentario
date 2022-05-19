const {
  Documentointerno,
  Area,
  Codigodocumento,
  Tipodocumento,
  Userarea,
  Usuario,
} = require("../models");

const fcPdfInterno = async (codigo) => {
  const doc = await Documentointerno.findOne({
    where: {
      codigoDocumento: codigo,
    },
  });
  const codigoArray = codigo.split("-");
  const tipoDoc = await Tipodocumento.findOne({
    where: {
      sigla: codigoArray[2],
    },
  });
  const codigoUniq = await Codigodocumento.findOne({
    where: {
      codigoUnico: codigo,
    },
  });
  const area = await Area.findOne({
    where: {
      sigla: codigoArray[0],
    },
  });
  const arrayFe = doc.fecha.split("-");
  const event = new Date(
    Date.UTC(Number(arrayFe[0]), Number(arrayFe[1]) - 1, 13, 3, 0, 0)
  );
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const destinoArray = doc.destino.split(",");
  let destino = "";
  for (let i = 0; i < destinoArray.length; i++) {
    const userarea = await Userarea.findOne({
      include: [
        {
          model: Usuario,
          where: {
            tipoCargo: 2,
            habilitado: 1,
          },
        },
        {
          model: Area,
          as: "areauser",
        },
      ],
      where: {
        idArea: destinoArray[i],
      },
    });

    if ([i] < 1) {
      destino += `<h5 style="margin-top:-15px;
        margin-left: 113px; font-size:12px;">${userarea.Usuario.nombre.toUpperCase()} ${userarea.Usuario.apellido.toUpperCase()}</h5>
        <h6 style="margin-bottom: -15px;">${userarea.areauser.nombre}</h6>`;
    } else if ([i] >= 1) {
      destino += `<h5 style="margin-left: 113px; font-size:12px;">${userarea.Usuario.nombre.toUpperCase()} ${userarea.Usuario.apellido.toUpperCase()}</h5>
        <h6 style="margin-bottom: -15px;">${userarea.areauser.nombre}</h6>`;
    }
  }

  return envio = {
    destino,
    area: `${area.nombre}`,
    descripcion: `${doc.descripcion}`,
    fecha: `${event.toLocaleDateString("pe-PE", option)}`,
    referencia: doc.referencia
      ? `${doc.referencia}`
      : null,
    nombre: `${tipoDoc.nombre}`,
    numero: `${codigoArray[1]}`,
    ano: `${codigoUniq.ano}`,
    textoNumeracion: `${area.textoNumeracion}`,
    asunto:`${doc.asunto}`
  };
};

module.exports = {
  fcPdfInterno,
};
