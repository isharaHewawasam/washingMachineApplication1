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
  
  if(usage.state) usage_keys = usage_keys + "," + usage.state;
  return usage_keys;
};

exports.search = function(usage, callback) {
  var days = week_days();           
  //var usage_keys = usage_keys_in_csv(usage);  
  for(var row in response.rows) {  
    //if(usage_keys.toUpperCase() == response.rows[row].key[0].join().toUpperCase().substring(0, usage_keys.length)) 
    //console.log(JSON.stringify(usage));     
    //console.log(JSON.stringify(response.rows[row].key[0]));
    if(doesRecordFallsInFilter(usage, response.rows[row].key[0])) {            
      days[response.rows[row].key[1]] = days[response.rows[row].key[1]] + response.rows[row].value.count
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
     params = { reduce: true, group: true, group_level: 8 };  
  } else {
    params = { reduce: true, group: true, group_level: getGroupLevel(payload) }; 
  }    
  
  db.view('favouriteWashDay', 'favouriteWashDay', params, function(err, result) {    
    response = result;    
    callback(err, result);
  });
};  

var getGroupLevel = function(usage) {
  var group_level = 2;   
           
  if(usage.state) group_level = 3;  
  if(usage.city) group_level = 4;  
  if(usage.zip_code) group_level = 5;  
  if(usage.sold.year) group_level = 6;  
  if(usage.sold.quarter) group_level = 7;  
  if(usage.sold.month) group_level = 8;
     
  return group_level;
};  

var doesRecordFallsInFilter = function(usage, keys) {
  if(getGroupLevel(usage) == 1) {   
    return isItemPresent(usage.make, keys[0]);       
  }
  
  if(getGroupLevel(usage) == 2) {       
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]);
  }
  
  if(getGroupLevel(usage) == 3) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&  
           match(usage.state, keys[2]);           
  }
  
  if(getGroupLevel(usage) == 4) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]);       
  }
  
  if(getGroupLevel(usage) == 5) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]);            
  }  
  
  if(getGroupLevel(usage) == 6) {   
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]) &&
           match(usage.sold.year, keys[5]);              
  }  
  
  if(getGroupLevel(usage) == 7) {     
    return match(usage.make, keys[0]) &&
           match(usage.model, keys[1]) &&
           match(usage.state, keys[2]) && 
           match(usage.city, keys[3]) &&  
           match(usage.zip_code, keys[4]) &&
           match(usage.sold.year, keys[5]) &&
           match(usage.sold.quarter, keys[6]);             
  }  
  
  if(getGroupLevel(usage) == 8) {   
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
