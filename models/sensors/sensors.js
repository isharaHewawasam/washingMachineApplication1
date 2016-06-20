'use strict';
var water_usage = require('./water');

exports.getAverageUsageForAll = function(payload, callback) {  
  var averages = [];
  
  water_usage.getAverageUsage(payload, averages, function(err, result) {
    if(result) {
      callback(err, result);
    } else {
      console.log("Error in getting water average " + err);
    }
  });  
};