'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var salesBuffer = [];
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2SoldVsConnected();
  key_map.setReportType2TopModels();
  
  var params = { 
                 "description": "Total Units Sold",
                 "payload": payload,
                 "buffer": salesBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME + "ByYear"
                         },
                  "statsKeyName": "unitsSold",
                  "databaseType": "sales",
                  "filter": filter,
                  "key_maps": key_map
               };
 
  avg.getSum(params, function(err, result) {
    callback(err, result);
  });    
};