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
      (filter.isFilterCategoryByProduct()) ||
      (filter.isFilterCategoryNone()) ||
      (filter.isFilterCategoryMixed())
    )
       view_name = "WashDayByMakeAndModel";
  
  if(filter.isFilterCategoryByYear()) 
    view_name = "WashDayByYear";
  
  if(filter.isFilterCategoryByFamily()) 
    view_name = "WashDayByFamily";
  
  var params = { reduce: true, group: true, group_level: filter.groupLevel() + 1 };
  
 console.log("Sending favtoure day query request " + Date());  
  db.view('favourites', view_name, params, function(err, result) {
    console.log("Received favoutire day : " + Date());
    console.log("Favourite day view name : " + view_name);
    console.log("Favourite day params : " + JSON.stringify(params));    
    console.log("Favourite day records from cloudant : " + result.rows.length); 
    console.log("=========================================");
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
  //console.log("usage : " + JSON.stringify(usage));
  //console.log("keys : " + keys);
  var usage_values;

  if( (filter.isFilterCategoryNone()) || 
      (filter.isFilterCategoryByRegion()) ||
      (filter.isFilterCategoryByProduct()) ||
      (filter.isFilterCategoryMixed())
    )
    usage_values = [usage.make, usage.model, usage.sku, usage.state, usage.city, usage.zip_code];
  
  //by timescale
  if(filter.isFilterCategoryByYear()) 
    usage_values = [usage.make, usage.model, usage.sku, usage.sold.year, usage.sold.quarter, usage.sold.month];
  
  //by family
  if(filter.isFilterCategoryByFamily()) 
    usage_values = [usage.make, usage.model, usage.sku, usage.age, usage.family_members_count, usage.user_income];
  
  if( (filter.isFilterCategoryMixed()) ) 
    usage_values.push(usage.sold.year, usage.sold.quarter, usage.sold.month, usage.age, usage.family_members_count, usage.user_income);
  
  var response_keys = keys.slice(1, keys.length);
  var idx = 0; 
  
  //console.log("Filter Type : " + filter.filterType());
  //console.log("Response keys : " + response_keys);
  //console.log("Usage : " + JSON.stringify(usage_values));
  //console.log("-----------------------------------------");
  
  while(idx < filter.filterType()) {    
    if(!match(usage_values[idx], response_keys[idx])) return false;
    idx++;
  }
  
  return true;
};

var match = function(item1, item2) { 
  return item1.toString().toUpperCase() === item2.toString().toUpperCase();
}

