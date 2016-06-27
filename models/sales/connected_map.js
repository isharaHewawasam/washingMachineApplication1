'use strict';

exports.getData = function(payload, buffer, callback) {
  var VIEW_NAME = "connectedByRegionAndProduct";
  //var buffer = [];
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2ConnectedByRegionAndProduct();
  key_map.setReportType2ConnectionByRegionAndProduct();
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
                  "filter": filter,
                  "key_maps": key_map
               };
  
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};