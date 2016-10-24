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
var zipWith = require('lodash/zipWith');

//~~~~~~~~~~~~~~~~~~~   *************      ~~~~~~~~~~~~~~~~~~~~~~~

//Below are example array methods included in the lodash library
//
// var array = [1];
// var other = _.concat(array, 2, [3], [[4]]);
//
// console.log(other);
// // => [1, 2, 3, [4]]
//
// console.log(array);
// // => [1]

var array = [
    {_id: String,
  title: String,
  ancestors: String,
  shopId: String
}
];
var values = [5,"Shirt", null, null];


var goal = zipWith(array, values, function(item, value){
  return _.defaults({ v: value}, item);
});
// var goal = _.map(_.zip(_, arrays), function(parts) {
//   return _.reduce(parts, function(m, p) {return {m: p};}, 0);
// });

console.log("goal", goal);

// var goal = schemaArray.map(function (item, index){
//   item.v = topsArray[index];
//   console.log("item", item);
//   return item;
// });
// console.log("goal", goal);


// var new_array = arr.map(callback[, thisArg])

var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}];
var reformattedArray = kvArray.map(function(obj){
   var rObj = {};
   rObj[obj.key] = obj.value;
   console.log("rObj:",  rObj);
});
