'use strict';
exports.getData = function(callback){
  callback(null, require("./data/income-ranges").incomeRanges);
};