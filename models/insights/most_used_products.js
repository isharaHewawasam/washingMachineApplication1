'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  
  validatePayload(payload);
  var Filter = new FilterModule(payload, 1);
  var key_map = new KeyMap();
  
  if (Filter.isFilterCategoryByYear()) {
    key_map.setReportType2SensorByYear();
  } else {
    key_map.setReportType2Sensor();
  }
 
  var averagesBuffer = [];
  
  var params = { 
                 "description": "Most Used Products for " + payload.timescale.years[0].value,
                 "payload": payload,
                 "buffer": averagesBuffer,
                 "view": {
                           "designDocName": "insights",
                           "default": "MostUsedByYear",
                           "byYear": "MostUsedByYear"
                         },
                  "statsKeyName": "totalLoadWeight",
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map,
                  "group_level_": 1
               };
  
  avg.getSum(params, function(err, result) {
    result.sort(function(a, b) {
      return b.totalLoadWeight - a.totalLoadWeight;
    });
    
    var response = {};
    
    response.description = params.description;
    response.data = result.slice(0, 3);
    
    for (var each_item in response.data) {
      delete response.data[each_item].sold;
      delete response.data[each_item].time_scale;
    }
    callback(err, response);
  });    
};

function validatePayload(payload){
  addYear(payload)
}

function addYear(payload) {
  if (payload.timescale === undefined || payload.timescale === null) {
    payload.timescale = {};
  }
  
  if (payload.timescale.years === undefined || payload.timescale.years === null) {
    payload.timescale.years = [];  
  }
  
  if (payload.timescale.years.length == 0 ) {
    payload.timescale.years.push({"value": (new Date).getFullYear()});
  }
}
