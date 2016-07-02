'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, stats_key_name, callback) {
  var SENSOR_NAME = "WashCycleDuration";
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var key_map = new KeyMap();  
  key_map.setReportType2Sensor();
  
  var params = { 
                 "description": "Average Wash Cycle Duration",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "ByYear"
                         },
                  "statsKeyName": stats_key_name == null ? "avg" + SENSOR_NAME + "Usage" : stats_key_name,
                  "databaseType": "sensorDailyAggregate",
                  "filter": new Filter(payload, 4),
                  "key_maps": key_map
               };
  
  avg.getAverage(params, function(err, result) {
    callback(err, result);
  });    
  
};