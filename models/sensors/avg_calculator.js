'use strict';
var db = require('../../database/dbWashDailyAggregate');
var filter = require('../filters');
var dummy_data = require('../../database/dummy_data/sensors');

//exports.getAverageUsage = function(sensor_name, payload, usage_records, callback) {
exports.getAverageUsage = function(params, callback) {     
	  getData(params, function(err, result) { 
	    if(err) {
	    	callback(err, null);
	    } else {  
        var row;
        
        if((params.payload === null) || (params.payload === undefined)){
          for(row in result.rows) {                    
            params.buffer.push(fillRecord(result.rows[row], params.avgKeyName));
          }
        } else {
          for(var row in result.rows) {
            if(doesRecordFallsInFilter(params.payload, result.rows[row].key)) { 
              //console.log("adding " + params.avgKeyName);
              //console.log(JSON.stringify(result.rows[row].key));
              addOrUpdateUsages(params.payload, params.buffer, fillRecord(result.rows[row], params.avgKeyName), params.avgKeyName);
            }                    
          }   
        }      
        
        callback(err, params.buffer);
	    }
	  });
};

//var getData = function(design_doc_name, view_name, group_level, payload, callback) { 
var getData = function(params, callback) {  
  filter.setPayload(params.payload);  
  
  var view_params = { reduce: true, group: true, group_level: filter.groupLevel() };  
  var view_name = filter.isFilterCategoryByYear() ? params.view.byYear : params.view.default;
 
  db.view(params.view.designDocName, view_name, view_params, function(err, result) {
    console.log("Time : " + Date());
    console.log(params.description);
    console.log("Design Doc name " + params.view.designDocName); 
    console.log("View name " + view_name);    
    console.log("Usage view params " + JSON.stringify(view_params));
    console.log("Usage records form cloudant " + result.rows.length);
    console.log("============================================");
    callback(err, result);
  });
};  

var addOrUpdateUsages = function(payload, usages, new_usage, avg_key_name) {
  //console.log("exists " + avg_key_name); 
  if(usageExists(payload, usages, new_usage, filter.filterType())) {
    //console.log("exists " + avg_key_name);   
    for(var each_usage in usages) {
      //console.log(new_usage);
      if( (usages[each_usage].make == new_usage.make) && (usages[each_usage].model == new_usage.model) ) {
        
        //console.log("Beforevvv " + JSON.stringify(usages[each_usage]));
        //usages[each_usage].totalLoad = (usages[each_usage].totalLoad + new_usage.totalLoad)/2;
        if (usages[each_usage].hasOwnProperty(avg_key_name)) {
          usages[each_usage][avg_key_name] = (usages[each_usage][avg_key_name] + new_usage[avg_key_name])/2;
        } else {
          usages[each_usage][avg_key_name] = new_usage[avg_key_name];
        }
        //console.log("after " + JSON.stringify(usages[each_usage]));
        return;
      }
    }
  } else { 
    usages.push(new_usage);
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

var fillRecord = function(result, key_name) {
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
  
  record[key_name] = (result.value[0].sum / result.value[0].count).toFixed(2);
  record[key_name] = parseFloat(record[key_name]);
  
  //console.log("record : " + JSON.stringify(record));  
  return record;
};

var doesRecordFallsInFilter = function(payload, keys) {
  //filter.setPayload(payload);
  
  if(filter.isFilterCategoryNone()) {
    return true;
  }

  
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
    //console.log(array[array_item][key_name].toString().toUpperCase() + "   " + item.toUpperCase());
    if(array[array_item][key_name].toString().toUpperCase() === item.toUpperCase()) return true    
  }
 
  return false;
};


