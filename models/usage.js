'use strict';
var db = require('../database/dbWashDailyAggregate');
var fav_days = require('../models/favourite_day');
var fav_times = require('../models/favourite_time');

var COLLECTION_NAME = 'stores';
var group_level = 0;

exports.getUsageByFilter = function(payload, callback) {  
	  getData(payload, function(err, result) {         
	    if(err) {
	    	callback(err, null);
	    } else {  		  	  	
        var usage = {'data': []};    
       
        for(var row in result.rows) { 
          if(doesRecordFallsInFilter(payload, result.rows[row].key)) {            
            addOrUpdateUsages(payload, usage.data, fillRecord(result.rows[row]));
          }  
        }         
        
        fillFavourites(usage, function(err, result_) {          
	        callback(err, result_);
        }); 
	    }
	  });
};

var addOrUpdateUsages = function(payload, usages, new_usage) {
  if(usageExists(payload, usages, new_usage, group_level)) {    
    for(var each_usage in usages) {
      //console.log("Beforexxx");
      if( (each_usage.make == new_usage.make) && (each_usage.model == new_usage.model) ) {
        console.log("Beforevvv " + JSON.stringify(usages[each_usage]));
        usages[each_usage].totalLoad = (usages[each_usage].totalLoad + new_usage.totalLoad)/2;
        console.log("After " + JSON.stringify(new_usage));
        return;
      }
    }
  } else { 
    usages.push(new_usage);
  }
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

var usageExists_working = function(payload, usages, usage_to_find, group_level) {  
  for(var each_usage in usages) {    
    if(!do_make_and_model_match(usages[each_usage], usage_to_find)) continue; 
    
    var all_match;
    
    if(payload.timescale.years.length) {        
      all_match = (usages[each_usage].sold.year == usage_to_find.sold.year);
    }
    
    if (all_match) return true;
  }
};

var usageExists = function(payload, usages, usage_to_find, group_level) {  
  for(var each_usage in usages) {    
    if(!do_make_and_model_match(usages[each_usage], usage_to_find)) continue; 
    
    var all_match;
    
    if(payload.region.states.length > 0) {         
        all_match = (usages[each_usage].state == usage_to_find.state);
        if(!all_match) return;
      }
      
      if(payload.region.cities.length > 0) {         
        all_match = (usages[each_usage].city == usage_to_find.city);
        if(!all_match) return;
      }
      
      if(payload.region.zip_codes.length > 0) {         
        all_match = (usages[each_usage].city == usage_to_find.city);
        if(!all_match) return;
      }
      
      if(payload.timescale.years.length > 0) {         
        all_match = (usages[each_usage].sold.year == usage_to_find.sold.year);
        if(!all_match) return;
      }
      
      if(payload.timescale.quarters.length > 0) {         
        all_match = (usages[each_usage].sold.quarter == usage_to_find.sold.quarter);
        if(!all_match) return;
      }
      
      if(payload.timescale.months.length > 0) {         
        all_match = (usages[each_usage].sold.month == usage_to_find.sold.month);
        if(!all_match) return;
      }
    
    if (all_match) return true;
  }
};

var do_make_and_model_match = function(usage1, usage2) {
  return (usage1.make == usage2.make) && 
         (usage1.model == usage2.model);
};

var usageExists_old = function(payload, usages, usage_to_find, group_level) {
  for(var usage in usages) {
    if(group_level == 1) {
      return usages[usage].make == usage_to_find.make;
    }
    
    if(group_level == 2) {
      return usages[usage].make == usage_to_find.make && 
             usages[usage].model == usage_to_find.model;
    }
    
    if(group_level == 3) {
      return usages[usage].make == usage_to_find.make && 
             usages[usage].model == usage_to_find.model &&
             usages[usage].state == usage_to_find.state;
    }
    
    if(group_level == 4) {
      return usages[usage].make == usage_to_find.make && 
             usages[usage].model == usage_to_find.model &&
             usages[usage].state == usage_to_find.state &&
             usages[usage].city == usage_to_find.city;
    }
    
    if(group_level == 5) {
      return usages[usage].make == usage_to_find.make && 
             usages[usage].model == usage_to_find.model &&
             usages[usage].state == usage_to_find.state &&
             usages[usage].city == usage_to_find.city &&
             usages[usage].zip_code == usage_to_find.zip_code;
    }
    
    if(group_level == 6) { 
      var all_match = false;      
      //console.log("1 : " + JSON.stringify(usages[usage]));
      //console.log("2 : " + JSON.stringify(usage_to_find));
      //console.log(usages[usage].sold.year + " " + usage_to_find.sold.year);
      if( !( (usages[usage].make == usage_to_find.make) &&  (usages[usage].model == usage_to_find.model) ) )
          return false;        
           
      //if(payload.region.states > 0) { all_match = (usages[usage].state == usage_to_find.state); }
      //if(payload.region.cities > 0) { all_match = all_match && (usages[usage].city == usage_to_find.city); }
      //if(payload.region.zip_codes > 0) { all_match = all_match && (usages[usage].zip_code == usage_to_find.zip_cde); }
      if(payload.region.states.length > 0) {         
        all_match = (usages[usage].state == usage_to_find.state);
        if(!all_match) return;
      }
      
      if(payload.region.cities.length > 0) {         
        all_match = (usages[usage].city == usage_to_find.city);
        if(!all_match) return;
      }
      
      if(payload.region.zip_codes.length > 0) {         
        all_match = (usages[usage].city == usage_to_find.city);
        if(!all_match) return;
      }
      
      if(payload.timescale.years.length > 0) {         
        all_match = (usages[usage].sold.year == usage_to_find.sold.year);
        if(!all_match) return;
      }
      
      if(payload.timescale.quarters.length > 0) {         
        all_match = (usages[usage].sold.quarter == usage_to_find.sold.quarter);
        if(!all_match) return;
      }
      
      if(payload.timescale.quarters.months > 0) {         
        all_match = (usages[usage].sold.month == usage_to_find.sold.month);
        if(!all_match) return;
      }
      console.log("Matched : " + all_match);       
      return all_match;          
    }
    
    if(group_level == 7) {
      if( !( (usages[usage].make == usage_to_find.make) && 
             (usages[usage].model == usage_to_find.model)
           ) 
        ) return;
      
      if( !( (payload.region.states > 0) && 
             (usages[usage].state == usage_to_find.state)
           ) 
      ) return;
      
      if( !( (payload.region.cities > 0) && 
             (usages[usage].city == usage_to_find.city)
           ) 
      ) return;      
      
      if( !( (payload.region.zip_codes > 0) && 
             (usages[usage].zip_code == usage_to_find.zip_code)
           ) 
      ) return; 

      if( !( (payload.region.years > 0) && 
             (usages[usage].sold.year == usage_to_find.sold.year)
           ) 
      ) return; 
      
      if( !( (payload.region.months > 0) && 
             (usages[usage].sold.month == usage_to_find.sold.month)
           ) 
      ) return;       
    }   
        
    if(group_level == 8) {
      return usages[usage].make == usage_to_find.make && 
             usages[usage].model == usage_to_find.model &&
             usages[usage].state == usage_to_find.state &&
             usages[usage].city == usage_to_find.city &&
             usages[usage].zip_code == usage_to_find.zip_code &&
             usages[usage].sold.year == usage_to_find.sold.year &&
             usages[usage].sold.quarter == usage_to_find.sold.quarter &&
             usages[usage].sold.quarter == usage_to_find.sold.month;
    }
  }
};

var fillRecord = function(result) {
  var record = { "sold": {"year": 0, "quarter": 0, "month": 0} };
   
  record.make = result.key[0];
  record.model = result.key[1];  
  record.state = result.key[2];
  record.city = result.key[3];
  record.zip_code = result.key[4];  
  record.sold.year = result.key[5]; 
  record.sold.quarter = result.key[6];
  record.sold.month = result.key[7];
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
   
  //console.log("Yearsxxx " + record.sold.year);   
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
    return isItemPresent(payload.productAttrs.makes, keys[0]) && 
           isItemPresent(payload.productAttrs.models, keys[1]) &&
           isItemPresent(payload.region.states, keys[2]) && 
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
    return isItemPresent(payload.productAttrs.makes, keys[0]) && 
           isItemPresent(payload.productAttrs.models, keys[1]) && 
           isItemPresent(payload.region.states, keys[2]) && 
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
  //var group_level = 2;  
  
  if(payload.region.states.length > 0) group_level = 3;  
  if(payload.region.cities.length > 0) group_level = 4;  
  if(payload.region.zip_codes.length > 0) group_level = 5;  
  if(payload.timescale.years.length > 0) group_level = 6;  
  if(payload.timescale.quarters.length > 0) group_level = 7;  
  if(payload.timescale.months.length > 0) group_level = 8;  
  
  return group_level;
};  

