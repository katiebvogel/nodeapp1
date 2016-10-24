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
