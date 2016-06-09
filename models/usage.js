'use strict';
var db = require('../database/dbWashDailyAggregate');
var fav_days = require('../models/favourite_day');
var fav_times = require('../models/favourite_time');

var COLLECTION_NAME = 'stores';

exports.getUsageByFilter = function(payload, callback) {  
	  getData(payload, function(err, result) {         
	    if(err) {
	    	callback(err, null);
	    } else {  		  	  	
        var usage = {'data': []};    
       
        for(var row in result.rows) { 
          if(doesRecordFallsInFilter(payload, result.rows[row].key)) {                      
            usage.data.push(fillRecord(result.rows[row]));
          }  
        }         
        
        fillFavourites(usage, function(err, result_) {          
	        callback(err, result_);
        }); 
	    }
	  });
};

var fillFavourites = function(usage, callback) {    
  fav_days.getAllDays(null, function(err, result) {
    fav_times.getAllDays(null, function(err, result) {    
      for(var item in usage.data) {      
        usage.data[item].popularDay = fav_days.search(usage.data[item]);  
        usage.data[item].popularTime = fav_times.search(usage.data[item]);      
      } 
      callback(null, usage);
    });        
  });  
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
        
        fillFavourites(usage, function(err, result_) {          
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
  record.sold = {"year": result.key[5]}; 
  record.sold = {"quarter": result.key[6]};
  record.sold = {"month": result.key[7]};
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
    
  return record;
};

var getData = function(payload, callback) { 
  var params;
  
  if(payload === null || payload === undefined) { 
     params = { reduce: true, group: true, group_level: 2 };  
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
  
  if(getGroupLevel(payload) == 6) {   
    return isItemPresent(payload.region.states, keys[2]) && 
           isItemPresent(payload.region.cities, keys[3]) &&  
           isItemPresent(payload.region.zip_codes, keys[4]) &&
           isItemPresent(payload.timescale.years, keys[5]); 
             
  }  
  
  if(getGroupLevel(payload) == 7) {   
    return isItemPresent(payload.region.states, keys[2]) && 
           isItemPresent(payload.region.cities, keys[3]) &&  
           isItemPresent(payload.region.zip_codes, keys[4]) &&
           isItemPresent(payload.timescale.years, keys[5]) &&
           isItemPresent(payload.timescale.quarters, keys[6]);
             
  }  
  
  if(getGroupLevel(payload) == 8) {   
    return isItemPresent(payload.region.states, keys[2]) && 
           isItemPresent(payload.region.cities, keys[3]) &&  
           isItemPresent(payload.region.zip_codes, keys[4]) &&
           isItemPresent(payload.timescale.years, keys[5]) &&
           isItemPresent(payload.timescale.quarters, keys[6]) &&
           isItemPresent(payload.timescale.months, keys[7]);
             
  }  
  return false;
};

var isItemPresent = function(array, item){
  if(array.length == 0) return true;
  
  for(var array_item in array) {       
    if(array[array_item].value.toString().toUpperCase() === item.toUpperCase()) return true
  }
  
  return false;
};

var getGroupLevel = function(payload) {
  var group_level = 2;  
  
  if(payload.region.states.length > 0) group_level = 3;  
  if(payload.region.cities.length > 0) group_level = 4;  
  if(payload.region.zip_codes.length > 0) group_level = 5;  
  if(payload.timescale.years.length > 0) group_level = 6;  
  if(payload.timescale.quarters.length > 0) group_level = 7;  
  if(payload.timescale.months.length > 0) group_level = 8;  
  
  return group_level;
};  

