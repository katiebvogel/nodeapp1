import {
  Packages,
  Shops
} from "/lib/collections";
import {
  ReactionProduct
} from "/lib/api";
import {
  Tags,
  Products
} from "/lib/collections";
import {
  check
} from "meteor/check";
import {
  Hooks,
  Logger,
  Reaction
} from "/server/api";
import {
  Fixture
} from "/server/api/core/import";
import {
  MethodHooks
} from "/server/api";
import {
  EJSON
} from "meteor/ejson";
import {
  csvtojson
} from "csvtojson";
import {
  jsonPathObjectTransform
} from "jsonpath-object-transform";
import {
  jsonPath
} from "JSONPath";
import {
  Meteor
} from "meteor/meteor";

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const transform = require('jsonpath-object-transform');
const fs = require('file-system');
const findProducts = Products.find({}, {
  type: "simple"
});

const findTags = Tags.find({});

export const makeProductTagArray = () => {
  giantArray = [];
  findProducts.forEach(function (product) {
    let hash = undefined;
    let tagString = undefined;
    let productTagString = undefined;
    let lowerTag = undefined;
    let lowerProduct = undefined;
    let newTag = undefined;
    newTagArray = [];
    myProductId = product._id;
    myProductIdArray = [myProductId];
    myProductTagArray = product.hashtags;
    if (typeof product.hashtags === 'undefined') {} else {
      for (piece of myProductTagArray) {
        newTagArray.push(piece);
      }
      myProductIdArray.push(newTagArray);
    }
    giantArray.push(myProductIdArray);
  });
  return giantArray;
}

export function makingTagArray() {
  tempIdArray = [];
  tempTagArray = [];
  let lowerTag = undefined;
  let newTag = undefined;
  findTags.forEach(function (tag) {
    newTag = tag._id;
    tagString = tag.name;
    lowerTag = tagString.toLowerCase();
    tempTagArray.push(lowerTag);
    tempIdArray.push(newTag);
  });
  dataObject = {
    tempIdArray: tempIdArray,
    tempTagArray: tempTagArray
  };
  // console.log('tempRelatedTagArray:', tempRelatedTagArray);
  return [dataObject, tempIdArray, tempTagArray];
}

export function makingRelatedTagArray() {
  bigRelatedTagArray = [];
  findTags.forEach(function (tag) {
    var relatedTagIds = tag.relatedTagIds;
    if (tag.isTopLevel === true) {
      var tempRelatedTagArray = [tag.name];
      for (var piece of relatedTagIds) {
        tempRelatedTagArray.push(piece);
      }
      bigRelatedTagArray.push(tempRelatedTagArray);
    }
  });
  // console.log('big old related tag array situation:', bigRelatedTagArray);
  return bigRelatedTagArray;
}



export function originalTags() {
  fs.readFile("../../../../../private/custom/Tags.json", "utf8", function (err, data) {
    const tags = JSON.parse(data);
    relatedBrandTags(tags);
    relatedJeansTags(tags);
    relatedAccessoriesTags(tags);
    relatedTopsTags(tags);
    relatedPantsTags(tags);
    relatedDressesTags(tags);
    relatedJewelryTags(tags);
    relatedIntimatesTags(tags);
    relatedGiftTags(tags);
  });
}

const relatedBrandTags = (tags) => {
  brandArray = [];
  for (var i = 0; i < tags.length - 1; i++) {
    if (tags[i].name == "Brand")
      var brand = tags[i];
  }
  brandTagArray = brand.relatedTagIds;
  for (var relative of brandTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 0; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        brandArray.push(newRelative);
      }
    }
  }
  return brandArray;
}

const relatedJeansTags = (tags) => {
  jeansArray = [];
  for (var i = 0; i < tags.length - 1; i++) {
    if (tags[i].name == "Jeans")
      var jeans = tags[i];
  }
  var jeansTagArray = jeans.relatedTagIds;
  for (var relative of jeansTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 0; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        jeansArray.push(newRelative);
      }
    }
  }
  return jeansArray;
}

const relatedAccessoriesTags = (tags) => {
  accessoriesArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Accessories") {
      var accessories = tags[i]
    }
  }
  var accessoriesTagArray = accessories.relatedTagIds;
  for (var relative of accessoriesTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 1; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        accessoriesArray.push(newRelative);
      }
    }
  }
  return accessoriesArray;
}

const relatedTopsTags = (tags) => {
  topsArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Tops") {
      var tops = tags[i]
    }
  }
  var topsTagArray = tops.relatedTagIds;
  for (var relative of topsTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 1; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        topsArray.push(newRelative);
      }
    }
  }
  return topsArray;
}

const relatedPantsTags = (tags) => {
  pantsArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Pants") {
      var pants = tags[i]
    }
  }
  var pantsTagArray = pants.relatedTagIds;
  for (var relative of pantsTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 1; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        pantsArray.push(newRelative);
      }
    }
  }
  return pantsArray;
}

const relatedDressesTags = (tags) => {
  dressArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Dresses & Skirts") {
      var dress = tags[i]
    }
  }
  var dressTagArray = dress.relatedTagIds;
  for (var relative of dressTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 0; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        dressArray.push(newRelative);
      }
    }
  }
  return dressArray;
}

const relatedJewelryTags = (tags) => {
  jewelryArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Jewelry") {
      var jewelry = tags[i]
    }
  }
  var jewelryTagArray = jewelry.relatedTagIds;
  for (var relative of jewelryTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 0; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        jewelryArray.push(newRelative);
      }
    }
  }
  return jewelryArray;
}

const relatedIntimatesTags = (tags) => {
  intimatesArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Intimates") {
      var intimates = tags[i]
    }
  }
  var intimatesTagArray = intimates.relatedTagIds;
  for (var relative of intimatesTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 1; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        intimatesArray.push(newRelative);
      }
    }
  }
  return intimatesArray;
}

const relatedGiftTags = (tags) => {
  giftArray = [];
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].name == "Gift Guide") {
      var gift = tags[i]
    }
  }
  var giftTagArray = gift.relatedTagIds;
  for (var relative of giftTagArray) {
    var lowerRelative = relative.toLowerCase();
    for (var i = 1; i < tempTagArray.length - 1; i++) {
      var tag = tempTagArray[i];
      if (lowerRelative === tag) {
        var newRelative = tempIdArray[i];
        giftArray.push(newRelative);
      }
    }
  }
  return giftArray;
}

export function makingTags() {
  let newTempTagArray = tempTagArray;
  let thisTempTagArray = tempTagArray;
  let myTempTagArray = tempTagArray;

  let newIdArray = tempIdArray;
  let thisIdArray = tempIdArray;
  let myIdArray = tempIdArray;

  let j = -1;
  for (var tag of newTempTagArray) {
    justinVar = undefined;
    j++;
    if (tag == 'just in') {
      justinVar = newIdArray[j];
      break;
    }
  }

  let k = -1;
  for (var item of thisTempTagArray) {
    exclusiveVar = undefined;
    k++;
    if (item == 'exclusive') {
      exclusiveVar = tempIdArray[k];
      break;
    }
  }

  let l = -1;
  for (var thing of myTempTagArray) {
    topsVar = undefined;
    l++;
    if (thing == 'tops') {
      topsVar = tempIdArray[l];
      break;
    }
  }

  let m = -1;
  for (var object of myTempTagArray) {
    saleVar = undefined;
    m++;
    if (object == 'sale') {
      saleVar = tempIdArray[m];
      break;
    }
  }


  return [justinVar, exclusiveVar, topsVar, saleVar];
}

export default function () {
  makingTagArray();
  makeProductTagArray();
  makingTags();
  makingRelatedTagArray();
  originalTags();
  // assignBrandToProduct();
};
//^^^ ending export default function
//~~~~~~~~~~~~~~~~~~~~~~~~~
