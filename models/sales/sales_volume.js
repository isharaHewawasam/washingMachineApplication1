'use strict';
var avg = require('../sensors/avg_calculator');

exports.getData = function(payload, callback) {
  var VIEW_NAME = "sales";
  var topModelsBuffer = [];
  var FilterModule = require("../filters");
  var KeyMap = require("../view_keys_mapping"); 
   
  var key_map = new KeyMap();
  key_map.setReportType2Sales();
  
  validatePayload(payload);
  var Filter = new FilterModule(payload, 9)  ;
  //console.log("payload " + JSON.stringify(payload));
  var params = { 
                 "description": "Sales Volume for " + Filter.filterDescription(),
                 "payload": payload,
                 "buffer": topModelsBuffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME,
                           "byFamily": VIEW_NAME
                         },
                  "statsKeyName": "totalSales",
                  "databaseType": "sales",
                  "filter": Filter,
                  "key_maps": key_map
               };
  
  avg.getSum(params, function(err, result) {
    var response = {};
     response.description = "Sales Volume for " + Filter.filterDescription();
    response.data = processResult(result);
    callback(err, response);
  });      
};

/*
[
	[{
		"timescale": "2016 Q1",
		"sales": [{
			"item": "make",
			"unitsSold": 4514
		}]
	}],
	[{
		"timescale": "2016 Q2"
	}],
	[{
		"timescale": "2016 Q3"
	}]
]
*/
function processResult(result) {
  for (var each_item in result) {
    delete result[each_item].sold;
  }
  
  var final_response = [];
  var time_scales = [];
  
  //add timscales
  for (var each_item in result) {
    if (TimeScaleExists(time_scales, result[each_item].time_scale)) continue
    time_scales.push({"time_scale": result[each_item].time_scale});
  }
  
  //add sales for each time scale
  for (var each_time_scale in time_scales){
    //console.log("1 " + JSON.stringify(time_scales[each_time_scale]));
    time_scales[each_time_scale].sales = [];
    for (var each_item in result) {
      
      if (time_scales[each_time_scale].time_scale !== result[each_item].time_scale) continue
      
       var sales = {};
       
       sales.item = result[each_item].make + " - " + result[each_item].model;
       sales.unitsSold = result[each_item].totalSales;
       
       if (!doesMakeAndModelExists(time_scales[each_time_scale].sales, sales)) {
         time_scales[each_time_scale].sales.push(sales);
      }
    }
  }
  
  final_response.push(time_scales);
  return time_scales;
}

function doesMakeAndModelExists(sales_array, sales_item) {
  for (var each_item in sales_array) {
    if (sales_array[each_item].item === sales_item.item) {
      //console.log("exists");
      sales_array[each_item].unitsSold = sales_array[each_item].unitsSold + sales_item.unitsSold;
      return true;
    }
  }
  
  return false;
}

function TimeScaleExists(time_scales, time_scale) {
  var exists = false;
  
  for (var each_item in time_scales) {
    if (time_scales[each_item].time_scale === time_scale) {
      return true;
    }
  }
  return exists;
}

function timescale_desc(timescale) {
  var result = timescale.sold.year;
  //console.log(" e" + JSON.stringify(timescale));
  if (timescale.sold.quarter !== undefined) {
    result = result + " Q" + timescale.sold.quarter;
  }
  
  return result;
}

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
    //add year
    payload.timescale.years.push({"value": (new Date).getFullYear()});
  }
  
  if (payload.timescale.quarters === undefined || payload.timescale.quarters === null) {
    payload.timescale.quarters = [];  
  }
  
  if (payload.timescale.quarters.length == 0 ) {
   //add quarters
    payload.timescale.quarters.push({"value": 1});
    payload.timescale.quarters.push({"value": 2});
    payload.timescale.quarters.push({"value": 3});
    payload.timescale.quarters.push({"value": 4});
  }
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