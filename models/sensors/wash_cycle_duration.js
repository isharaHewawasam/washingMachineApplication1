'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "WashCycleDuration";
    
  var params = { 
                 "description": "Average Wash Cycle Duration",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "ByYear"
                         },
                  "statsKeyName": "avg" + SENSOR_NAME
               };
  
  avg.getAverage(params, function(err, result) {
    callback(err, result);
  });    
  
};