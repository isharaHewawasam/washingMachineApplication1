'use strict';
var avg = require('./avg_calculator');
var relative_timescale_utility = require('./utility/relative_timescale');

exports.getAverageUsage = function(payload, group_by_timescale, averagesBuffer, stats_key_name, callback) {
  var SENSOR_NAME = "Water";
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  var key_map = new KeyMap();
  if (group_by_timescale) {
    var Filter = new FilterModule(payload, 16);
    key_map.setReportType2RelativeTimescale();

  } else {
    var Filter = new FilterModule(payload, 1);
      
    if (Filter.isFilterCategoryByYear()) {
      key_map.setReportType2SensorByYear();
    } else if (Filter.isFilterCategoryByFamily()) {
      key_map.setReportType2SensorByFamily();
    } else {
     key_map.setReportType2Sensor();
    }
  }
  var params = { 
                 "description": "Average Water Usage",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "average" + SENSOR_NAME + "Usage",
                           "byYear": "average" + SENSOR_NAME + "UsageByYear",
                           "byFamily": "average" + SENSOR_NAME + "UsageByFamily",
                           "byDate": "average" + SENSOR_NAME + "UsageByDate"
                         },
                  "statsKeyName": stats_key_name == null ? "avg" + SENSOR_NAME + "Usage" : stats_key_name,
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map,
                  "group_by_timescale":group_by_timescale
               };
  

  if (group_by_timescale) {
    relative_timescale_utility.setStartEndKeysFromRelativeTimeScale(payload.timescale.relative, params);
    params.statsKeyNameX = "Date";
  }
  avg.getAverage(params, function(err, result) {
    if (group_by_timescale) {
      var final_result = relative_timescale_utility.processResultForRelativeTimeScale(payload.timescale.relative, result);
      callback(err, final_result);
    } else {
      callback(err, result);
    }
  });    
  
};