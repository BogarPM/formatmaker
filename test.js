const PDFDocument = require('pdfkit');
const bargraphs = require('./src/graphics/bars')
const { createCakeGraphic } = require('./src/graphics/cake');
const fs = require('fs');
const { transform } = require('pdfkit');

var html_to_pdf = require('html-pdf-node');

function createDefaultDoc() {
    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream('./out/test.pdf')); // write to PDF
    const transform = { x: 50, y: 50, width: 400 };
    const data = {
        axisy: {
            scale: 100,
            unit: 'm',
            divisions: 10

        },
        values: {
            'Producto 1': { value: 32 },
            'Producto 2': { value: 81 },
            'Producto 3': { value: 22 },
            'Producto 4': { value: 71 },
            'Producto 5': { value: 15 },
        },
        promedy: 73.52
    }
    const config = {
        grid: true,
        title: 'Gráfica Promedios denieres'
    }

    let options = { format: 'A4', path:'./htpdf.pdf' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    //let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
    // or //
    let file = { url: "https://example.com" };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
    });



    //doc.pipe(res);                                       // HTTP response
    // bargraphs.createBarGraphic(doc, transform, data, config);
    doc.path(bargraphs.createSvgBarPath(transform, data, config)).stroke();

    //doc.lineTo(0,0).lineWidth()


    // add stuff to PDF here using methods described below...

    // finalize the PDF and end the stream
    doc.end();
}

createDefaultDoc();
