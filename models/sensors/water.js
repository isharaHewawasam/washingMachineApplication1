'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, stats_key_name, callback) {
  var SENSOR_NAME = "Water";
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  if (Filter.isFilterCategoryByYear()) {
    key_map.setReportType2SensorByYear();
  } else if (Filter.isFilterCategoryByFamily()) {
    key_map.setReportType2SensorByFamily();
  } else {
    key_map.setReportType2Sensor();
  }
  
  var params = { 
                 "description": "Average Water Usage",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME + "Usage",
                           "byYear": "average" + SENSOR_NAME + "UsageByYear",
                           "byFamily": "average" + SENSOR_NAME + "UsageByFamily"
                         },
                  "statsKeyName": stats_key_name == null ? "avg" + SENSOR_NAME + "Usage" : stats_key_name,
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map
               };
  
  avg.getAverage(params, function(err, result) {
    callback(err, result);
  });    
  
};