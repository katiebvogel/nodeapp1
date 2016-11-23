// import {Packages, Shops} from "/lib/collections";
// import {
//   ReactionProduct
// } from "/lib/api";
// import {
//   Tags,
//   Products
// } from "/lib/collections";
// import {
//   check
// } from "meteor/check";
import {
  Hooks,
  Logger
} from "/server/api";
import {
  Fixture
} from "/server/api/core/import";
// import {
//   MethodHooks
// } from "/server/api";
// import {
//   EJSON
// } from "meteor/ejson";
// import {
//   csvtojson
// } from "csvtojson";
// import {
//   jsonPathObjectTransform
// } from "jsonpath-object-transform";
// import {
//   jsonPath
// } from "JSONPath";
// import {
//   Meteor
// } from 'meteor/meteor';
// import makeProductTagArray from "./tag_id";
import makingTags from "./tag_id";
import makingTagArray from "./tag_id";
// import relatedBrandTags from "./tag_id";

// const Future = require('fibers/future');
// const Fiber = require("fibers");

const transform = require("jsonpath-object-transform");
const fs = require("file-system");

Hooks.Events.add("afterCoreInit", () => {
  // Meteor.setInterval(runTime, 82400000); //this makes sure that the data will not reload again for another 24 hours
  makingTagArray();
  makingTags();

  const runTime = () => {
    Logger.info("====>Initializing using the Evereve Data Imports Plugin Data");
    const Converter = require("csvtojson").Converter;
    const converter = new Converter({
      delimiter: "|"
    });
    const tagArray = [];

    const saveTagData = (data) => {
      fs.writeFile("../../../../../private/data/Tags.json", data, function (err) {
        if (err) {
          // console.log("error with your data file export", err);
        }
      });
    };
    const changeTag = tags => {
      for (const tag of tags) {
        const tempTag = tag;
        tempTag.slug = tempTag.name;
        tempTag.isDeleted = false;
        tempTag.shopId = "J8Bhq3uTtdgwZx3rz";
        // tempTag.relatedTagIds = tempTag.relatedTagIds
        if (tempTag.name === "Brand") {
          tempTag.relatedTagIds = brandArray;
        }
        if (tempTag.name === "Jeans") {
          tempTag.relatedTagIds = jeansArray;
        }
        if (tempTag.name === "Accessories") {
          tempTag.relatedTagIds = accessoriesArray;
        }
        if (tempTag.name === "Tops") {
          tempTag.relatedTagIds = topsArray;
        }
        if (tempTag.name === "Pants") {
          tempTag.relatedTagIds = pantsArray;
        }
        if (tempTag.name === "Dresses & Skirts") {
          tempTag.relatedTagIds = dressArray;
        }
        if (tempTag.name === "Jewelry") {
          tempTag.relatedTagIds = jewelryArray;
        }
        if (tempTag.name === "Intimates") {
          tempTag.relatedTagIds = intimatesArray;
        }
        if (tempTag.name === "Gift Guide") {
          tempTag.relatedTagIds = giftArray;
        }
      }
    };

    const makeTagArray = (tags) => {
      let stringTag = undefined;
      const tagTemplate = {
        name: "$..name", // string
        slug: "$..slug", // string
        position: "", // number
        relatedTagIds: "$..relatedTagIds", // [string]
        isDeleted: "$..isDeleted", // boolean default is false
        isTopLevel: "$..isTopLevel", // boolean
        shopId: "$..shopId" // string -- hard code for now There is an associated function to autovalue in Reaction
      };
      for (const tag of tags) {
        const tagData = tag;
        const transformedTag = transform(tagData, tagTemplate);
        tagArray.push(transformedTag);
        stringTag = JSON.stringify(tagArray);
      }
      saveTagData(stringTag);
      return stringTag;
    };

    fs.readFile("../../../../../private/custom/Tags.json", "utf8", function (err, data) {
      const tags = JSON.parse(data);
      changeTag(tags);
      makeTagArray(tags);
    });

    fs.createReadStream("../../../../../private/custom/top_thou_tops.csv").pipe(converter);

    // ^^^ ending setting hashtags to id's instead of names

    // ~~~~~~~~~~~~~~~~~~~~~~~~~

    // end_parsed will be emitted once parsing finished

    // var testHash = [];
    converter.on("end_parsed", function (tops) {
      testHash = [];
      const testGrab = () => {
        for (const top of tops) {
          const tempTop = top;
          tempTop.id = tempTop.id.toString();
          tempTop.isVisible = true;
          tempTop.isSoldOut = false;
          tempTop.isDeleted = false;
          tempTop.shopId = "J8Bhq3uTtdgwZx3rz";
          tempTop.workflow = {
            status: "new"
          };
          tempTop.hashtags = [];
          tempTop.metafields = [];
          tempTop.newMetafield = [];
          if (tempTop.vendor === "LEVI`S") {
            tempTop.vendor = "Levi's";
          }
          tempTop.brand = tempTop.vendor;
          if (typeof tempTop.vendor === "undefined") {
            tempTop.vendor = null;
          } else {
            for (let j = 0; j < brandTagArray.length - 1; j++) {
              const brand = brandTagArray[j];
              const lowerBrand = brand.toLowerCase();
              const vendor = tempTop.vendor;
              const lowerVendor = vendor.toLowerCase();
              if (lowerVendor === lowerBrand) {
                tempTop.vendor = brandArray[j];
              }
            }
          }
          if (typeof tempTop.dept === "undefined") {
            tempTop.dept = null;
          } else {
            tempTop.dept = topsVar;
          }
          if (typeof tempTop.inventorytype === "undefined") {
            tempTop.inventorytype = null;
          }
          if (typeof tempTop.sale === "undefined" || tempTop.sale === "N" || tempTop.sale === null) {
            tempTop.sale = null;
          } else if (tempTop.sale === "Y") {
            tempTop.sale = saleVar;
          }
          if (typeof tempTop.topseller === "undefined" || tempTop.topseller === "N" || tempTop.topseller ===
            null) {
            tempTop.topseller = null;
          } else {
            tempTop.topseller = "Top Seller";
          }
          if (typeof tempTop.justin === "undefined" || tempTop.justin === "N" || tempTop.justin === null) {
            tempTop.justin = null;
          } else {
            tempTop.justin = justinVar;
          }
          if (typeof tempTop.meganpick === "undefined" || tempTop.meganpick === "N") {
            tempTop.meganpick = null;
          } else {
            tempTop.meganpick = "Megan\'s Picks";
          }
          if (typeof tempTop.finds === "undefined" || tempTop.finds === "N") {
            tempTop.finds = null;
          } else {
            tempTop.finds = "Finds";
          }
          if (typeof tempTop.exclusive === "undefined") {
            tempTop.exclusive = null;
          } else if (tempTop.exclusive === "N") {
            tempTop.exclusive = null;
          } else {
            tempTop.exclusive = exclusiveVar;
          }
          testHash = tempTop.hashtags;

          testHash.push(tempTop.vendor, tempTop.dept, tempTop.inventorytype, tempTop.sale, tempTop.topseller,
            tempTop.justin, tempTop.meganpick, tempTop.exclusive, tempTop.finds);

          testMetafield = tempTop.metafields;
          testMetafield.push(tempTop.hexlist, tempTop.sizelist);

          tempTop.newMetafield = testMetafield.reduce(function (testMetafield, item, index) {
            testMetafield[index] = item;
            return testMetafield;
          }, {});
        }
        return testHash;
      };

      testGrab();

      // below we loop through each document/product and transform it individually.  result is just ONE product transformed.
      const arrayResult = [];
      // let stringData = undefined;

      for (const top of tops) {
        const data = top;
        const template = {
          _id: "$..id",
          ancestors: [""],
          shopId: "$..shopId",
          title: "$..title",
          pageTitle: "",
          description: "",
          type: "",
          vendor: "$..brand",
          metafields: ["$..newMetafield"],
          positions: "",
          price: "$..listprice",
          isLowQuantity: false,
          isSoldOut: "$..isSoldOut",
          isBackorder: true,
          requiresShipping: true,
          parcel: "$..shippingsurcharge",
          hashtags: "$..hashtags",
          twitterMsg: "",
          facebookMsg: "",
          googleplusMsg: "",
          pinterestMsg: "",
          metaDescription: "",
          isDeleted: "$..isDeleted",
          isVisible: "$..isVisible",
          templateSuffix: "",
          createdAt: Date,
          publishedScope: "",
          workflow: "$..workflow"
        };
        const result = transform(data, template);
        result.handle = result._id;
        result.type = "simple";
        arrayResult.push(result);
        stringData = JSON.stringify(arrayResult);
      }
      const saveData = (stringData) => {
        fs.writeFile("../../../../../private/data/Products.json", stringData, function (err) {
          if (err) {
            // console.log("error with your data file export", err);
          }
          Logger.info("****It has been saved as a file, yo! **");
        });
      };
      saveData(stringData);
      return arrayResult;
    });
  };

  runTime();

  Fixture.flush();
});
