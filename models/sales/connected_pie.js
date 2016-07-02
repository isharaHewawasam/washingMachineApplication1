'use strict';

exports.getData = function(payload, callback) {
  var VIEW_NAME = "connected";
  var buffer = [];
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2ConnectedUngrouped();
  var key_map = new KeyMap();
  key_map.setReportType2Connected();
  //console.log("Before : " + JSON.stringify(payload));
  //var updated_payload  = resetUnwantedFilters(payload);
  //console.log("after : " + JSON.stringify(payload));
  
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
                  "filter": new Filter(payload, 3),
                  "key_maps": key_map
               };
  //CONNECTED_UNGROUPED = 3
  
  require('../sensors/avg_calculator').getSum(params, function(err, result) {
    callback(err, result);    
  });      
};

function resetUnwantedFilters(payload) {
  var updated_payload = payload;
  
  updated_payload.timescale.years = [];
  
  return updated_payload;
}