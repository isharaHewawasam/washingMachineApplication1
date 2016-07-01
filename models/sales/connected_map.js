'use strict';

exports.getData = function(payload, buffer, callback) {
  var VIEW_NAME = "connectedByRegionAndProduct";
  //var buffer = [];
  var Filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2ConnectedByRegionAndProduct();
  key_map.setReportType2ConnectionByRegionAndProduct();
  
  //console.log("Report : " + Filter.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT);
  var params = { 
                 "description": "Connected Washing Machines",
                 "payload": payload,
                 "buffer": buffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "unitsConnected",
                  "databaseType": "sales",
                  "filter": new Filter(payload, 8),
                  "key_maps": key_map
               };
  // 8 = Filter.CONNECTED_BY_REGION_AND_PRODUCT
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};