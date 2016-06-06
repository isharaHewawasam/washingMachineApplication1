'use strict';
var db = require('../database/dbWashDailyAggregate');
var COLLECTION_NAME = 'stores';

exports.getUsage = function(payload, callback) {
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

var fillRecord = function(result) {
  var record = {};
  
  record.make = "";
  record.model = "";
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
  
  return record;
}

var getData = function(payload, callback) {  
  var params = { reduce: true, group: true, group_level: getGroupLevel(payload) };    
  
  db.view('averages', 'averages', params, function(err, result) {
    callback(err, result);
  });
};  

var doesRecordFallsInFilter = function(payload, keys) {
  if(getGroupLevel(payload) == 1) {   
    return isItemPresent(payload.region.states, keys[0]);       
  }
  
  if(getGroupLevel(payload) == 2) {   
    return isItemPresent(payload.region.states, keys[0]) && 
           isItemPresent(payload.region.cities, keys[1]);       
  }
  
  if(getGroupLevel(payload) == 3) {   
    return isItemPresent(payload.region.states, keys[0]) && 
           isItemPresent(payload.region.cities, keys[1]) &&  
           isItemPresent(payload.region.zip_codes, keys[2]);            
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
    group_level = 1;
  
  if(payload.region.cities.length > 0)
    group_level = 2;
  
  if(payload.region.zip_codes.length > 0)
    group_level = 3;  
  
  return group_level;
};  

