'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "connected";
  var topModelsBuffer = [];
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2SoldVsConnected();
  key_map.setReportType2TopModels();
  var params = { 
                 "description": "Connected Washing Machines",
                 "payload": null,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalSales",
                  "databaseType": "sales",
                  "filter": filter,
                  "key_maps": key_map
               };
  
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};