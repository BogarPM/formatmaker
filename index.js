const { spawn } = require("child_process");
const xml2js = require("xml2js");

var fs = require("fs"),
  parseString = require("xml2js").parseString;

fs.readFile("./assets/test.svg", "utf-8", function (err, data) {
  if (err) console.log(err);
  // we log out the readFile results
  //console.log(data);
  // we then pass the data to our method here
  parseString(data, function (err, result) {
    if (err) console.log(err);
    var json = result;

    // here we log the results of our xml string conversion
    console.log(json.svg['g'][0].text);
    console.log('Text Spans')
    var i = 1;
    for (let j = 0; j < json.svg['g'][0].text.length; j++) {
      json.svg['g'][0].text[j].tspan[0]['_'] = 'Random text id: ' + j
      // json.svg['g'][0].text[j].tspan[0]['$']['x'] = 0;
      // json.svg['g'][0].text[j].tspan[0]['$']['y'] = 0;
      json.svg['g'][0].text[j]['$']['x'] = 10 + j*25;
      json.svg['g'][0].text[j]['$']['y'] = 10 + j*25;
      console.log(json.svg['g'][0].text[j].tspan[0])

    }

    console.log(json.svg['g'][0].text);
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(json);

    fs.writeFile("./assets/testout2.svg", xml, function (err, data) {
      if (err) console.log(err);

      console.log("successfully written our update xml to file");
    });
  });
});