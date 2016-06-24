'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  var payload = require("../../payloads/top_3_models").payload;  
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  filter.setReportType2SoldVsConnected();
  key_map.setReportType2TopModels();
  
  var params = { 
                 "description": "Top Selling Models",
                 "payload": payload,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalSales",
                  "databaseType": "sales",
                  "filter": filter,
                  "key_maps": key_map
               };
  
  avg.getSum(params, function(err, result) {
    var q1 = [];
    var q2 = [];
    var q3 = [];
    var q4 = [];
    
    splitInQuarters(result, q1, q2, q3, q4);
    
    var final_result = q1.slice(0, 3);
    final_result = final_result.concat(q2.slice(0, 3), q3.slice(0, 3), q4.slice(0, 3));
    
    var response = {};
    
    response.description = "Top 3 selling models";
    response.data = final_result;
    response.xAxisUnit = getxAxisByQuarters(final_result);
    response.yAxisUnit = "Hello";
    
    callback(err, response);
    
  });      
};

function getxAxisByQuarters(data) {
  var xAxis = [];
  
  for (var each_item in data) {
    xAxis.push("Q" + data[each_item].sold.quarter + "-" + data[each_item].sold.year);
  }
  
  var result = xAxis.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  
  return result;
}

function splitInQuarters(data, q1Buffer, q2Buffer, q3Buffer, q4Buffer) {
  splitInQuarter(data, q1Buffer, 1);
  splitInQuarter(data, q2Buffer, 2);
  splitInQuarter(data, q3Buffer, 3);
  splitInQuarter(data, q4Buffer, 4);
}

function splitInQuarter(data, quarterBuffer, quarter_no) {
  for (var each_row in data) {
    if (data[each_row].sold.quarter == quarter_no) {
      quarterBuffer.push(data[each_row]);
    }
  } 
  
  quarterBuffer.sort(function(a, b) {
    return b.totalSales - a.totalSales;
  });
}