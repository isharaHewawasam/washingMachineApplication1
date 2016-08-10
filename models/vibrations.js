'use strict'
var avg = require('./sensors/avg_calculator');

exports.getAvgUsage = function(payload, callback) {  
  var SENSOR_NAME = "Vibrations";
  var FilterModule = require("./filters");
  var KeyMap = require("./view_keys_mapping");
  
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  if (Filter.isFilterCategoryByYear()) {
    key_map.setReportType2SensorByYear();
  } else if (Filter.isFilterCategoryByFamily()) {
    key_map.setReportType2SensorByFamily();
  } else {
    key_map.setReportType2Sensor();
  }
  
  var averagesBuffer = [];
  var params = { 
                 "description": "Average Vibrations",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "UsageByYear",
                           "byFamily": "average" + SENSOR_NAME + "UsageByFamily"
                         },
                  "statsKeyName": "avgVibrations",
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map
               };
  
  avg.getAverage(params, function(err, result) {
    callback(err, result);
  });    
};
