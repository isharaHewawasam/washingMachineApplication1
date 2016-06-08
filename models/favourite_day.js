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
}

var fillRecord = function(result) {
  var record = {};
  
  record.make = result.key[0];
  record.model = result.key[1];
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
  
  return record;
}

var getData = function(payload, callback) { 
  var params;
  
  if(payload === null || payload === undefined) { 
     params = { reduce: true, group: true };  
  } else {
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('favouriteWashDay', 'favouriteWashDay', params, function(err, result) {
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

