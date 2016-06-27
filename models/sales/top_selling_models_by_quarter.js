'use strict';
var avg = require('../sensors/avg_calculator');
var utility = require("../../middle_ware/utility");

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  //var payload = require("../../payloads/top_3_models").payload;  
  var filter = require("../filters");
  var key_map = require("../view_keys_mapping"); 
   
  validatePayload(payload); 
  console.log("pyfds " + JSON.stringify(payload));
  //filter.setReportType2SoldVsConnected();
  
  filter.setReportType2Sales();
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
                  "filter": filter,
                  "key_maps": key_map
               };
  avg.getSum(params, function(err, result) {
    var q1 = [];
    var q2 = [];
    var q3 = [];
    var q4 = [];
    
    splitInQuarters(result, q1, q2, q3, q4);
    
    q1 = groupByFilter(q1.slice(0, 3));
    q2 = groupByFilter(q2.slice(0, 3));
    q3 = groupByFilter(q3.slice(0, 3));
    q4 = groupByFilter(q4.slice(0, 3));
    
    var final_result = [];
    final_result[0] = q1
    final_result[1] = q2
    final_result[2] = q3
    final_result[3] = q4
    
    var response = {};
    
    response.description = params.description;
    response.data = final_result;
    //response.xAxisUnit = getxAxisByQuarters(final_result);
    
    
    callback(err, response);
    
  });      
};

function validatePayload(payload){
  addYear(payload);
  addQuarters(payload);
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

function addQuarters(payload) {
  if (payload.timescale.quarters === undefined) {
    payload.timescale.quarters = [];
  }
  
  payload.timescale.quarters = [];
  payload.timescale.quarters.push({"value": 1});
  payload.timescale.quarters.push({"value": 2});
  payload.timescale.quarters.push({"value": 3});
  payload.timescale.quarters.push({"value": 4});
}

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