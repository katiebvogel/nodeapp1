// import {
//   Packages,
//   Shops
// } from "/lib/collections";
// import {
//   ReactionProduct
// } from "/lib/api";
import {
  Tags,
  Products
} from "/lib/collections";
// import {
//   check
// } from "meteor/check";
import {
  Logger
} from "/server/api";
// import {
//   Fixture
// } from "/server/api/core/import";
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
// } from "meteor/meteor";

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const transform = require('jsonpath-object-transform');
const fs = require("file-system");
const findProducts = Products.find({}, {
  type: "simple"
});

const findTags = Tags.find({});

export const makeProductTagArray = () => {
  giantArray = [];
  findProducts.forEach(function (product) {
    // const hash = undefined;
    // const tagString = undefined;
    // const productTagString = undefined;
    // const lowerTag = undefined;
    // let lowerProduct = undefined;
    // let newTag = undefined;
    newTagArray = [];
    myProductId = product._id;
    myProductIdArray = [myProductId];
    myProductTagArray = product.hashtags;
    if (typeof product.hashtags === "undefined") {
      // console.log('undefined hashatags');
    } else {
      for (piece of myProductTagArray) {
        newTagArray.push(piece);
      }
      myProductIdArray.push(newTagArray);
    }
    giantArray.push(myProductIdArray);
  });
  return giantArray;
};

export function makingTagArray() {
  tempIdArray = [];
  tempTagArray = [];
  // let lowerTag = undefined;
  let newTag = undefined;
  findTags.forEach(function (tag) {
    newTag = tag._id;
    tagString = tag.name;
    lowerTag = tagString.toLowerCase();
    tempTagArray.push(lowerTag);
    tempIdArray.push(newTag);
  });
  // Logger.info("tempTagArray:", tempTagArray);
  return [tempIdArray, tempTagArray];
}

// export function makingRelatedTagArray() {
//   bigRelatedTagArray = [];
//   findTags.forEach(function (tag) {
//     relatedTagIds = tag.relatedTagIds;
//     if (tag.isTopLevel === true) {
//       const tempRelatedTagArray = [tag.name];
//       for (const piece of relatedTagIds) {
//         tempRelatedTagArray.push(piece);
//       }
//       bigRelatedTagArray.push(tempRelatedTagArray);
//     }
//   });
//   // console.log('big old related tag array situation:', bigRelatedTagArray);
//   return bigRelatedTagArray;
// }


const relatedBrandTags = (tags) => {
  // Logger.info("tempTagArray:", tempTagArray);
  brandArray = [];
  for (let i = 0; i < tags.length - 1; i++) {
    if (tags[i].name === "Brand") {
      brand = tags[i];
      brandTagArray = brand.relatedTagIds;
      for (const relative of brandTagArray) {
        const lowerRelative = relative.toLowerCase();
        for (let j = 0; j < tempTagArray.length - 1; j++) {
          const tag = tempTagArray[j];
          if (lowerRelative === tag) {
            const newRelative = tempIdArray[j];
            brandArray.push(newRelative);
          }
        }
      }
    }
  }
  Logger.info("brandArray: ", brandArray, brandTagArray);
  return brandArray;
};
const relatedJeansTags = (tags) => {
  jeansArray = [];
  for (let i = 0; i < tags.length - 1; i++) {
    if (tags[i].name === "Jeans") {
      jeans = tags[i];
      const jeansTagArray = jeans.relatedTagIds;
      for (const relative of jeansTagArray) {
        const lowerRelative = relative.toLowerCase();
        for (let j = 0; j < tempTagArray.length - 1; j++) {
          const tag = tempTagArray[j];
          if (lowerRelative === tag) {
            const newRelative = tempIdArray[j];
            jeansArray.push(newRelative);
          }
        }
      }
    }
  }
  return jeansArray;
};

const relatedAccessoriesTags = (tags) => {
  accessoriesArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Accessories") {
      accessories = tags[i];
    }
  }
  const accessoriesTagArray = accessories.relatedTagIds;
  for (const relative of accessoriesTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        accessoriesArray.push(newRelative);
      }
    }
  }
  return accessoriesArray;
};

const relatedTopsTags = (tags) => {
  topsArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Tops") {
      tops = tags[i];
    }
  }
  const topsTagArray = tops.relatedTagIds;
  for (const relative of topsTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        topsArray.push(newRelative);
      }
    }
  }
  return topsArray;
};

const relatedPantsTags = (tags) => {
  pantsArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Pants") {
      pants = tags[i];
    }
  }
  const pantsTagArray = pants.relatedTagIds;
  for (const relative of pantsTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        pantsArray.push(newRelative);
      }
    }
  }
  return pantsArray;
};

const relatedDressesTags = (tags) => {
  dressArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Dresses & Skirts") {
      dress = tags[i];
    }
  }
  const dressTagArray = dress.relatedTagIds;
  for (const relative of dressTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        dressArray.push(newRelative);
      }
    }
  }
  return dressArray;
};

const relatedJewelryTags = (tags) => {
  jewelryArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Jewelry") {
      jewelry = tags[i];
    }
  }
  const jewelryTagArray = jewelry.relatedTagIds;
  for (const relative of jewelryTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        jewelryArray.push(newRelative);
      }
    }
  }
  return jewelryArray;
};

const relatedIntimatesTags = (tags) => {
  intimatesArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Intimates") {
      intimates = tags[i];
    }
  }
  const intimatesTagArray = intimates.relatedTagIds;
  for (const relative of intimatesTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        intimatesArray.push(newRelative);
      }
    }
  }
  return intimatesArray;
};

const relatedGiftTags = (tags) => {
  giftArray = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Gift Guide") {
      gift = tags[i];
    }
  }
  const giftTagArray = gift.relatedTagIds;
  for (const relative of giftTagArray) {
    const lowerRelative = relative.toLowerCase();
    for (let i = 0; i < tempTagArray.length - 1; i++) {
      const tag = tempTagArray[i];
      if (lowerRelative === tag) {
        const newRelative = tempIdArray[i];
        giftArray.push(newRelative);
      }
    }
  }
  return giftArray;
};

export function makingTags() {
  const newTempTagArray = tempTagArray;
  const thisTempTagArray = tempTagArray;
  const myTempTagArray = tempTagArray;

  const newIdArray = tempIdArray;

  let j = -1;
  for (const tag of newTempTagArray) {
    justinVar = undefined;
    j++;
    if (tag === "just in") {
      justinVar = newIdArray[j];
      break;
    }
  }

  let k = -1;
  for (const item of thisTempTagArray) {
    exclusiveVar = undefined;
    k++;
    if (item === "exclusive") {
      exclusiveVar = tempIdArray[k];
      break;
    }
  }

  let l = -1;
  for (const thing of myTempTagArray) {
    topsVar = undefined;
    l++;
    if (thing === "tops") {
      topsVar = tempIdArray[l];
      break;
    }
  }

  let m = -1;
  for (const object of myTempTagArray) {
    saleVar = undefined;
    m++;
    if (object === "sale") {
      saleVar = tempIdArray[m];
      break;
    }
  }

  return [justinVar, exclusiveVar, topsVar, saleVar];
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

export default function () {
  makingTagArray();
  makeProductTagArray();
  makingTags();
  // makingRelatedTagArray();
  originalTags();
  // assignBrandToProduct();
}
