'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var VIEW_NAME = "WashCycles";
  var topModelsBuffer = [];
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping"); 
  validatePayload(payload);
  var Filter = new FilterModule(payload, 12); //INSIGHTS = 12
   
  var key_map = new KeyMap();
  key_map.setReportType2Insights();
  
  var params = { 
                 "description": "Most Used Wash Cycles",
                 "payload": payload,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "favourites",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "cyclesAndCount",
                  "statsKeyNameX": "washCycles",
                  "databaseType": "sensorDailyAggregate",
                  "filter": Filter,
                  "key_maps": key_map
               };
  // SALES = 4             
  avg.getCount(params, function(err, result) { 
    result.sort(function(a, b) {
      return b.cyclesAndCount - a.cyclesAndCount;
    });
    
    /*var response = {};
    var result2 = result.slice(0,3);
    
    response.description = params.description;
    response.sales = [];
    
    for (var each_item in result2) {
      response.sales.push({"item": result2[each_item].make + "-" + result2[each_item].model,
                          "unitsSold": result2[each_item].totalSales}
                          );
    }*/
    callback(err, result.slice(0, 3));
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
    //payload.timescale.years.push({"value": (new Date).getFullYear()});
  }
}




