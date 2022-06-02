const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function getRandomColor(type){
    var color = '#';
    var n = 3;
    if(type == true){n = 6};
    for (let i = 0; i < n; i++) {
        var ix = Math.random()*15;
        ix = ix.toFixed(0);
        color += chars[ix];
    }
    return color;
}

module.exports.getRandomColor = getRandomColor;