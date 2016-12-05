
import {
  Hooks,
  Logger
} from "/server/api";
import {
  Fixture
} from "/server/api/core/import";

// import makeProductTagArray from "./tag_id";
import { Random } from "meteor/random";
import makingTags from "./tag_id";
import makingTagArray from "./tag_id";
// import relatedBrandTags from "./tag_id";

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
          tempTop.type = "simple";
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
          testMetafield.push(tempTop.attr1list, tempTop.sizelist);

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
          metafields: "$..newMetafield",
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
          createdAt: new Date(),
          publishedScope: "",
          workflow: "$..workflow"
        };
        const templateVariant = {
          _id: "",
          ancestors: [],
          price: "$..listprice",
          type: "variant",
          isVisible: true,
          isDeleted: false,
          inventoryManagement: "",
          inventoryPolicy: "",
          shopId: "J8Bhq3uTtdgwZx3rz",
          taxable: "",
          taxCode: "",
          optionTitle: "",
          workflow: "",
          title: top.sizelist,
          weight: "",
          inventoryQuantity: ""
        };
        const result = transform(data, template);
        const ancestorId = result._id;
        result.handle = result._id;
        result.type = "simple";
        arrayResult.push(result);
        const attr1list = top.attr1list;
        if (typeof attr1list !== "undefined" && attr1list) {
          // Logger.info("Here is the color list: ", attr1list);
          const colorList = attr1list.split(",");
          if (colorList.length > 1) {
            for (const color of colorList) {
              variant  = transform(top, templateVariant);
              variant.ancestors.push(ancestorId);
              variant._id = Random.id();
              variant.type = "variant";
              variant.isVisible = true;
              variant.isDeleted = false;
              variant.shopId = "J8Bhq3uTtdgwZx3rz";
              variant.title = colorList[color];
              variant.optionTitle = colorList[color];
              // arrayResult.push(variant);
              const splitSizeList = top.sizelist.split(",");
              // Logger.info("Here is split size list: ", splitSizeList);
              if (splitSizeList.length > 0) {
                for (const split of splitSizeList) {
                  const variantTwo = transform(top, templateVariant);
                  variantTwo.ancestors.push(ancestorId, variant._id);
                  variantTwo._id = Random.id();
                  variantTwo.type = "variant";
                  variantTwo.isVisible = true;
                  variantTwo.isDeleted = false;
                  variantTwo.shopId = "J8Bhq3uTtdgwZx3rz";
                  variantTwo.title = splitSizeList[split];
                  variantTwo.optionTitle = splitSizeList[split];
                  // arrayResult.push(variantTwo);
                }
              }
            }
          } else {
            const splitSizeList = top.sizelist.split(",");
            if (splitSizeList.length > 0) {
              for (const split of splitSizeList) {
                const variantTwo = transform(top, templateVariant);
                variantTwo.ancestors.push(ancestorId, variant._id);
                variantTwo._id = Random.id();
                variantTwo.type = "variant";
                variantTwo.isVisible = true;
                variantTwo.isDeleted = false;
                variantTwo.shopId = "J8Bhq3uTtdgwZx3rz";
                variantTwo.title = splitSizeList[split];
                variantTwo.optionTitle = splitSizeList[split];
                // arrayResult.push(variantTwo);
              }
            }
          }
        }
      }
      const stringData = JSON.stringify(arrayResult);
      const saveData = (stringsofData) => {
        fs.writeFile("../../../../../private/data/Products.json", stringsofData, function (err) {
          if (err) {
            Logger.warn("error with your data file export", err);
          }
          Logger.info("It has been saved as a file, yo!");
        });
      };
      saveData(stringData);
      return arrayResult;
    });
  };
  runTime();
  Fixture.flush();
});
