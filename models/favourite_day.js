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
  
  view_name = "WashDayByMakeAndModelNew";   
  var params = { reduce: true, group: true, group_level: filter.groupLevel() + 1 };
    
  db.view('favouriteWashDay', view_name, params, function(err, result) {
    //console.log(params);
    //console.log("Favourite day records from cloudant : " + result.rows.length);    
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

var usage_keys_in_csv = function(usage){
  var usage_keys = usage.make + "," + usage.model;  
  
  if(usage.state) usage_keys = usage_keys + "," + usage.state;
  return usage_keys;
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
  var usage_values = [usage.make, usage.model, usage.state,
                      usage.city, usage.zip_code, usage.year,
                      usage.quarter, usage.month 
                     ];
  var response_keys = keys.slice(1, keys.length);
  var idx = 0;
   
  while(idx < filter.groupLevel()) {    
    if(!match(usage_values[idx], response_keys[idx])) return false;
    idx++;
  }
  
  return true;
};

var doesUsageFallsInResponse_old = function(usage, keys) { 
  
  if(filter.groupLevel() == 1) {   
    return isItemPresent(usage.make, keys[0]);       
  }
  
  if(filter.groupLevel() == 2) {
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]);
  }
  
  if(filter.groupLevel() == 3) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&  
           match(usage.state, keys[2]);           
  }
  
  if(filter.groupLevel() == 4) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]);       
  }
  
  if(filter.groupLevel() == 5) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]);            
  }  
  
  if(filter.groupLevel() == 6) {
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]) &&
           match(usage.sold.year, keys[5]);              
  }  
  
  if(filter.groupLevel() == 7) {     
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]) &&
           match(usage.sold.year, keys[5]) &&
           match(usage.sold.quarter, keys[6]);             
  }  
  
  if(filter.groupLevel() == 8) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]) &&
           match(usage.sold.year, keys[5]) &&
           match(usage.sold.quarter, keys[6]) &&
           match(usage.sold.month, keys[7]);             
  }  
  
  return false;
};

var match = function(item1, item2) { 
  return item1.toString().toUpperCase() === item2.toString().toUpperCase();
}

var isItemPresent = function(item, array){  
  for(var array_item in array) {         
    if(array[array_item].value.toString().toUpperCase() === item.toUpperCase()) return true
  }
  
  return false;
};
