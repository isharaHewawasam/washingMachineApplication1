'use strict';
exports.getData = function(callback){
  callback(null, require("./data/members-count").membersCount);
};