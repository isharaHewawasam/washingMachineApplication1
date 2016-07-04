'use strict';
var db = require('../database/dbWashDailyAggregate');
var fav_days = require('./favourite_day');
var fav_times = require('./favourite_time');
var filter = require('./filters');

exports.getAllUsage = function(payload, callback) {  

	  getData(payload, function(err, result) { 
	    if(err) {
	    	callback(err, null);
	    } else {  		  	  	
        var usage = {'data': []};       
        var row;
        
        if((payload === null) || (payload === undefined)){
          for(row in result.rows) {                     
            usage.data.push(fillRecord(result.rows[row]));
          }
        } else {
          for(var row in result.rows) {                    
            if(doesRecordFallsInFilter(payload, result.rows[row].key)) {            
              addOrUpdateUsages(payload, usage.data, fillRecord(result.rows[row]));
            }                    
          }   
        }      
        
        console.log("Completed processing total water load records " + Date()); 
        fillFavourites(payload, usage, function(err, result_) {   
          //console.log("Response : " + JSON.stringify(result_)); 
          console.log("Sending response");            
          //callback(err, "ddgfdgdfgresult_");          
	        callback(err, result_);
        });  
	    }
	  });
};

var getData = function(payload, callback) { 
console.log("payload sfsf " + JSON.stringify(payload));

  filter.setPayload(payload);
  filter.setReportType2Sensor();
  console.log("grop level : " + filter.groupLevel());
  //var params = { reduce: true, group: true, group_level: filter.groupLevel() };
  var params = { reduce: true, group_level: filter.groupLevel() };
  //-------------
  var view_name;  
  
  if( (filter.isFilterCategoryByRegion()) || 
      (filter.isFilterCategoryNone()) ||
      (filter.isFilterCategoryMixed())      
    )
    view_name = "averages";
  
  if(filter.isFilterCategoryByYear()) 
    view_name = "averagesByYear";
  
  //-----------
  console.log("Sending usage query request to Usage " + Date());
  db.view('averages', view_name, params, function(err, result) {
    console.log("Received usage query response " + Date());
    console.log("Time : " + Date());
    console.log("Usage view name " + view_name);    
    console.log("Usage view params " + JSON.stringify(params));
    console.log("Usage records form cloudant " + result.rows.length);
    console.log("============================================");
    callback(err, result);
  });
};  

var addOrUpdateUsages = function(payload, usages, new_usage) {
  if(usageExists(payload, usages, new_usage, filter.filterType())) {    
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

var fillFavourites = function(payload, usage, callback) { 
  fav_days.getAllDays(payload, function(err, result) {   
    fav_times.getAllDays(payload, function(err, result) {
      console.log("Processing favourites started : " + Date());       
      for(var item in usage.data) {                
        usage.data[item].popularDay = fav_days.search(usage.data[item]);                
        usage.data[item].popularTime = fav_times.search(usage.data[item]);  
        //console.log("Usage : " + JSON.stringify(usage));
      } 
      console.log("Processing favourites completed : " + Date());
      //console.log("Usage : " + JSON.stringify(usage.data));
      callback(null, usage);
    });     
  });
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

var fillRecord = function(result) {
  var record = { "sold": {"year": 0, "quarter": 0, "month": 0} };
    
  record.make = result.key[0];
  record.model = result.key[1]; 

  if( (filter.isFilterCategoryNone()) || 
      (filter.isFilterCategoryByRegion()) ||
      (filter.isFilterCategoryMixed())
    ) { 
      record.state = result.key[2];
      record.city = result.key[3];
      record.zip_code = result.key[4]; 
  } 
  
  if(filter.isFilterCategoryByYear()) {    
    record.sold.year = result.key[2]; 
    record.sold.quarter = result.key[3];
    record.sold.month = result.key[4];
  }
  
  if(filter.isFilterCategoryMixed()) {    
    record.sold.year = result.key[5]; 
    record.sold.quarter = result.key[6];
    record.sold.month = result.key[7];
  }
  
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
  
  //console.log("record : " + JSON.stringify(record));  
  return record;
};

var doesRecordFallsInFilter = function(payload, keys) {
  if(filter.isFilterCategoryNone())
    return true;

  if(filter.isFilterCategoryByRegion()) {
    return  isItemPresent(payload.productAttrs.makes, "make_name", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
            isItemPresent(payload.region.states, "value", keys[2]) && 
            isItemPresent(payload.region.cities, "value", keys[3]) &&  
            isItemPresent(payload.region.zip_codes, "value", keys[4])
  }
  
  if(filter.isFilterCategoryByYear()) {
    return  isItemPresent(payload.productAttrs.makes, "make_name", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
            isItemPresent(payload.timescale.years, "value", keys[2]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[3]) &&
            isItemPresent(payload.timescale.months, "value", keys[4]);
  }
  
  if(filter.isFilterCategoryMixed()) {
    return  isItemPresent(payload.productAttrs.makes, "make_name", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
            isItemPresent(payload.region.states, "value", keys[2]) && 
            isItemPresent(payload.region.cities, "value", keys[3]) &&  
            isItemPresent(payload.region.zip_codes, "value", keys[4]) &&
            isItemPresent(payload.timescale.years, "value", keys[5]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[6]) &&
            isItemPresent(payload.timescale.months, "value", keys[7]);
  }          
}

var isItemPresent = function(array, key_name, item){  
  if(array.length == 0) return true;
  
  for(var array_item in array) {    
    if(array[array_item][key_name].toString().toUpperCase() === item.toUpperCase()) return true    
  }
  
  return false;
};
exports.getCommonFaults = function(callback) {
	  callback(null, require("./mostusedmodelsdummy").mostUsedModels);  
};

