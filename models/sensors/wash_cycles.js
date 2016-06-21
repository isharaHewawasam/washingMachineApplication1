'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "WashCycles";
    
  var params = { 
                 "description": "Average Wash Cycles",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "ByYear"
                         },
                  "avgKeyName": "avg" + SENSOR_NAME
               };
  
  avg.getAverageUsage(params, function(err, result) {
    callback(err, result);
  });    
  
};