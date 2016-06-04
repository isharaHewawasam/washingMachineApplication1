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
  record.totalLoad = (result.value[0].sum / result.value[0].count);
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
    for(var state in payload.region.states) {      
      if(payload.region.states[state].value == keys[0])
        return true     
    }      
  }
  return false;
};

var get_filter_keys = function(payload) {
  
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