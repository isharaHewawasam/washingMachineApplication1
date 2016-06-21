'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "Power";
  
  var params = { 
                 "description": "Average Water Usage",
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
    //console.log("power " + JSON.stringify(result));
    callback(err, result);
  });    
  
};