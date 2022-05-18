const { response,request } = require("express");
const PDFDocument = require('pdfkit-construct');
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const pdfHtml = require("pdf-creator-node");

const pdfDocInter = (req=request,res=response)=>{
  let template = path.join(__dirname,'../uploads/','html-pdf', 'documento-interno.html')
  let filename = template.replace('.html', '.pdf');
  let html = fs.readFileSync(template,'utf-8');
  const options = {
    "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape
    "localUrlAccess": true,
  }

  let ubicacion = path.join(__dirname,'../uploads/','pdf','documento-interno.pdf')
  pdf.create(html, options).toFile(ubicacion, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
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