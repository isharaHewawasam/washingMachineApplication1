'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "salesByRegionAndProduct";
  var buffer = [];
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2SalesByRegionAndProduct();
  key_map.setReportType2SalesByRegionAndProduct();
  
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
    callback(err, result);    
  });      
};