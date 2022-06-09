const defaultWidth = 150;


/*
    Draw Cake 
    data:{
        subjects:{

        }
        ...

    }
*/
const degrees = 360;

function createCakeGraphic(doc, transform, data, config) {
    const { x, y, minwidth, height, minheigth, scale } = transform;
    const { axisx, axisy, values, promedy, subjects } = data;
    var subs = [];
    if (subjects != undefined) { subs = Object.keys(subjects); }
    var totalsubs = 0;
    var subsdegrees = {}
    // Get total subects total amount
    subs.forEach(sub => { totalsubs += subjects[sub]; })
    // Get degrees for each one of them
    subs.forEach(sub => {if(subsdegrees[sub] == undefined){subsdegrees[sub] = 0;}subsdegrees[sub] += subjects[sub];})
    console.log(totalsubs);

    const { grid, title } = config;
    const centerx = x + defaultWidth / 2;
    const centery = y + defaultWidth / 2;
    var svgpath = '';
    // Calculate center
    svgpath += 'M ' + x + ',' + y + ' ';
    

    svgpath += 'A 1.7,1 0 0,0 ' + (centerx + defaultWidth / 2) + ',' + (centery + defaultWidth / 2)/2
    console.log(svgpath);
    doc.path(svgpath).stroke()
}

module.exports.createCakeGraphic = createCakeGraphic;