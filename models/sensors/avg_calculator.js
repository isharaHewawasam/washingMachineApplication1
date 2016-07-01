'use strict';
var salesDb = require('../../database/db');
var sensorsDataDb = require('../../database/dbWashDailyAggregate');
var utility = require("../../middle_ware/utility");

//var filter = null;
var keys_map = null;

exports.getSum = function(params, callback) {  
  params.stats = "sum";
  
  if (params.top !== undefined) {
    params.sort = { "value": true, "order": "desc" }
  }
  
  getStats(params, callback);
};


exports.getAverage = function(params, callback) {  
  params.stats = "average";
  getStats(params, callback);
};

function getStats(params, callback) {
  //filter = params.filter;
  keys_map = params.key_maps;
  
  //if (params.filter === undefined) console.log("filter not defined");
	  getData(params, function(err, result) {   
	    if(err) {
	    	callback(err, null);
	    } else {  
        if (params.filter.groupLevel() == 0) {
          callback(err, result);
          return;
        }
        
        if((params.payload === null) || (params.payload === undefined)){
          
          for(var row in result.rows) {
            //console.log(result.rows[row]);
            params.buffer.push(fillRecord(result.rows[row], params));
          }
        } else {
          for(var row in result.rows) {
            //try{
              if(doesRecordFallsInFilter(params, result.rows[row].key)) {
                //console.log("adding " + params.statsKeyName);
                //console.log(JSON.stringify(result.rows[row].key));
                addOrUpdateUsages(params, fillRecord(result.rows[row], params));
              } 
            //}   
            //catch(ex) {
             // console.log("Exception occured");
              //console.log(ex);
              //console.trace(ex.stack);
              //continue;
            //}              
          }   
        }      
        
        
        callback(err, params.buffer);
	    }
	  });
};

function getDb(dbRef) {
  switch (dbRef) {
    case "sales":
      return salesDb;
    case "sensorDailyAggregate":
      return sensorsDataDb;
    default:
      console.log("avg_calculator::getDb(): Invalid db referance");
      return null;
  }
}

//var getData = function(design_doc_name, view_name, group_level, payload, callback) { 
var getData = function(params, callback) {
  if (utility.isParamInvalid (params.databaseType, 
                              "Database not set. avg_calculator::getData")) {
     callback("Database ref not set", null);
     return;
   }
 
  //filter.setPayload(params.payload);  
  
  var view_params = { reduce: true, group: true, group_level: params.filter.groupLevel() };  
  var view_name = params.filter.isFilterCategoryByYear() ? params.view.byYear : params.view.default;
  var db = getDb(params.databaseType);
 

  db.view(params.view.designDocName, view_name, view_params, function(err, result) {
    
    doGetDataLogging(err, result, params, view_params, view_name);    
    
    //sort result is sorting if set
    sortResult(params.sort, result.rows)
    //get top rows if top is set
    //result.rows = getTop(params.top, result.rows);       
    
    callback(err, result);
  });
};  

function getTop(top, rows) {
  if (top !== undefined) {  
    rows = rows.slice(0, top);
  }
  return rows;
}

function doGetDataLogging(err, result, params, view_params, view_name) {
  if(err) {
      console.log("Error in  searching view");
      console.log(err);
    }
    
    console.log("Time : " + Date());
    console.log(params.description);
    console.log("Design Doc name " + params.view.designDocName); 
    console.log("View name " + view_name);    
    console.log("view params " + JSON.stringify(view_params));
    console.log("No records  " + result.rows.length);
    //console.log("Data " + JSON.stringify(result.rows));
    console.log("============================================");
}

function sortResult(sort, data) {
  if (sort === undefined) return;
  
  if (sort.value !== undefined && sort.order === "asc") {
    data.sort(function(a, b) {
        return a.value - b.value;
    });
  }
  
  if(sort.value && sort.order === "desc") {
    data.sort(function(a, b) {
        return b.totalSales - a.totalSales;
    });
  }
}

var addOrUpdateUsages = function(params, new_usage) {
  if(usageExists(params.payload, params.buffer, new_usage, params.filter.filterType())) {
    for(var each_usage in params.buffer) {
      if( (params.buffer[each_usage].make == new_usage.make) && (params.buffer[each_usage].model == new_usage.model) ) {
        if (params.buffer[each_usage].hasOwnProperty(params.statsKeyName)) {
          switch(params.stats) {
            case "sum":
              params.buffer[each_usage][params.statsKeyName] = (params.buffer[each_usage][params.statsKeyName] + new_usage[params.statsKeyName]);
              break;
            case "average":
              params.buffer[each_usage][params.statsKeyName] = (params.buffer[each_usage][params.statsKeyName] + new_usage[params.statsKeyName])/2;
              break;
          }
        } else {
          params.buffer[each_usage][params.statsKeyName] = new_usage[params.statsKeyName];
        }
        return;
      }
    }
  } else { 
    params.buffer.push(new_usage);
  }
};


var usageExists = function(payload, usages, usage_to_find, group_level) { 
  //if (filter.isFilterCategoryNone()) return true;
  //console.log("avg_calc.usageExists : " + JSON.stringify(payload));
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

var fillRecord = function(result, params) {
  var record = {}// "sold": {"year": 0, "quarter": 0, "month": 0} };
  var keys = keys_map.key;
 
  //console.log("keys " + JSON.stringify(keys));
  record.make = result.key[keys.MAKE];
  record.model = result.key[keys.MODEL]; 

  if( (params.filter.isFilterCategoryNone()) || 
      (params.filter.isFilterCategoryByRegion()) ||
      (params.filter.isFilterCategoryMixed())
    ) {
      record.state = result.key[keys.STATE];
      record.city = result.key[keys.CITY];
      record.zip_code = result.key[keys.ZIP_CODE]; 
  } 
  
  if(params.filter.isFilterCategoryByYear()) {   
    record.sold = {};  
    record.sold.year = parseInt(result.key[keys.YEAR_2]); 
    record.sold.quarter = parseInt(result.key[keys.QUARTER_2]);
    record.sold.month = parseInt(result.key[keys.MONTH_2]);
  }
  
  if(params.filter.isFilterCategoryMixed()) {
    record.sold = {};
    record.sold.year = result.key[keys.YEAR]; 
    record.sold.quarter = result.key[keys.QUARTER];
    record.sold.month = result.key[keys.MONTH];
  }
  
  switch (params.stats) {
    case "average":
      record[params.statsKeyName] = (result.value[0].sum / result.value[0].count).toFixed(2);
      record[params.statsKeyName] = parseFloat(record[params.statsKeyName]);
      break;
    case "sum":
      record[params.statsKeyName] = result.value;
      break;
  }
  
  
  //console.log("record : " + JSON.stringify(record));  
  return record;
};

var doesRecordFallsInFilter = function(params, keys) {
  //filter.setPayload(payload);
  
  if(params.filter.isFilterCategoryNone()) {
    return true;
  }
  
  var KEYS = keys_map.key;
  
  if ( params.filter.isFilterCategoryByRegion() ) {
    console.log("keys : " + keys);
       return isItemPresent(params.payload.productAttrs.makes, "make_name", keys[KEYS.MAKE]) && 
              isItemPresent(params.payload.productAttrs.models, "model_name", keys[KEYS.MODEL]) && 
              isItemPresent(params.payload.region.states, "value", keys[KEYS.STATE]) && 
              isItemPresent(params.payload.region.cities, "value", keys[KEYS.CITY]) &&  
              isItemPresent(params.payload.region.zip_codes, "value", keys[KEYS.ZIP_CODE])
    
  }
  
  if ( params.filter.isFilterCategoryByYear() ) {
    return  isItemPresent(params.payload.productAttrs.makes, "make_name", keys[KEYS.MAKE])  && 
            isItemPresent(params.payload.productAttrs.models, "model_name", keys[KEYS.MODEL]) && 
            isItemPresent(params.payload.timescale.years, "value", keys[KEYS.YEAR]) &&
            isItemPresent(params.payload.timescale.quarters, "value", keys[KEYS.QUARTER]) &&
            isItemPresent(params.payload.timescale.months, "value", keys[KEYS.MONTH]);
  }
  
  if(params.filter.isFilterCategoryMixed()) {
    console.log("keys " + keys);
    return  ( params.payload.productAttrs.makes && isItemPresent(params.payload.productAttrs.makes, "make_name", keys[KEYS.MAKE]) ) && 
            isItemPresent(params.payload.productAttrs.models, "model_name", keys[KEYS.MODEL]) && 
            isItemPresent(params.payload.region.states, "value", keys[KEYS.STATE]) && 
            isItemPresent(params.payload.region.cities, "value", keys[KEYS.CITY]) &&  
            isItemPresent(params.payload.region.zip_codes, "value", keys[KEYS.ZIP_CODE]) &&
            isItemPresent(params.payload.timescale.years, "value", keys[KEYS.YEAR]) &&
            isItemPresent(params.payload.timescale.quarters, "value", keys[KEYS.QUARTER]) &&
            isItemPresent(params.payload.timescale.months, "value", keys[KEYS.MONTH])
  }          
}
/* working old
var doesRecordFallsInFilter = function(payload, keys) {
  //filter.setPayload(payload);
  
  if(filter.isFilterCategoryNone()) {
    return true;
  }
  
  if ( filter.isFilterCategoryByRegion() ) {
       return isItemPresent(payload.productAttrs.makes, "make_name", keys[0]) && 
              isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
              isItemPresent(payload.region.states, "value", keys[2]) && 
              isItemPresent(payload.region.cities, "value", keys[3]) &&  
              isItemPresent(payload.region.zip_codes, "value", keys[4])
    
  }
  
  if ( filter.isFilterCategoryByYear() ) {
    return  isItemPresent(payload.productAttrs.makes, "make_name", keys[0])  && 
            isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
            isItemPresent(payload.timescale.years, "value", keys[2]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[3]) &&
            isItemPresent(payload.timescale.months, "value", keys[4]);
  }
  
  if(filter.isFilterCategoryMixed()) {
    return  ( payload.productAttrs.makes && isItemPresent(payload.productAttrs.makes, "make_name", keys[0]) ) && 
            isItemPresent(payload.productAttrs.models, "model_name", keys[1]) && 
            isItemPresent(payload.region.states, "value", keys[2]) && 
            isItemPresent(payload.region.cities, "value", keys[3]) &&  
            isItemPresent(payload.region.zip_codes, "value", keys[4]) &&
            isItemPresent(payload.timescale.years, "value", keys[5]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[6]) &&
            isItemPresent(payload.timescale.months, "value", keys[7]);
  }          
}*/
var isItemPresent = function(array, key_name, item){ 
  if(array.length == 0) return true;

  for(var array_item in array) {    
    //console.log(array[array_item][key_name].toString().toUpperCase() + "   " + item.toUpperCase());
    //console.log(array[array_item][key_name].toString().toUpperCase());
    if(array[array_item][key_name].toString().toUpperCase() === item.toString().toUpperCase()) return true    
  }
 
  return false;
};


