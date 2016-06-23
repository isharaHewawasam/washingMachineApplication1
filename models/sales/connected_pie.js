'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "connected";
  var connectedBuffer = [];
  //var payload = require("../../payloads/top_3_models").payload;  
  
  var params = { 
                 "description": "Top Selling Models",
                 "payload": null,
                 "buffer": connectedBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalConnected"
               };
  
  avg.getSumPie(params, function(err, result) {
    callback(err, result);    
  });      
};