'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "Water";
    
  var params = { 
                 "description": "Average Water Usage",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME + "Usage",
                           "byYear": "average" + SENSOR_NAME + "UsageByYear"
                         },
                  "avgKeyName": "avgWaterUsage"
               };
  
  avg.getAverageUsage(params, function(err, result) {
    callback(err, result);
  });    
  
};