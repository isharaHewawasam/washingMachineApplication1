'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  //if (Filter.isFilterCategoryByYear()) {
   // key_map.setReportType2SensorByYear();
  //} else {
    
  //}
  
  key_map.setReportType2MostUsedWM();
  
  var averagesBuffer = [];
  var params = { 
                 "description": "Most Used",
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "insights",
                           "default": "insights_dev",
                           "byYear": "insights_dev"
                         },
                  "statsKeyName": "totalLoadWeight",
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map,
                  "top": 5,
                  "start_key": getStartKey(),
                  "end_key": getEndKey(),
                  "group_level": 5
               };
  
  avg.getSum(params, function(err, result) {
    callback(err, result.slice(0, 3));
  });    
};

function getStartKey(){
  var  result;
  
  result = ['2015', '10', '1']
  
  return result;
}

function getEndKey(){
  var  result;
  
  result = ['2015', '10', '7']
  
  return result;
}
