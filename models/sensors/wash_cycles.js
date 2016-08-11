'use strict';
var avg = require('./avg_calculator');
var relative_timescale_utility = require('./utility/relative_timescale');

exports.getAverageUsage = function(payload, averagesBuffer, stats_key_name, callback) {
  var SENSOR_NAME = "WashCycles";
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  if (Filter.isFilterCategoryByYear()) {
    key_map.setReportType2SensorByYear();
  } else if (Filter.isFilterCategoryByFamily()) {
    key_map.setReportType2SensorByFamily();
  } else if (Filter.isFilterByRelativeTimescale()) {
    Filter.reportType(16);
    key_map.setReportType2RelativeTimescale();  
  } else {
    key_map.setReportType2Sensor();
  }
  
  var params = { 
                 "description": "Average Wash Cycles",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME,
                           "byYear": "average" + SENSOR_NAME + "ByYear",
                           "byFamily": "average" + SENSOR_NAME + "ByFamily",
                           "byDate": "average" + SENSOR_NAME + "ByDate"
                         },
                  "statsKeyName": stats_key_name == null ? "avg" + SENSOR_NAME + "Usage" : stats_key_name,
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map
               };
  
  if (Filter.isFilterByRelativeTimescale()) {
    relative_timescale_utility.setStartEndKeysFromRelativeTimeScale(payload.timescale.relative, params);
    params.statsKeyNameX = "Date";
  }
  
  avg.getAverage(params, function(err, result) {
    if (Filter.isFilterByRelativeTimescale()) {
      var final_result = relative_timescale_utility.processResultForRelativeTimeScale(payload.timescale.relative, result);
      callback(err, final_result);
    } else {
      callback(err, result);
    }
  });    
  
};
