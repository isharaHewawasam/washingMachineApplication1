'use strict';
var avg = require('./avg_calculator');

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
    setStartEndKeysFromRelativeTimeScale(payload.timescale.relative, params);
    params.statsKeyNameX = "Date";
  }
  
  avg.getAverage(params, function(err, result) {
    if (Filter.isFilterByRelativeTimescale()) {
      var final_result = processResultForRelativeTimeScale(payload.timescale.relative, result);
      callback(err, final_result);
    } else {
      callback(err, result);
    }
  });    
};

function processResultForRelativeTimeScale(relative, result) {
  var final_result = [];
  var key = null;
  
  for (var each_row in result) {
    var product = result[each_row].make + "-" + result[each_row].model;
    
    if (doesProductExists(product, final_result)) {
    
    } else {
      var record = {};
      record.product = product;
      record.avgUsage = [0, 0, 0, 0, 0, 0, 0];
      
      record.avgUsage[new Date(result[each_row].Date).getDay()] = result[each_row].avgUsage;
      final_result.push(record);
    }
  }
  
  //console.log(JSON.stringify(final_result));
  return final_result;
}

function doesProductExists(product_name, buffer) {
  for(var each_row in buffer) {
    if (buffer[each_row].product == product_name) {
      return true;
    }
  }
  
  return false;
}


function setStartEndKeysFromRelativeTimeScale(relative, params) {
  if (relative.unit == "d") {
    //start date
    var today = new Date();    
    var month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth();
    var day = today.getDate() < 10 ? "0" + (today.getDate() + 1) : today.getDate();    
    
    params.end_key = [today.getFullYear() + "-" + month + "-" + day];
    
    //end date
    var relative_date = new Date();    
    relative_date.setDate(today.getDate() - relative.value);
    var month = relative_date.getMonth() < 10 ? "0" + (relative_date.getMonth() + 1) : relative_date.getMonth();
    var day = relative_date.getDate() < 10 ? "0" + (relative_date.getDate() + 1) : relative_date.getDate();    
    
    params.start_key = [relative_date.getFullYear() + "-" + month + "-" + day];
  }
}