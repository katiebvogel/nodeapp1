var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jsonpath = require('JSONpath');
var transform = require('jsonpath-object-transform');
var fs = require('file-system');
var csvtojson = require('csvtojson');
var Top = require('./index.js');

//Converter Class
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
require("fs").createReadStream("testTops.csv").pipe(converter);
var data;

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function(tops) {
    // var hashPush = {
    //     hashTest: 'meganpicks:true,justin:false, find: yes'
    // };
    var testHash = [];

    var testGrab = function() {
        for (var i = 0; i < tops.length; i++) {

            var tempTop = tops[i];
            var testHash = tempTop.hashtags;
            testHash.push(tempTop.brand, tempTop.dept, tempTop.inventoryType, tempTop.sale, tempTop.topseller, tempTop.justin, tempTop.meganpicks, tempTop.exclusive, tempTop.finds);
            console.log('here is a testHash that has finds', testHash);
            // testHashArray = testHashArray.push(testHash);
        }
        return testHash;
    };
    testGrab();
    //
    // var pushIt = function() {
    //     console.log('testHash: ', testHash);
    //     testHash = testHash.push(hashPush);
    //     console.log('hashpush:', testHash);
    //     return testHash;
    //
    // };
    // pushIt();

    console.log('myjsonArraywith hashTest/data:', tops); //here is your result jsonarray
    //below we loop through each document/product and transform it individually.  result is just ONE product transformed.
    for (var i = 0; i < tops.length; i++) {

        var data = tops[i];
        var result = transform(data, template);
        console.log("mapping data from example to template:", result);
    }
    return result;

});


var template = {
    _id: '$..id',
    ancestors: '',
    shopId: '',
    title: '$..name',
    pageTitle: '',
    description: '',
    type: '',
    vendor: '$..brand',
    metafields: '$..hexlist',
    positions: '',
    price: '$..listprice',
    isLowQuantity: false,
    isSoldOut: false,
    isBackorder: true,
    requiresShipping: true,
    parcel: '$..shippingsurcharge',
    hashtags: ['$..hashtags'],
    twitterMsg: '',
    facebookMsg: '',
    googleplusMsg: '',
    pinterestMsg: '',
    metaDescription: '',
    handle: {
        autoValue: function() {
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
    isVisible: true,
    templateSuffix: '',
    createdAt: {
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            }
        }
    },
    updatedAt: {},
    publishedAt: {},
    publishedScope: '',
    workflow: {}

};


//Then check for the ID of each of those values by matching to existing tag._id's.
// autoValue: function (){
//   let newTagId = Meteor.call("shop/createTag", tag.name, !tag._id);
//   if (this.tags).value = tags.title..
  //
//const matchProducts = Products.find({$in:{hashtags: tag._id}});
//       // Product.update({_id: matchProducts._id}, {$addToSet:{hashtags:newTagId}})
//     }



module.exports = router;
