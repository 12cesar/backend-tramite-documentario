const { response,request } = require("express");
const PDFDocument = require('pdfkit-construct');
const fs = require('fs');
const path = require("path");

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
            .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

        doc.fill("#115dc8")
            .fontSize(20)
            .text("Hello world header", doc.header.x, doc.header.y);
    });

    

    // set the footer to render in every page
    doc.setDocumentFooter({}, () => {

        doc.lineJoin('miter')
            .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#c2edbe");

        doc.fill("#7416c8")
            .fontSize(8)
            .text("Hello world footer", doc.footer.x, doc.footer.y + 10);
        
    });

    doc.text('hola mundo con PDF Kit',100,100);
    doc.text('hola mundo con PDF Kit',100,200);
    doc.text('hola mundo con PDF Kit',100,500);
    doc.text('hola mundo con PDF Kit',100,600);
    doc.text('hola mundo con PDF Kit',100,1600);

    doc.render();
    
    
    doc.end();
}



module.exports = {
    getDocumentoInternoPdf
}