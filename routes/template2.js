var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jsonpath = require('JSONpath');
var transform = require('jsonpath-object-transform');
var fs = require('file-system');
var csvtojson = require('csvtojson');
var Top = require('./index.js');
var async = require('async');
//Converter Class
var path = require('path');

fst = require('fs-then');

var Converter = require('csvtojson').Converter;
var converter = new Converter({});


/////////////////////////////////
//~~~~~~~~~~~~~~~~~~~~~~~BEGIN Block of code for importing Tags and transforming to Reaction Schema    BEGIN   ~~~~~~~~~~~~~~~~~~~~~
// var tags;
var tagArray = [];
var transformedTag;
var tags;
var stringTag;

var saveTagData = function(data) {
    fs.writeFile('Tags.json', data, function(err, data) {
        if (err) {
            console.log('error with your data file export', err);
        }
        console.log('It has been saved as a file, yo!', data);
    });
}

var changeTag = function() {
    console.log('tags?', tags[7]);
    for (var i = 0; i < tags.length; i++) {
        var tempTag = tags[i];
        tempTag.slug = "tempTag.name";
        tempTag.isTopLevel = true;
        tempTag.isDeleted = false;
        tempTag.shopId = 'J8Bhq3uTtdgwZx3rz';
    }
}

var makeTagArray = function(tags) {
    for (var i = 0; i < tags.length; i++) {
        var tagData = tags[i]
        transformedTag = transform(tagData, tagTemplate);
        console.log('transformed tag in line 51:', transformedTag);
        tagArray.push(transformedTag);
        var stringTag = JSON.stringify(tagArray);
    }
    console.log('transformed:', stringTag);
    saveTagData(stringTag);
    return stringTag;
}


//fs.readFile or fst.readFile? see below...

fs.readFile('toImportTags.json', 'utf8', function(err, data) {
    tags = JSON.parse(data);
    console.log('here is a 2nd tag', tags[5]);
    changeTag(tags);
    makeTagArray(tags);
});

var tagTemplate = {
    _id: '$..id', //string
    name: '$..name', //string
    slug: "", //string
    position: "", //number
    relatedTagIds: [], //[string]
    isDeleted: '$..isDeleted', //boolean default is false
    isTopLevel: '$..isTopLevel', //boolean
    shopId: '$..shopId' //string -- hard code for now There is an associated function to autovalue in Reaction
        // createdAt:  , //date
        // updatedAt: , //date
};


//~~~~~~~~~~~~~~~~~~~~~~~END Block of code for importing Tags and transforming to Reaction Schema       END    ~~~~~~~~~~~~~~~~~~~~~
/////////////////////









/////////////////
//~~~~~~~~~~~~~~~~~~~~~~~Begin block of code for transforming PRODUCTS for Reaction

fs.createReadStream('testTops.csv').pipe(converter);
var data;
//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function(tops) {
    var testHash = [];
    var testMetafield = [];
    var newMetafield = {};
    testGrab = function() {
        for (var i = 0; i < tops.length; i++) {
            var tempTop = tops[i];
            tempTop.isVisible = true;
            tempTop.isSoldOut = false;
            tempTop.isDeleted = false;
            tempTop.shopId = 'J8Bhq3uTtdgwZx3rz';

            tempTop.hashtags = [];
            tempTop.metafields = [];
            tempTop.newMetafield = [];
            if (typeof tempTop.brand === 'undefined') {
                tempTop.brand === null
            };
            if (typeof tempTop.dept === 'undefined') {
                tempTop.dept === null
            };
            if (typeof tempTop.inventorytype === 'undefined') {
                tempTop.inventorytype === null
            };
            if (typeof tempTop.sale === 'undefined' || tempTop.sale === 'N') {
                tempTop.sale = null
            } else {
                tempTop.sale == 'sale'
            };
            if (typeof tempTop.topseller === 'undefined' || tempTop.topseller === 'N') {
                tempTop.topseller = null
            } else {
                tempTop.topseller = 'topseller'
            };
            if (typeof tempTop.justin === 'undefined' || tempTop.justin === 'N') {
                tempTop.justin = null
            } else {
                tempTop.justin = 'justin'
            };
            if (typeof tempTop.meganpick === 'undefined' || tempTop.meganpick === 'N') {
                tempTop.meganpick = null
            } else {
                tempTop.meganpick = 'meganpick'
            };
            if (typeof tempTop.finds === 'undefined' || tempTop.finds === 'N') {
                tempTop.finds = null
            } else {
                tempTop.finds = 'finds'
            };
            if (typeof tempTop.exclusive === 'undefined') {
                tempTop.exclusive = null
            } else if (tempTop.exclusive === 'N') {
                tempTop.exclusive = null
            } else {
                tempTop.exclusive = 'exclusive'
            };
            testHash = tempTop.hashtags;
            testHash.push(tempTop.brand, tempTop.dept, tempTop.inventorytype, tempTop.sale, tempTop.topseller, tempTop.justin, tempTop.meganpick, tempTop.exclusive, tempTop.finds);
            testMetafield = tempTop.metafields;
            testMetafield.push(tempTop.hexlist, tempTop.sizelist);
            tempTop.newMetafield = testMetafield.reduce(function(testMetafield, item, index) {
                testMetafield[index] = item;
                return testMetafield;
            }, {});
        }
        return testHash;
        return newMetafield;
    };
    testGrab();
    //below we loop through each document/product and transform it individually.  result is just ONE product transformed.
    var arrayResult = [];
    for (var i = 0; i < tops.length; i++) {
        var data = tops[i];
        var result = transform(data, template);
        arrayResult.push(result);
        var stringData = JSON.stringify(arrayResult);
    }
    saveData(stringData);
    return arrayResult;
}); //end the CONVERTER FUNCTION  //


var template = {
    _id: '$..id',
    ancestors: [""],
    shopId: '$..shopId',
    title: '$..name',
    pageTitle: "",
    description: "",
    type: "",
    vendor: '$..brand',
    metafields: ['$..newMetafield'],
    // metafields: '$...item',
    positions: "",
    price: '$..listprice',
    isLowQuantity: false,
    isSoldOut: '$..isSoldOut',
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
    isDeleted: '$..isDeleted',
    isVisible: '$..isVisible',
    templateSuffix: "",
    createdAt: Date,
    // updatedAt: ,
    // publishedAt: ,
    publishedScope: "",
    workflow: ""
};


var saveData = function(data) {
    fs.writeFile('Products.json', data, function(err, data) {
        if (err) {
            console.log('error with your data file export', err);
        }
        // console.log('It has been saved as a file, yo!', data);
    });
};

/////////////////
//~~~~~~~~~~~~~~~~~~~~~~~END   block of code for transforming PRODUCTS for Reaction    END PRODUCT TRANSFORM ~~~~~~~~~~~~~~~~~~
///////////////////////////////////////





//Then check for the ID of each of those values by matching to existing tag._id's.
// autoValue: function (){
//   let newTagId = Meteor.call("shop/createTag", tag.name, !tag._id);
//   if (this.tags).value = tags.title..
//
//const matchProducts = Products.find({$in:{hashtags: tag._id}});
//       // Product.update({_id: matchProducts._id}, {$addToSet:{hashtags:newTagId}})
//     }
