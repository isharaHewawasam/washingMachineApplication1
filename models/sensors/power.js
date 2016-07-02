'use strict';
var avg = require('./avg_calculator');

exports.getAverageUsage = function(payload, averagesBuffer, callback) {
  var SENSOR_NAME = "Power";
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var key_map = new KeyMap();  
  key_map.setReportType2Sensor();
  
  var params = { 
                 "description": "Average Water Usage",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME + "Usage",
                           "byYear": "average" + SENSOR_NAME + "UsageByYear"
                         },
                  "statsKeyName": "avg" + SENSOR_NAME + "Usage",
                  "databaseType": "sensorDailyAggregate",
                  "filter": new Filter(payload, 4),
                  "key_maps": key_map
               };
  
  avg.getAverage(params, function(err, result) {
    //console.log("power " + JSON.stringify(result));
    callback(err, result);
  });    
  
};