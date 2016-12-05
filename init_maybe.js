import {  Packages,Shops } from "/lib/collections";
import { ReactionProduct } from "/lib/api";
import { Tags, Products } from "/lib/collections";
import { check } from "meteor/check";
import { Hooks, Logger, Reaction } from "/server/api";
import { Fixture } from "/server/api/core/import";
import { MethodHooks } from "/server/api";
import { EJSON } from "meteor/ejson";
import { csvtojson } from "csvtojson";
import { jsonPathObjectTransform } from "jsonpath-object-transform";
import { jsonPath } from "JSONPath";
const Future = require('fibers/future');
const Fiber = require('fibers');
const transform = require('jsonpath-object-transform');
const fs = require('file-system');

Hooks.Events.add("afterCoreInit", () => {
  Meteor.setInterval(runTime, 82400000);
  runTime();

  function runTime() {
    console.log('it has been a little while now');

    Logger.info("====>Initializing using the Evereve Data Imports Plugin Data");

    const Converter = require("csvtojson").Converter;
    const converter = new Converter({
      delimiter: "|"
    });

    const fs = require("fs");

    const tagArray = [];


    const saveTagData = function (data) {
      fs.writeFile('../../../../../private/data/Tags.json', data, function (err, data) {
        if (err) {
          console.log('error with your data file export', err);
        }
      });
    };

    const changeTag = function (tags) {
      for (var tag of tags) {
        const tempTag = tag;
        tempTag.slug = tempTag.name;
        tempTag.isTopLevel = true;
        tempTag.isDeleted = false;
        tempTag.shopId = 'J8Bhq3uTtdgwZx3rz';
      }
    };

    const makeTagArray = function (tags) {
      let stringTag = "";
      for (var tag of tags) {
        const tagData = tag;
        const transformedTag = transform(tagData, tagTemplate);
        tagArray.push(transformedTag);
         stringTag = JSON.stringify(tagArray);
      }
      saveTagData(stringTag);
      return stringTag;
    };

    fs.readFile('../../../../../private/custom/Tags.json', 'utf8', function (err, data) {
      const tags = JSON.parse(data);
      changeTag(tags);
      makeTagArray(tags);
    });

    const tagTemplate = {
      name: '$..name',
      slug: "$..slug",
      position: "",
      relatedTagIds: [],
      isDeleted: '$..isDeleted',
      isTopLevel: '$..isTopLevel',
      shopId: '$..shopId'
    };

    fs.createReadStream("../../../../../private/custom/top_thou_tops.csv").pipe(converter);

    const findProducts = Products.find({type: 'simple'});
    const findTags = Tags.find({});

    const makeProductTagArray = Meteor.bindEnvironment(function () {


                      let newTag = "";
                        findTags.forEach(function (tag) {
                          console.log(tag._id, tag.name);
                          return(tag._id, tag.name);
                        });
          });

    const changeProductHashtag = Meteor.bindEnvironment(makeProductTagArray);


    converter.on("end_parsed", function (tops) {

      makeProductTagArray();

      const testHash = [];
      const testMetafield = [];
      const newMetafield = {};
      testGrab = function () {
        for (var top of tops) {
          const tempTop = top;
          tempTop.isVisible = true;
          tempTop.isSoldOut = false;
          tempTop.isDeleted = false;
          tempTop.shopId = 'J8Bhq3uTtdgwZx3rz';
          tempTop.workflow = {"status": "new"};

          tempTop.hashtags = [];
          tempTop.metafields = [];
          tempTop.newMetafield = [];
          if (typeof tempTop.vendor === 'undefined') {
            tempTop.vendor = null;
          }
          if (typeof tempTop.dept === 'undefined') {
            tempTop.dept = null;
          } else {
            tempTop.dept = "7CP2CCXNe2HRFAsMG";
          }
          if (typeof tempTop.inventorytype === 'undefined') {
            tempTop.inventorytype = null;
          }
          if (typeof tempTop.sale === 'undefined' || tempTop.sale === 'N' || tempTop.sale === null) {
            tempTop.sale = null;
          } else if (tempTop.sale === 'Y') {
            let name = "Sale";
            tempTop.sale = name;
          }
          if (typeof tempTop.topseller === 'undefined' || tempTop.topseller === 'N' || tempTop.topseller ===
            null) {
            tempTop.topseller = null;
          } else {
            tempTop.topseller = 'Top Seller';
          }
          if (typeof tempTop.justin === 'undefined' || tempTop.justin === 'N' || tempTop.justin === null) {
            tempTop.justin = null;
          } else {
            tempTop.justin = 'Just In';
          }
          if (typeof tempTop.meganpick === 'undefined' || tempTop.meganpick === 'N') {
            tempTop.meganpick = null;
          } else {
            tempTop.meganpick = 'Megan\'s Picks';
          }
          if (typeof tempTop.finds === 'undefined' || tempTop.finds === 'N') {
            tempTop.finds = null;
          } else {
            tempTop.finds = 'Finds';
          }
          if (typeof tempTop.exclusive === 'undefined') {
            tempTop.exclusive = null;
          } else if (tempTop.exclusive === 'N') {
            tempTop.exclusive = null;
          } else {
            tempTop.exclusive = 'exclusive';
          }
          let testHash = tempTop.hashtags;

          testHash.push(tempTop.brand, tempTop.dept, tempTop.inventorytype, tempTop.sale, tempTop.topseller,
            tempTop.justin, tempTop.meganpick, tempTop.exclusive, tempTop.finds);


          let testMetafield = tempTop.metafields;
          testMetafield.push(tempTop.hexlist, tempTop.sizelist);

          tempTop.newMetafield = testMetafield.reduce(function (testMetafield, item, index) {
            testMetafield[index] = item;
            return testMetafield;
          }, {});
        }
        return testHash;
      };

      testGrab();

      let arrayResult = [];
      let variantArray = [];
      let stringData = "";

      for (var top of tops) {
        let data = top;
        let results = transform(data, template);
        let ancestorId = top._id;

        result.type = "simple";
        arrayResult.push(result);
         stringData = JSON.stringify(arrayResult);
        console.log('string data', stringData);
        if(top.attr1list !== null){
          console.log('This is the color list: ', top.attr1list);
          let variant  = transform(data, templateTwo);
          variantArray.push(variant);
          stringDataTwo = JSON.stringify(variantArray);
          console.log('Here is the transformed data TAKE TWO MAN: ', stringDataTwo);
          }
        }
      });
      return arrayResult;
    }

    const template = {
      _id: '$..id',
      ancestors: [""],
      shopId: '$..shopId',
      title: '$..title',
      pageTitle: "",
      description: "",
      type: "",
      vendor: '$..vendor',
      metafields: ['$..newMetafield'],
      positions: "",
      price: '$..listprice',
      isLowQuantity: false,
      isSoldOut: '$..isSoldOut',
      isBackorder: true,
      requiresShipping: true,
      parcel: '$..shippingsurcharge',
      hashtags: '$..hashtags',
      twitterMsg: "",
      facebookMsg: "",
      googleplusMsg: "",
      pinterestMsg: "",
      metaDescription: "",
      handle: '$..id',
      isDeleted: '$..isDeleted',
      isVisible: '$..isVisible',
      templateSuffix: "",
      createdAt: Date,
      publishedScope: "",
      workflow: "$..workflow"

    };
    const templateVariant = {
      _id: "",
      ancestors: [ancestorId],
      price: '$..listprice',
      type: "variant",
      isVisible: true,
      isDeleted: false,
      inventoryManagement: "",
      inventoryPolict: "",
      shopId: "J8Bhq3uTtdgwZx3rz",
      taxable: "",
      taxCode: "",
      optionTitle: "",
      workflow: "",
      title: top.sizelist,
      weight: "",
      inventoryQuantity: ""
    };

    const saveData = function (stringData) {
      fs.writeFile('../../../../../private/data/Products.json', stringData, function (err, stringData) {
        if (err) {
          console.log('error with your data file export', err);
        }
        console.log('It has been saved as a file, yo!');
      });
    };
  });
  Fixture.flush();
});
