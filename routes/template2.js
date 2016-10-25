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

    var testHash = [];

    var testGrab = function() {
        for (var i = 0; i < tops.length; i++) {

            var tempTop = tops[i];
            if (typeof tempTop.brand === 'undefined') {
                tempTop.brand === {}
            };
            if (typeof tempTop.dept === 'undefined') {
                tempTop.dept === {}
            };
            if (typeof tempTop.inventorytype === 'undefined') {
                tempTop.inventorytype === {}
            };
            if (typeof tempTop.sale === 'undefined' || tempTop.sale === 'N') {
                tempTop.sale === {}
            } else {
              tempTop.sale === true
            };
            if (typeof tempTop.topseller === 'undefined' || tempTop.topseller === 'N') {
                tempTop.topseller === {}
            } else {
              tempTop.topseller === true
            };
            if (typeof tempTop.justin === 'undefined' || tempTop.justin === 'N') {
                tempTop.justin === {}
            } else {
              tempTop.justin === 'justin'
            };
            if (typeof tempTop.meganpick === 'undefined' || tempTop.meganpick === 'N') {
                tempTop.meganpick === {}
            } else {
              tempTop.meganpick === 'meganpick'
            };
            if (typeof tempTop.finds === 'undefined' || tempTop.finds === 'N') {
                tempTop.finds === {}
            } else {
              tempTop.finds === 'finds'
            };
            if (typeof tempTop.exclusive === 'undefined'){
                tempTop.exclusive === {}
            } else if (tempTop.exclusive === 'N') {
              tempTop.exclusive === {}
            } else {
              tempTop.exclusive === 'exclusive'
            };
            var testHash = tempTop.hashtags;
            testHash.push(
                tempTop.brand,
                tempTop.dept,
                tempTop.inventorytype,
                tempTop.sale,
                tempTop.topseller,
                tempTop.justin,
                tempTop.meganpick,
                tempTop.exclusive,
                tempTop.finds);
            console.log('here is a testHash that has finds', testHash);
            // testHashArray = testHashArray.push(testHash);
        }
        return testHash;
    };
    testGrab();


    console.log('myjsonArraywith hashTest/data:', tops); //here is your result jsonarray
    //below we loop through each document/product and transform it individually.  result is just ONE product transformed.
    for (var i = 0; i < tops.length; i++) {

        var data = tops[i];
        var result = transform(data, template);
        console.log("mapping data from example to template:", result);

        var top1 = new Top(result);


        top1.save(function(err, topObject) {
            if (err) {
                console.log(err, 'you have an error saving');
            } else {
                console.log(topObject, 'you have saved it!');
            }
        });
    }
    return result;


});


var template = {
    _id: '$..id',
    ancestors: [""],
    shopId: "",
    title: '$..name',
    pageTitle: "",
    description: "",
    type: "",
    vendor: '$..brand',
    metafields: '$..hexlist',
    positions: "",
    price: '$..listprice',
    isLowQuantity: false,
    isSoldOut: false,
    isBackorder: true,
    requiresShipping: true,
    parcel: '$..shippingsurcharge',
    hashtags: ['$..hashtags'],
    twitterMsg: "",
    facebookMsg: "",
    googleplusMsg: "",
    pinterestMsg: "",
    metaDescription: "",
    handle: 'slug goes here',
    isDeleted: false,
    isVisible: true,
    templateSuffix: "",
    createdAt: Date,
    // updatedAt: ,
    // publishedAt: ,
    publishedScope: "",
    workflow: ""

};

// var top1 = new Top (result);
//
//
// top1.save(function (err, topObject) {
//   if (err){
//     console.log(err, 'you have an error saving');
//   } else {
//     console.log( topObject, 'you have saved it!');
//   }
// });



//Then check for the ID of each of those values by matching to existing tag._id's.
// autoValue: function (){
//   let newTagId = Meteor.call("shop/createTag", tag.name, !tag._id);
//   if (this.tags).value = tags.title..
//
//const matchProducts = Products.find({$in:{hashtags: tag._id}});
//       // Product.update({_id: matchProducts._id}, {$addToSet:{hashtags:newTagId}})
//     }



module.exports = router;
