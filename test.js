const PDFDocument = require('pdfkit');
const bargraphs = require('./src/graphics/bars')
const fs = require('fs')

function createDefaultDoc() {
    const doc = new PDFDocument({size:'A4'});
    doc.pipe(fs.createWriteStream('./out/test.pdf')); // write to PDF
    //doc.pipe(res);                                       // HTTP response
    bargraphs.createBarGraphic(doc,{x:50,y:50,minwidth:500},{
        axisy:{
            scale:100,
            unit:'m',
            divisions: 10
        },
        values: {
            'Producto 1':{value: 32},
            'Producto 2':{value: 81},
            'Producto 3':{value: 22},
            'Producto 4':{value: 71},
            'Producto 5':{value: 15},
        },
        promedy: 41
    })
    
    

    // add stuff to PDF here using methods described below...

    // finalize the PDF and end the stream
    doc.end();
}

createDefaultDoc();