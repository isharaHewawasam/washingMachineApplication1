'use strict';
var db = require('../database/dbWashDailyAggregate');
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

var usage_keys_in_csv = function(usage){
  var usage_keys = usage.make + "," + usage.model;  
  
  if(usage.state)
    usage_keys = usage_keys + "," + usage.state;
  
  if(usage.city)
    usage_keys = usage_keys + "," + usage.city
  
  if(usage.zip_code)
    usage_keys = usage_keys + "," + usage.zip_code;
  
  return usage_keys;
};

exports.search = function(usage, callback) {
  var days = {};           
  var usage_keys = usage_keys_in_csv(usage);
  
  for(var row in response.rows) { 
    if(usage_keys.toUpperCase() === response.rows[row].key[0].join().toUpperCase().substring(0, usage_keys.length)) {      
      if(days.hasOwnProperty(response.rows[row].key[2])) {
        days[response.rows[row].key[2]] = days[response.rows[row].key[2]] + response.rows[row].value.count; 
      } else {  
        days[response.rows[row].key[2]] = response.rows[row].value.count; 
      }
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
}

var getData = function(payload, callback) {   
  var view_name;
  var params;
  
  if(payload === null || payload === undefined) {
    view_name = "WashTimeByMakeAndModel";  
    params = { group: true, reduce: true };  
  } else { 
    view_name = "favouriteWashTime";
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('favouriteWashDay', view_name, params, function(err, result) {    
    response = result;    
    callback(err, result);
  });
};  

var getGroupLevel = function(payload) {
  var group_level = 2;  
  
  if(payload.region.states.length > 0) group_level = 3;  
  if(payload.region.cities.length > 0) group_level = 4;  
  if(payload.region.zip_codes.length > 0) group_level = 5;  
  
  return group_level;
};  


