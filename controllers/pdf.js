const { response,request } = require("express");
const PDFDocument = require('pdfkit-construct');
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const pdfHtml = require("pdf-creator-node");
const {Documentointerno, Tipodocumento, Codigodocumento, Area, Userarea, Usuario} = require("../models");

const pdfDocInter = async(req=request,res=response)=>{

  const {codigo} = req.query;
  const doc = await Documentointerno.findOne({
      where:{
          codigoDocumento:codigo
      }
  });
  let template = path.join(__dirname,'../document/','html', 'documento-interno.html')
  let filename = template.replace('.html', '.pdf');
  let html = fs.readFileSync(template,'utf-8');
  
  const options = {
    "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape
  }
  const codigoArray = codigo.split('-');
  const documentoInterno = await Documentointerno.findOne({
      where:{
          codigoDocumento:codigo
      }
  })
  const tipoDoc = await Tipodocumento.findOne({
      where:{
          sigla:codigoArray[2]
      }
  });
  const codigoUniq = await Codigodocumento.findOne({
      where:{
          codigoUnico:codigo
      }
  });
  const area = await Area.findOne({
      where:{
          sigla:codigoArray[0]
      }
  })
  console.log(tipoDoc);
  console.log(codigoArray);
  console.log(codigoUniq);
  console.log(area);
  console.log(documentoInterno.referencia);
  const arrayFe = doc.fecha.split('-');
  const event = new Date(Date.UTC(Number(arrayFe[0]), Number(arrayFe[1])-1, 13, 3, 0, 0));
  const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  html = html.replace("{{documento}}",`${tipoDoc.nombre} N° ${codigoArray[1]} - ${codigoUniq.ano}- GRU-DIRESA-${area.textoNumeracion}`)
  html = html.replace("{{a}}",'Ing. Doris Jeamile Irene Diaz');
  html = html.replace("{{destino}}",'DIRECTORA DE LA OFICINA DE ESTADISTICA, INFORMATICA Y TELECOMUNICACIONES');
  html = html.replace("{{asunto}}",`${doc.asunto}`);
  if (documentoInterno.referencia) {
      html= html.replace('{{referencia}}',`<h5>Referencia <b style="margin-left: 15px;
      margin-right: 20px;">:</b> ${documentoInterno.referencia}</h5>`)
  }else{
      html=html.replace('{{referencia}}','');
  }
  const destinoArray = documentoInterno.destino.split(',');
  console.log(destinoArray);
  const userarea = await Userarea.findOne({
      include:[
        {
            model:Usuario,
            where:{
                tipoCargo:2,
                habilitado:1
            }
        },
        {
            model:Area,
            as:'areauser'
        }
      ],
      where:{
          idArea:destinoArray[0]
      }
  });
  console.log(userarea);
  html = html.replace("{{fecha}}",`${event.toLocaleDateString('pe-PE', option)}`);
  html = html.replace("{{descripcion}}",`${doc.descripcion}`);
  html = html.replace("{{diresa}}","Direccion Regional de Salud Ucayali");
  html = html.replace("{{area}}",`${area.nombre}`);
  let ubicacion = path.join(__dirname,'../document/','pdf','documento-interno.pdf');
  pdf.create(html, options).toFile(ubicacion, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(resp.filename);
    }
  });
}


const getDocumentoInternoPdf = (req=request,res=response)=>{
    const doc = new PDFDocument({
        size: 'A4',
        margins: {top: 20, left: 10, right: 10, bottom: 20},
        bufferPages: true,
    });

    const stream = res.writeHead(200,{
        'Content-Type':'application/pdf',
        'Content-disposition':'attachment;filename=prueba.pdf'
    });

    doc.on('data',(data)=>{
        stream.write(data)
    });
    doc.on('end',()=>{
        stream.end();
    })

    
    doc.setDocumentHeader({
    }, () => {
        doc.lineJoin('miter')
            .rect(0, 0, 100, doc.header.options.heightNumber).fill("#fff");

        doc.fill("black")
            .fontSize(11)
            .text("GOBIERNO REGIONAL UCAYALI", doc.header.x, doc.header.y,{
                align:'center',
                
            });
            doc.fill("black")
            .fontSize(10)
            .text("DIRECCION REGIONAL DE SALUD UCAYALI", doc.header.x, doc.header.y+15,{
                align:'center',
                
            });
            doc.fill("black")
            .fontSize(9)
            .text("Oficina Ejecutiva de Planeamiento, Finanzas Gestion Institucional", doc.header.x, doc.header.y+30,{
                align:'center',
                
            });
            doc.fill("black")
            .fontSize(8)
            .text("'Año del Fortalecimiento de la Soberania Nacional'", doc.header.x, doc.header.y+45,{
                align:'center',
                
            });
            const image1 = path.join(__dirname, '../uploads/','logo','gobierno.png')
            const image2 = path.join(__dirname, '../uploads/','logo','logo.jpg')
            doc.image(image1, doc.header.x+45, doc.header.y-8, { width: 50 })
            doc.image(image2, doc.header.x+470, doc.header.y-7, { width: 65 })
    });

    

    // set the footer to render in every page
    doc.setDocumentFooter({}, () => {

        doc.lineJoin('miter')
            .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#c2edbe");

        doc.fill("#7416c8")
            .fontSize(8)
            .text("Hello world footer", doc.footer.x, doc.footer.y + 10);
        
    });

    doc.render();
    
    
    doc.end();
}

const getPruebaPdf = (req=request,res=response) =>{
    const document = path.join(__dirname,'../uploads/','prueba2.html');
    const img1 = path.join(__dirname,'../uploads/','logo','imagen.png')
    let html = fs.readFileSync(document,'utf-8');
    const options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        
        footer: {
            height: "28mm",
            contents: {
                first: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };
    const ubicacion = path.join(__dirname,'../uploads/prueba2.pdf');
    const documentPdf = {
        html: html,
        data: {},
        path: `${ubicacion}`,
        type: "",
      };

pdfHtml.create(documentPdf, options)
  .then((resp) => {
    console.log(resp);
    res.sendFile(resp.filename);
  })
  .catch((error) => {
    console.error(error);
  });
}

module.exports = {
    pdfDocInter,
    getDocumentoInternoPdf,
    getPruebaPdf
}