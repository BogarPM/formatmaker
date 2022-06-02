const PDFDocument = require('pdfkit');
const { getRandomColor } = require('./colors');

const defaultDivisions = 10;
const defaultX = 25;
const defaultY = 25;
var defaultHeigth = 300;
var defaultWidth = 300;
const testcolor = '#000';
const defaultBarWidth = 25; // Default bar width in pixels

/*
    Function to create a bar graphic given data
    params: {
        doc,    //The base document to create the graphic
        transform: {
            x,
            y,
            minwidth,   // Width will depend on how many fields
            height,
            *minheight,
            scale   // Default 1

        },
        data: {
            axisx: {
                scale,  // Values to relate pixel dimension to the dimension of interest to graph on x axis
                unit,
            }
            axisy: {    // In tis case, axis x will be determined by values object, so this can be ignored
                scale,  // Values to relate pixel dimension to the dimension of interest to graph on x axis
                unit,
                divisions
            }
            values: {
                'valname':{
                    value,      // Value muest be specified in scale of axisy
                    *color,     // Pass it as a rgb string, if not defined, randomcolor will be chosen
                }
            },
            promedy: value      // Sets a line in the promedy 
        },
        config: {
            grid,   //default false, if specified, turns grid on

        }
    }
*/

function createBarGraphic(doc,transform,data){
    const { x,y,minwidth,height,minheigth,scale } = transform;
    const { axisx,axisy,values,promedy } = data;
    var H = defaultWidth;
    var W = defaultWidth;
    var gx = defaultX;
    var gy = defaultY;
    if(x != undefined){gx = x;}
    if(y != undefined){gy = y;}
    if(height != undefined){H = height;}
    if(minwidth != undefined) {W = minwidth}
    doc.moveTo(gx,gy);
    doc.lineTo(gx,gy + H).stroke();
    doc.moveTo(gx,gy + H);
    doc.lineTo(gx + W,gy + H).stroke();
    const zeroW = doc.widthOfString('0');
    const zeroH = doc.heightOfString('0');
    //doc.moveTo(gx - zeroW,gy + H);
    doc.text('0',gx - zeroW,gy + H - zeroH)
    // Generate axis y
    const { unit,divisions } = axisy
    const step = axisy.scale/divisions;
    console.log('step');
    console.log(step);
    const pxstep = H/divisions;
    var maxw = 0;
    for (let i = 1; i < divisions + 1; i++) {
        var wval = doc.widthOfString((step*i).toString())
        if(wval >= maxw){maxw = wval;}
        doc.moveTo(gx,gy + H - i*pxstep);
        doc.fillColor('#222')
        doc.lineTo(gx - zeroW - 4,gy + H - i*pxstep).stroke();
        doc.text(i*step,gx - wval,gy + H - i*pxstep - zeroH)
    }
    if(promedy != undefined){
        doc.moveTo(gx,gy + H - promedy/axisy.scale*H);
        doc.lineTo(gx + W,gy + H - promedy/axisy.scale*H).stroke();
    }
    // Print axis y unit
    doc.text(unit,gx - maxw - doc.widthOfString(unit),gy + (H - doc.heightOfString(unit))/2)
    // Now print bars
    const fields = Object.keys(values);
    const n = fields.length;
    const separation = W/(n + 1);
    for (let i = 1; i < n + 1; i++) {
        const barval = values[fields[i - 1]].value
        var color = testcolor;
        if(barval.color == undefined){ color = getRandomColor() }
        // console.log(fields);
        console.log(barval)
        doc.rect(gx + i*separation - defaultBarWidth/2,gy + H,defaultBarWidth,barval/axisy.scale*H * -1).fill(color)
        doc.fillColor('#222')
        doc.text(fields[i - 1],gx + i*separation - doc.widthOfString(fields[i - 1])/2,gy + H + 4)
        doc.text(barval.toString(),gx + i*separation - doc.widthOfString(barval.toString())/2, gy + H - barval/axisy.scale*H - doc.heightOfString(barval.toString()));
        
    }
}

module.exports.createBarGraphic = createBarGraphic;