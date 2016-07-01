'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "WashCycles";
  var Filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  
  key_map.setReportType2Sensor();
  
  var params = { 
                 "description": "Average Wash Cycles",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "ByYear"
                         },
                  "statsKeyName": "avg" + SENSOR_NAME,
                  "databaseType": "sensorDailyAggregate",
                  "filter": new Filter(payload, 4),
                  "key_maps": key_map
               };
  
  avg.getAverage(params, function(err, result) {
    callback(err, result);
  });    
  
};