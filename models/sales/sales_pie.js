'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var buffer = [];
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2SoldUngrouped();
  var key_map = new KeyMap();
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
                  "filter": new Filter(payload, 2),
                  "key_maps": key_map
               };
  //CONNECTED_UNGROUPED = 2
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    //console.log("fsfsxxxxx"); 
    callback(err, result); 
   
  });      
};