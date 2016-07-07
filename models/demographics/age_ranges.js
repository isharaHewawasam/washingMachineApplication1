'use strict';
exports.getData = function(callback){
  callback(null, require("./data/age-ranges").ageRanges);
};