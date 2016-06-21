'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "Detergent";
    
  var params = { 
                 "description": "Average Wash Cycles",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME + "Usage",
                           "byYear": "average" + SENSOR_NAME + "UsageByYear"
                         },
                  "avgKeyName": "avg" + SENSOR_NAME + "Usage"
               };
  
  avg.getAverageUsage(params, function(err, result) {
    callback(err, result);
  });    
  
};