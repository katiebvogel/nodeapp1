var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

var zip = require('lodash/fp/zip');
var zipObject = require('lodash/fp/zipObject');
var db = mongoose.connect('mongodb://localhost/meteor');

router.get('/', function(req, res) {
  console.log('Here is a console log'); res.send('What up!');
});


// var Top = mongoose.model(
//   'Top',
//   {
//     _id: String,
//     shopId: String,
//     title: String
//   }
// );




var fs = require('file-system');
var csvjson = require('csvjson');
var csvtojson = require('csvtojson');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

//Converter Class
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   console.log('myjsonArray:', jsonArray); //here is your result jsonarray
});

//read from file
require("fs").createReadStream("testTops.csv").pipe(converter);

//   var data = (fs.readFileSync('/Users/katherinevogel/Codespace/nodeapp1/testTops.csv').toString());
//
//   var options = { delimiter : ','};
// var translated =  csvjson.toSchemaObject(data, options);
//   console.log('your stuff:', translated);



// var top1 = new Top (data);
//
//
//
// top1.save(function (err, topObject) {
//   if (err){
//     console.log(err, 'you have an error saving');
//   } else {
//     console.log( topObject, 'you have saved it!');
//   }
// });
//

/**
 * Product Schema
 */
var Top = mongoose.model(
  'Top',
  {
  _id: {
    type: String,
    label: "Product Id"
  },
  ancestors: {
    type: [String],
    defaultValue: []
  },
  shopId: {
    type: String,
    autoValue: "shopIdAutoValue",
    index: 1,
    label: "Product ShopId"
  },
  title: {
    type: String,
    defaultValue: "",
    label: "Product Title"
  },
  pageTitle: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "simple"
  },
  vendor: {
    type: String,
    optional: true
  },
  metafields: {
    type: String,
    optional: true
  },
  positions: {
    type: Object, // ProductPosition
    blackbox: true,
    optional: true
  },
  // Denormalized field: object with range string, min and max
  price: {
    label: "Price",
    type: String
  },
  // Denormalized field: Indicates when at least one of variants
  // `inventoryQuantity` are lower then their `lowInventoryWarningThreshold`.
  // This is some kind of marketing course.
  isLowQuantity: {
    label: "Indicates that the product quantity is too low",
    type: Boolean,
    optional: true
  },
  // Denormalized field: Indicates when all variants `inventoryQuantity` is zero
  isSoldOut: {
    label: "Indicates when the product quantity is zero",
    type: Boolean,
    optional: true
  },
  // Denormalized field. It is `true` if product not in stock, but customers
  // anyway could order it.
  isBackorder: {
    label: "Indicates when the seller has allowed the sale of product which" +
    " is not in stock",
    type: Boolean,
    optional: true
  },
  requiresShipping: {
    label: "Require a shipping address",
    type: Boolean,
    defaultValue: true,
    optional: true
  },
  parcel: {
    type: String,
    optional: true
  },
  hashtags: {
    type: [String],
    optional: true,
    index: 1
  },
  twitterMsg: {
    type: String,
    optional: true,
    max: 140
  },
  facebookMsg: {
    type: String,
    optional: true,
    max: 255
  },
  googleplusMsg: {
    type: String,
    optional: true,
    max: 255
  },
  pinterestMsg: {
    type: String,
    optional: true,
    max: 255
  },
  metaDescription: {
    type: String,
    optional: true
  },
  handle: {
    type: String,
    optional: true,
    index: 1,
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
  isDeleted: {
    type: Boolean,
    index: 1,
    defaultValue: false
  },
  isVisible: {
    type: Boolean,
    index: 1,
    defaultValue: true
  },
  templateSuffix: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date
    // autoValue: function () {
    //   if (this.isInsert) {
    //     return new Date;
    //   } else if (this.isUpsert) {
    //     return {
    //       $setOnInsert: new Date
    //     };
    //   }
    // }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    },
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedScope: {
    type: String,
    optional: true
  },
  workflow: {
    type: String,
    optional: true
  }
});



//
//
// keys = ['foo', 'bar', 'qux']
// values = ['1', '2', '3']
//
// function Arr2object(keys, vals) {
//   return keys.reduce(
//     function(prev, val, i) {
//       prev[val] = vals[i];
//       return prev;
//     }, {}
//   );
// }
//
// console.log(Arr2object(keys, values));



module.exports = Top;
