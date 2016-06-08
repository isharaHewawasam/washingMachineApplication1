'use strict';
var db = require('../database/dbWashDailyAggregate');
var fav_days = require('../models/favourite_day');

var COLLECTION_NAME = 'stores';

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

var fillFavouriteDays = function(usage, callback) {  
  var usage_ = usage;  
  
  fav_days.getAllDays(null, function(err, result) {      
    for(var item in usage_.data) {      
      usage_.data[item].popularDay = "Monday";      
    }  
  });
  
  console.log(usage_.data[1]);  
  callback(null, usage_);
  return usage_;
};

exports.getAllUsage = function(payload, callback) {  
	  getData(null, function(err, result) {
	    if(err) {
	    	callback(err, null);
	    } else {  		  	  	
        var usage = {'data': []};    
       
        for(var row in result.rows) {           
            usage.data.push(fillRecord(result.rows[row]));
        }  
        
        fillFavouriteDays(usage, function(err, result_) {          
	        callback(err, result_);
        });  
	    }
	  });
};

var fillRecord = function(result) {
  var record = {};
   
  record.make = result.key[0];
  record.model = result.key[1];
  record.state = result.key[2];
  record.city = result.key[3];
  record.zip_code = result.key[4];
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
  
  return record;
};

var getData = function(payload, callback) { 
  var params;
  
  if(payload === null || payload === undefined) { 
     params = { reduce: true, group: true };  
  } else {
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('averages', 'averages', params, function(err, result) {
    callback(err, result);
  });
};  

var doesRecordFallsInFilter = function(payload, keys) {
  if(getGroupLevel(payload) == 3) {   
    return isItemPresent(payload.region.states, keys[2]);       
  }
  
  if(getGroupLevel(payload) == 4) {   
    return isItemPresent(payload.region.states, keys[2]) && 
           isItemPresent(payload.region.cities, keys[3]);       
  }
  
  if(getGroupLevel(payload) == 5) {   
    return isItemPresent(payload.region.states, keys[2]) && 
           isItemPresent(payload.region.cities, keys[3]) &&  
           isItemPresent(payload.region.zip_codes, keys[4]);            
  }  
  return false;
};

var isItemPresent = function(array, item){
  for(var array_item in array) {   
    if(array[array_item].value.toUpperCase() === item.toUpperCase())
      return true
  }
  
  return false;
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

