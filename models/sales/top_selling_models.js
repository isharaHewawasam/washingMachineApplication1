'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  //var payload = require("../../payloads/top_3_models").payload;  
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping"); 
   
  validatePayload(payload); 
  //console.log("pyfds " + JSON.stringify(payload));
  //filter.setReportType2SoldVsConnected();
  
  //filter.setReportType2Sales();
  var key_map = new KeyMap();
  key_map.setReportType2TopModels();
  
  var params = { 
                 "description": "Top Selling Models for " + payload.timescale.years[0].value,
                 "payload": payload,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalSales",
                  "databaseType": "sales",
                  "filter": new Filter(payload, 4),
                  "key_maps": key_map
               };
  // SALES = 4             
  avg.getSum(params, function(err, result) { 
    result.sort(function(a, b) {
      return b.totalSales - a.totalSales;
    });
    
    var response = {};
    var result2 = result.slice(0,3);
    
    response.description = "Top 3 Selling Models";
    response.sales = [];
    
    for (var each_item in result2) {
      response.sales.push({"item": result2[each_item].make + "-" + result2[each_item].model,
                          "unitsSold": result2[each_item].totalSales}
                          );
    }
    callback(err, response);
  });      
};

function validatePayload(payload){
  addYear(payload);
}

function addYear(payload) {
  if (payload.timescale === undefined || payload.timescale === null) {
    payload.timescale = {};
  }
  
  if (payload.timescale.years === undefined || payload.timescale.years === null) {
    payload.timescale.years = [];  
  }
  
  if (payload.timescale.years.length == 0 ) {
    payload.timescale.years.push({"value": (new Date).getFullYear()});
  }
}




