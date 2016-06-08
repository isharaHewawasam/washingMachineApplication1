'use strict';
var db = require('../database/dbWashDailyAggregate');
var COLLECTION_NAME = 'stores';

var response;

exports.getUsageByFilter = function(payload, callback) {
	  getData(payload, function(err, result) {
	    if(err) {
	    	callback(err, null);
	    } else {  		  	  	
        var usage = {'data': []};    
       
        for(var row in result.rows) { 
          if(doesRecordFallsInFilter(payload, result.rows[row].key))
            usage.data.push(fillRecord(result.rows[row]));
        }        
	      callback(err, usage);
	    }
	  });
};

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

exports.search = function(usage, callback) {
  var days = {};
 
  days.Sunday = 0;
  days.Monday = 0;
  days.Tuesday = 0;
  days.Wednesday = 0;
  days.Thursday = 0;
  days.Friday = 0;
  days.Saturday = 0;
           
  var usage_keys = usage.make + "," + usage.model + "," + usage.sku + "," +
                   usage.state + "," + usage.city + "," + usage.zip_code;
  
  for(var row in response.rows) {  
    if(usage_keys.toUpperCase() === response.rows[row].key[0].join().toUpperCase()) { 
      if(days.hasOwnProperty(response.rows[row].key[1])) {
        days[response.rows[row].key[1]] = days[response.rows[row].key[1]] + response.rows[row].value.count; 
      } else {  
        days[response.rows[row].key[1]] = response.rows[row].value.count; 
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
  var params;
  
  if(payload === null || payload === undefined) { 
     params = { reduce: true, group: true };  
  } else {
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('favouriteWashDay', 'favouriteWashTime', params, function(err, result) {    
    response = result;    
    callback(err, result);
  });
};  



var getGroupLevel = function(payload) {
  var group_level = 0;  
  
  if(payload.region.states.length > 0)
    group_level = 4;
  
  if(payload.region.cities.length > 0)
    group_level = 5;
  
  if(payload.region.zip_codes.length > 0)
    group_level = 6;  
  
  return group_level;
};  


