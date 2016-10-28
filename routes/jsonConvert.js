//
// var router = require('express').Router();
// var path = require('path');
//
//
// var fs = require('file-system');
// // var csvjson = require('csvjson');
// var csvtojson = require('csvtojson');
//
//
// //Converter Class
// var Converter = require('csvtojson').Converter;
// var converter = new Converter({});
//
//
// //end_parsed will be emitted once parsing finished
// converter.on("end_parsed", function (tops) {
//
//    console.log('myjsonObject/data:', tops[0]) //here is your result jsonarray
//    var data = tops[0];
//
//
// console.log("logging data outside the converter function", data);
//
// //read from file
// require("fs").createReadStream("testTops.csv").pipe(converter);
//
//
// });
//
// module.exports = router;



//~~~~~~~~~~ notes to join path 
//
// var path = require('path');
// var mydata = {'thing': 'thing', 'derp': 'doo'};
// this.write = function(data,filename){
//   if(typeof data !== "string") data = JSON.stringify(data);
//   var file = path.join(__dirname, '/newfile.json', filename);
//   fs.writeFileSync(file, data);
//   console.log('derp file', file);
//   return file;
// };
//
// this.write(mydata);
