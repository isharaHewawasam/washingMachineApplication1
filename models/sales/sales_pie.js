'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var buffer = [];
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2SoldUngrouped();
  key_map.setReportType2TopModels();
  
  var params = { 
                 "description": "Sold - Pie",
                 "payload": payload,
                 "buffer": buffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "unitsSold",
                  "databaseType": "sales",
                  "filter": filter,
                  "key_maps": key_map
               };
  
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    console.log(JSON.stringify(result));
    callback(err, result);    
  });      
};