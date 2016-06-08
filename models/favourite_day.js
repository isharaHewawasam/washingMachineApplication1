'use strict';
var db = require('../database/dbWashDailyAggregate');
var response;

exports.getAllDays = function(payload, callback) {
	  getData(null, function(err, result) {
	    if(err) {
	    	callback(err, null);
	    } else {             
        response = result;         
	      callback(err, result);
	    }
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
  
  if(usage.state)
    usage_keys = usage_keys + "," + usage.state;
  return usage_keys;
};

exports.search = function(usage, callback) {
  var days = week_days();           
  var usage_keys = usage_keys_in_csv(usage);
  
  for(var row in response.rows) {  
    if(usage_keys.toUpperCase() == response.rows[row].key[0].join().toUpperCase().substring(0, usage_keys.length))    
      days[response.rows[row].key[1]] = days[response.rows[row].key[1]] + response.rows[row].value.count    
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
  var params;
  
  if(payload === null || payload === undefined) { 
     params = { reduce: true, group: true, group_level: 2 };  
  } else {
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('favouriteWashDay', 'favouriteWashDay', params, function(err, result) {    
    response = result;    
    callback(err, result);
  });
};  



var getGroupLevel = function(payload) {
  var group_level = 0;  
  
  if(payload.region.states.length > 0)
    group_level = 3;
  
  if(payload.region.cities.length > 0)
    group_level = 4;
  
  if(payload.region.zip_codes.length > 0)
    group_level = 5;  
  
  return group_level;
};  


