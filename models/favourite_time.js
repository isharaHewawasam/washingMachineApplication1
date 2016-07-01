'use strict';
var db = require('../database/dbWashDailyAggregate');
var Filter = require("./filters");
var filter;
var response;

exports.getAllDays = function(payload, callback) {
	  getData(payload, function(err, result) {
	    if(err) {
	    	callback(err, null);
	    } else {             
        response = result;         
	      callback(err, result);
	    }
	  });
};

var getData = function(payload, callback) {
  //filter.setPayload(payload);
  //filter.setReportType2Favourite();
    filter  = new Filter(payload, 6);
  var view_name;
  var params;
     
  if( (filter.isFilterCategoryByRegion()) || 
      (filter.isFilterCategoryNone()) ||
      (filter.isFilterCategoryMixed())
    )
       view_name = "WashTimeByMakeAndModel";
  
  if(filter.isFilterCategoryByYear()) 
    view_name = "WashTimeByYear";
  
  var params = { reduce: true, group: true, group_level: filter.groupLevel() + 1 };
  
 console.log("Sending favtoure time query request " + Date());  
  db.view('favouriteWashDay', view_name, params, function(err, result) {
    console.log("Received favoutire time : " + Date());
    console.log("Favourite wash time view name : " + view_name);
    console.log("Favourite wash time params : " + JSON.stringify(params));    
    console.log("Favourite wash time records from cloudant : " + result.rows.length);
    console.log("========================================");
    response = result;    
    callback(err, result);
  });
};  

exports.search = function(usage, callback) {
  var wash_times = {}; 
  var response_keys;
  
  for(var row in response.rows) {     
    if(doesUsageFallsInResponse(usage, response.rows[row].key)){      
      if(wash_times.hasOwnProperty(response.rows[row].key[0])) {        
        wash_times[response.rows[row].key[0]] = wash_times[response.rows[row].key[0]] + response.rows[row].value.count; 
      } else {  
        wash_times[response.rows[row].key[0]] = response.rows[row].value.count; 
      }
    }        
  }
   
  //console.log("Wash time " + JSON.stringify(wash_times));   
  var fav_wash_time = "NA";
  var max = 0;
  for(var idx in wash_times) {
    if(wash_times[idx] > max) {
      //console.log("Idx : " + idx);
      //console.log("wash time : " + wash_times[idx])
      max = wash_times[idx];
      fav_wash_time = idx;               
    }      
  }
  
  //console.log("Favourite Wash Time : " + fav_wash_time);
  return fav_wash_time;
}

var doesUsageFallsInResponse = function(usage, keys) { 
  var usage_values;

  if( (filter.isFilterCategoryNone()) || 
      (filter.isFilterCategoryByRegion()) ||
      (filter.isFilterCategoryMixed())
    )
    usage_values = [usage.make, usage.model, usage.state, usage.city, usage.zip_code];
  
  if(filter.isFilterCategoryByYear()) 
    usage_values = [usage.make, usage.model, usage.sold.year, usage.sold.quarter, usage.sold.month];
  
  if( (filter.isFilterCategoryMixed()) ) 
    usage_values.push(usage.sold.year, usage.sold.quarter, usage.sold.moth);
  
  var response_keys = keys.slice(1, keys.length);
  var idx = 0;
 
  //console.log("usage " + usage_values); 
  while(idx < filter.filterType()) {  
    //console.log("comparing");
    //console.log("keys " + response_keys);
    //console.log(usage_values[idx]);
    //console.log(response_keys[idx]);
    if(!match(usage_values[idx], response_keys[idx])) return false;
    idx++;
  }
  
  return true;
};

var doesUsageFallsInResponse_old = function(usage, keys) { 
  var usage_values = [usage.make, usage.model, usage.state,
                      usage.city, usage.zip_code, usage.year,
                      usage.quarter, usage.month 
                     ];
  var response_keys = keys.slice(1, keys.length);
  var idx = 0;
   
  while(idx < filter.filterType()) {    
    if(!match(usage_values[idx], response_keys[idx])) return false;
    idx++;
  }
  
  return true;
};

var match = function(item1, item2) { 
  return item1.toString().toUpperCase() === item2.toString().toUpperCase();
}

