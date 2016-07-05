'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  if (Filter.isFilterCategoryByYear()) {
    key_map.setReportType2SensorByYear();
  } else {
    key_map.setReportType2Sensor();
  }
  
  var averagesBuffer = [];
  var params = { 
                 "description": "Most Used",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "averages",
                           "default": "averages",
                           "byYear": "averagesByYear"
                         },
                  "statsKeyName": "totalLoadWeight",
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map,
                  "top": 5
               };
  
  avg.getSum(params, function(err, result) {
    callback(err, result);
  });    
};



