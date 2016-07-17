'use strict';

exports.getData = function(payload, drill_down, buffer, callback) {
  var VIEW_NAME = "connectedByRegionAndProduct";
  //var buffer = [];
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2ConnectedByRegionAndProduct();
  var key_map = new KeyMap();
  key_map.setReportType2ConnectionByRegionAndProduct();
  
  //console.log("Report : " + Filter.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT);
  var params = { 
                 "description": "Connected Washing Machines by Region",
                 "payload": payload,
                 "buffer": buffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME,
                           "byFamily": VIEW_NAME,
                         },
                  "statsKeyName": "unitsConnected",
                  "databaseType": "sales",
                  "filter": drill_down ? new Filter(payload, 8) : new Filter(payload, 11),
                  "key_maps": key_map,
                  "xxx_007": true
               };
  // 8 = Filter.CONNECTED_BY_REGION_AND_PRODUCT
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};