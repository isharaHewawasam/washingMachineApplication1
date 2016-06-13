'use strict';
var db = require('../database/dbWashDailyAggregate');
var filter = require('../models/filters');
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
  filter.setPayload(payload);
    
  var view_name;
  var params;
     
  if( (filter.isFilterCategoryByRegion()) || 
      (filter.isFilterCategoryNone()) ||
      (filter.isFilterCategoryMixed())
    )
       view_name = "WashDayByMakeAndModel";
  
  if(filter.isFilterCategoryByYear()) 
    view_name = "WashDayByYear";
  
  var params = { reduce: true, group: true, group_level: filter.groupLevel() + 1 };
    
  db.view('favouriteWashDay', view_name, params, function(err, result) {
    /*console.log("Favourite day view name : " + view_name);
    console.log("Favourite day params : " + JSON.stringify(params));    
    console.log("Favourite day records from cloudant : " + result.rows.length);   */ 
    response = result;    
    callback(err, result);
  });
};  

var week_days = function(){
  var days = week_days;
 
  days.Sunday = 0;
  days.Monday = 0;
  days.Tuesday = 0;
  days.Wednesday = 0;
  days.Thursday = 0;
  days.Friday = 0;
  days.Saturday = 0;
  
  return week_days;
};


exports.search = function(usage, callback) {  
  var days = week_days();           
    
  for(var row in response.rows) { 
    if(doesUsageFallsInResponse(usage, response.rows[row].key)) {       
      days[response.rows[row].key[0]] = days[response.rows[row].key[0]] + response.rows[row].value.count
    }      
  }
    
  var fav_day = "NA";
  var max = 0;
  for(var day in days) {
    if(days[day] > max) {
      max = days[day];
      fav_day = day;      
    }      
  }
  return fav_day;
};

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
  
  while(idx < filter.filterType()) {    
    if(!match(usage_values[idx], response_keys[idx])) return false;
    idx++;
  }
  
  return true;
};

var match = function(item1, item2) { 
  return item1.toString().toUpperCase() === item2.toString().toUpperCase();
}

