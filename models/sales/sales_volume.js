'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  //var payload = require("../../payloads/top_3_models").payload;  
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping"); 
   
  //var payload = require("../../payloads/top_3_models").payload;  
  //console.log("sales volume");
  //filter.setReportType2Sales();
  var key_map = new KeyMap();
  key_map.setReportType2Sales();
  
  var params = { 
                 "description": "Sales Volume",
                 "payload": payload,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME
                         },
                  "statsKeyName": "totalSales",
                  "databaseType": "sales",
                  "filter": new Filter(payload, 9),
                  "key_maps": key_map
               };
  
  avg.getSum(params, function(err, result) {
    
    callback(err, result);
    
  });      
};

function groupByFilter(quarters) {
  var group = {};
  var filter = "";
  var model;
    
  group.filter = quarters[0].sold.year + " - " + "Q" + quarters[0].sold.quarter
  
  for (var each_quarter in quarters) {
    model = quarters[each_quarter].make + " " + quarters[each_quarter].model;
    group[model] = quarters[each_quarter].totalSales;
  }
  return group;
  //console.log(group);
  
  
}

function formatResponseSchema(response) {
  //for(var each_item in response.
}

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
  
  //console.log(quarterBuffer);
}