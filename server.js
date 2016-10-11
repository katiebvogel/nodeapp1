var express = require('express');
//
// var bodyParser= require('body-parser');
// var index = require('./routes/index');
var app = express();
// const csv = require ('csv');

const pg = require('pg');

var conString = "pg://localhost:5432/ecomm_development";
const client = new pg.Client(conString);



// app.use(bodyParser.json());
// app.use('/', index);

// app.use(express.static('server/public'));


//
// const config = {
//   // user: 'katherinevogel',
//   database: 'ecomm_development',
//   // password: 'secret',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 300000
// };


client.connect(function(err)
{
  if (err) throw err;

  client.query('SELECT * FROM products', function (err, result){
    if (err) throw err;
    console.log("connecting to DB", result.rows);
  })




  // client.query('CREATE TABLE tops(id serial NOT NULL, atti1id integer REFERENCES spree_products (id), brand text, of8 text, dept text, depttree text, inventorytype text, largepicture text, listprice text, name text, overallqoh integer, pictureID integer, pricerange text, prodreviewsaverage integer, sale text, salepricerangebottom integer, sizelist text, smallpicture text, style text, url text, googleproducttaxonomy text, shippingsurcharge text, topseller text, hexlist text, tinypicture text, justin text, meganpick text, finds text, shoecharge text, exclusive text)', function (err, result){
  //   if (err) throw err;
  //   console.log("connecting to DB", result.rows);
  // })


  // client.end(function(err){
  //   if (err) throw err;
  // });

const server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});

});
