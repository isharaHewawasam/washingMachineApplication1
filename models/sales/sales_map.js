'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  //var payload = require("../../payloads/top_3_models").payload;  
  
  var params = { 
                 "description": "Sales",
                 "payload": null,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalSales"
               };
  
  avg.getSum(params, function(err, result) {
    callback(err, "result");    
  });      
};