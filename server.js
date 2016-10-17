var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var bodyParser= require('body-parser');
var index = require('./routes/index');


//below code for connecting to postgresql DB
// const csv = require ('csv');
// const pg = require('pg');
// var conString = "pg://localhost:5432/ecomm_development";
// const client = new pg.Client(conString);

// client.connect(function(err)
// {
//   if (err) throw err;
//
//   client.query('SELECT * FROM products', function (err, result){
//     if (err) throw err;
//     console.log("connecting to DB", result.rows);
//   })





app.use(bodyParser.json());
app.use('/', index);

app.use(express.static('public'));

// var mongoURI = "mongodb://localhost:27017/Testing";
// var mongoDB = mongoose.connect(mongoURI).connection;
//
// mongoDB.on('error', function(err){
//   console.log('mongoDB connection is open, yo!');
// });
//
// mongoDB.collection('test', function(err, collection) {});






const server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});
