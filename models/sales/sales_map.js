'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "salesByRegionAndProduct";
  var buffer = [];
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2SalesByRegionAndProduct();
  var key_map = new KeyMap();
  key_map.setReportType2SalesByRegionAndProduct();
 
  
  var params = { 
                 "description": "Sold Washing Machines by Region",
                 "payload": payload,
                 "buffer": buffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "unitsSold",
                  "databaseType": "sales",
                  "filter": new Filter(payload, 7),
                  "key_maps": key_map
               };
  // SALES_BY_REGION_AND_PRODUCT = 7
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};

