var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jsonpath = require('JSONpath');
var transform = require('jsonpath-object-transform');
var fs = require('file-system');
var csvtojson = require('csvtojson');


//Converter Class
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
require("fs").createReadStream("testTops.csv").pipe(converter);
var data;

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (tops) {
   console.log('myjsonObject/data:', tops[0]) //here is your result jsonarray
   var data = tops[0];
   console.log("inside converter: data", data);
   var result = transform(data, template);
   console.log("mapping data from example to template:", result );
  //  return data;
});


var template = {
  _id: '$.id',
  ancestors:'' ,
  shopId:'' ,
  title: '$.name',
  pageTitle: '',
  description: '',
  type: '' ,
  vendor: '$.brand',
  metafields:'$.hexlist',
  positions: '',
  price: '$.listprice',
  isLowQuantity: false ,
  isSoldOut: false,
  isBackorder: true,
  requiresShipping:true ,
  parcel:'$.shippingsurcharge' ,
  hashtags: '$.brand',
  twitterMsg: '',
  facebookMsg: '',
  googleplusMsg: '',
  pinterestMsg:'' ,
  metaDescription: '',
  handle: {
    autoValue: function () {
      let slug = getSlug(this.value);
      if (!slug && this.siblingField("title").value) {
        slug = getSlug(this.siblingField("title").value);
      } else if (!slug) {
        slug = this.siblingField("_id").value || Random.id();
      }
      if (this.isInsert) {
        return slug;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: slug
        };
      }
    }
  },
  isDeleted: false,
  isVisible: true ,
  templateSuffix: '',
  createdAt: {
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: { },
  publishedAt: { },
  publishedScope:'' ,
  workflow: {}
};


module.exports = router;
