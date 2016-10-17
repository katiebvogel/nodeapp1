var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testing');

router.get('/', function(req, res) {
  console.log('Here is a console log'); res.send('What up!');
});

var Top = mongoose.model(
  'Top',
  {name: String,
    color: String,
    sku: Number
  }
);

var top1 = new Top (
  {
    name: 'great top',
    color: 'real red',
    sku: 15
  }
);

console.log(top1);

top1.save(function (err, topObject) {
  if (err){
    console.log(err, 'you have an error saving');
  } else {
    console.log(topObject, 'you have saved it!');
  }
});


var fs = require('file-system');
var csvjson = require('csvjson');

  var data = (fs.readFileSync('/Users/katherinevogel/Codespace/nodeapp1/product.csv').toString());

  var options = { delimiter : ','};
  csvjson.toObject(data, options);
  console.log('your data:', data);



module.exports = router;
