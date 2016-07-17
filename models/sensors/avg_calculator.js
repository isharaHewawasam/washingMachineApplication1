'use strict';
var salesDb = require('../../database/db');
var sensorsDataDb = require('../../database/dbWashDailyAggregate');
var utility = require("../../middle_ware/utility");

//var filter = null;
//var keys_map = null;

exports.getSum = function(params, callback) {  
  params.stats = "sum";
  
  if (params.top !== undefined) {
    params.sort = { "value": true, "order": "desc" }
  }
  
  getStats(params, callback);
};

exports.getCount = function(params, callback) {  
  params.stats = "count";
  getStats(params, callback);
};

exports.getAverage = function(params, callback) {  
  params.stats = "average";
  getStats(params, callback);
};

function getStats(params, callback) {
  //filter = params.filter;
  //keys_map = params.key_maps;
  
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
  var group_level = (params.group_level === undefined) ? params.filter.groupLevel() : params.group_level;
  
  var view_params = { reduce: true, group: true, group_level: group_level, "startkey": params.start_key, "endkey": params.end_key };  
  //var view_name = params.filter.isFilterCategoryByYear() ? params.view.byYear : params.view.default;
  
  var view_name = null;
  if (params.filter.isFilterCategoryByYear()) {
    view_name = params.view.byYear;
  } else if (params.filter.isFilterCategoryByFamily()) {
    view_name = params.view.byFamily;
  } else {
    view_name = params.view.default;
  }
  
  var db = getDb(params.databaseType);
 
  //console.log("In Group level");
  //params.keys_map.dumpReportType();
  
  db.view(params.view.designDocName, view_name, view_params, function(err, result) {
    
    doGetDataLogging(err, result, params, view_params, view_name);    
    
    //sort result is sorting if set
    //sortResult(params.sort, result.rows)
    //get top rows if top is set
    //if (params.top !== undefined) {
      //result.rows = getTop(params.top, result.rows);       
    //}
    
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
        if (a.value instanceof Array) {
          return a.value[0].sum - b.value[0].sum;
        } else {
          return a.value - b.value;
        }
    });
  }
  
  if(sort.value && sort.order === "desc") {
    data.sort(function(a, b) {
      if (a.value instanceof Array) {
        return b.value[0].sum - a.value[0].sum;
      } else {
        return b.value - a.value;
      }
    });
  }
}

var addOrUpdateUsages = function(params, new_usage) {
  //console.log("Add usage " + JSON.stringify(params.buffer));
  var xxx_007 = params.xxx_007 !== undefined ? true : false;
  
  if(usageExists(params.payload, params.buffer, new_usage, xxx_007)) {
    //console.log("Existing : " + JSON.stringify(new_usage));
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
    //console.log("Not existing : " + JSON.stringify(new_usage));
    params.buffer.push(new_usage);
  }
};

//Rem : xxx_007
var usageExists = function(payload, usages, usage_to_find, xxx_007) { 
  //if (filter.isFilterCategoryNone()) return true;
  //console.log("avg_calc.usageExists : " + JSON.stringify(usage_to_find));
  for(var each_usage in usages) {    
    //console.log("1:" + JSON.stringify(usages[each_usage]));
    //console.log("2:" + JSON.stringify(usage_to_find));
    
    if(!do_make_and_model_match(usages[each_usage], usage_to_find)) continue; 
    
    //for insights - disconnected chart
    //for sold and connected - group
    //var all_match = false;
    //------------
    //var all_match = true;
    var all_match = xxx_007 ? false : true;
    
    if ((payload.productAttrs.skus !== undefined) && (payload.productAttrs.skus.length > 0)) {
      all_match = (usages[each_usage].sku == usage_to_find.sku);
      if(!all_match) return;
    }
    
    if(payload.region.states.length > 0) {         
        all_match = (usages[each_usage].state == usage_to_find.state);
        //console.log("state " + all_match);
        if(!all_match) return;
      }
      
      //console.log("1");
      if(payload.region.cities.length > 0) {         
        all_match = (usages[each_usage].city == usage_to_find.city);
        //console.log("city " + all_match);
        if(!all_match) return;
      }
      //console.log("2");
      
      if(payload.region.zip_codes.length > 0) {         
        all_match = (usages[each_usage].zip_code == usage_to_find.city);
        //console.log("zip " + all_match);
        if(!all_match) return;
      }
      
      if(payload.timescale.years.length > 0) {         
        all_match = (usages[each_usage].sold.year == usage_to_find.sold.year);
        //console.log("year " + all_match);
        if(!all_match) return;
      }
      
      if(payload.timescale.quarters.length > 0) {         
        all_match = (usages[each_usage].sold.quarter == usage_to_find.sold.quarter);
        //console.log("quarter " + all_match);
        if(!all_match) return;
      }
      
      if(payload.timescale.months.length > 0) {         
        all_match = (usages[each_usage].sold.month == usage_to_find.sold.month);
        //console.log("months " + all_match);
        if(!all_match) return;
      }
    
    //console.log("Usage " + JSON.stringify(usages[each_usage]));
    //console.log("All match " + all_match);
    if (all_match) return true;
  }
};

var do_make_and_model_match = function(usage1, usage2) {
  return (usage1.make == usage2.make) && 
         (usage1.model == usage2.model);
};

var fillRecord = function(result, params) {
  var record = {}// "sold": {"year": 0, "quarter": 0, "month": 0} };
  //var keys = params.keys_map.key;
 
  //console.log("keys " + JSON.stringify(keys));
  
  if (params.statsKeyNameX !== undefined) {
    record[params.statsKeyNameX] = result.key[params.key_maps.key.STATS_KEY_X];
  }
  
  record.make = result.key[params.key_maps.key.MAKE];
  record.model = result.key[params.key_maps.key.MODEL]; 
  record.sku = result.key[params.key_maps.key.SKU];

  if( (params.filter.isFilterCategoryNone()) || 
      (params.filter.isFilterCategoryByRegion()) ||
      (params.filter.isFilterCategoryMixed())
    ) {
      record.state = result.key[params.key_maps.key.STATE];
      record.city = result.key[params.key_maps.key.CITY];
      record.zip_code = result.key[params.key_maps.key.ZIP_CODE]; 
  } 
  
  if(params.filter.isFilterCategoryByYear()) {   
    record.sold = {};  
    record.sold.year = parseInt(result.key[params.key_maps.key.YEAR]); 
    record.time_scale = parseInt(result.key[params.key_maps.key.YEAR]);
    
    if (params.filter.isFilterByQuarter()) {
      record.sold.quarter = parseInt(result.key[params.key_maps.key.QUARTER]);
      record.time_scale = parseInt(result.key[params.key_maps.key.YEAR]) + " Q" + 
                          parseInt(result.key[params.key_maps.key.QUARTER]); 
    }
    
    if (params.filter.isFilterByMonth()) {
      record.sold.month = parseInt(result.key[params.key_maps.key.MONTH]);
      record.time_scale = parseInt(result.key[params.key_maps.key.YEAR]) + " " + 
                          parseInt(result.key[params.key_maps.key.Month]); 
    }
    
    
  }
 
  if(params.filter.isFilterCategoryByFamily()){
    //age  
    //if (params.filter.isFilterByUserAge()) {
      record.age = result.key[params.key_maps.key.AGE];
    //}
    
    //members count  
    //if (params.filter.isFilterByUserFamilyMembersCount()) {
      record.family_members_count = result.key[params.key_maps.key.MEMBERS];
    //}
    
    //income  
    //if (params.filter.isFilterByUserIncome()) {
      record.user_income = result.key[params.key_maps.key.INCOME];
    //}
  }
  
  if(params.filter.isFilterCategoryByMfgDate()){
    //console.log("fill record : filter.isFilterCategoryByMfgDate()");
    record.mfg_date = result.key[params.key_maps.key.MFG_DATE];
  }
  
  if(params.filter.isFilterCategoryMixed()) {
    record.sold = {};
    record.sold.year = result.key[params.key_maps.key.YEAR]; 
    record.sold.quarter = result.key[params.key_maps.key.QUARTER];
    record.sold.month = result.key[params.key_maps.key.MONTH];
    
    record.time_scale = parseInt(result.key[params.key_maps.key.YEAR]) + 
                       " Q" + parseInt(result.key[params.key_maps.key.QUARTER]); 
    
    record.age = result.key[params.key_maps.key.AGE]; 
    record.family_members_count = result.key[params.key_maps.key.MEMBERS];
    record.user_income = result.key[params.key_maps.key.INCOME];
  }
  
  switch (params.stats) {
    case "count":
      record[params.statsKeyName] = result.value.count;
      break;
    case "average":
      //console.log("Record :" + JSON.stringify(record));
      //console.log("Stats : " + JSON.stringify(result.value[0]));
      record[params.statsKeyName] = (result.value[0].sum / result.value[0].count).toFixed(2);
      record[params.statsKeyName] = parseFloat(record[params.statsKeyName]);
      break;
    case "sum":
      if (result.value instanceof Array) {
        record[params.statsKeyName] = result.value[0];
      } else {
        record[params.statsKeyName] = result.value;
      }
      break;
  }
  
  
  console.log("record : " + JSON.stringify(record));  
  return record;
};

var doesRecordFallsInFilter = function(params, keys) {
  //filter.setPayload(payload);
  
  if(params.filter.isFilterCategoryNone()) {
    return true;
  }
  
  if (params.filter.isFilterCategoryByMfgDate()) {
    var dates_arr = params.payload.productAttrs.mfg_date.start_date.split("/");
    var start_date = new Date(dates_arr[2], dates_arr[1], dates_arr[0]);
    
    dates_arr = params.payload.productAttrs.mfg_date.end_date.split("/");
    var end_date = new Date(dates_arr[2], dates_arr[1], dates_arr[0]);
    
    //console.log("xxx : " + keys);
    //console.log("x2 : " + params.key_maps.key.MFG_DATE);
    //console.log("---------------------------");
    dates_arr = keys[params.key_maps.key.MFG_DATE].split("/");
    var mfg_date = new Date(dates_arr[2], dates_arr[1], dates_arr[0]);
    
    if (mfg_date <= start_date || mfg_date >= end_date) {
      //console.log("Start Date : " + params.payload.productAttrs.mfg_date.start_date);
      //console.log("End Date : " + params.payload.productAttrs.mfg_date.end_date);
      //console.log("Mfg Date : " + keys[params.key_maps.key.MFG_DATE]);
      return false;
    }
  }
  
  if ( params.filter.isFilterCategoryByProduct() ) {
    console.log(JSON.stringify(keys));
       return isItemPresent(params.payload.productAttrs.makes, "value", keys[params.key_maps.key.MAKE]) && 
              isItemPresent(params.payload.productAttrs.models, "value", keys[params.key_maps.key.MODEL]) &&
              isItemPresent(params.payload.productAttrs.skus, "value", keys[params.key_maps.key.SKU])
  }
  
  if ( params.filter.isFilterCategoryByRegion() ) {
       return isItemPresent(params.payload.productAttrs.makes, "value", keys[params.key_maps.key.MAKE]) && 
              isItemPresent(params.payload.productAttrs.models, "value", keys[params.key_maps.key.MODEL]) && 
              isItemPresent(params.payload.productAttrs.skus, "value", keys[params.key_maps.key.SKU]) && 
              isItemPresent(params.payload.region.states, "value", keys[params.key_maps.key.STATE]) && 
              isItemPresent(params.payload.region.cities, "value", keys[params.key_maps.key.CITY]) &&  
              isItemPresent(params.payload.region.zip_codes, "value", keys[params.key_maps.key.ZIP_CODE])
    
  }
  
  if ( params.filter.isFilterCategoryByYear() ) {
    return  isItemPresent(params.payload.productAttrs.makes, "value", keys[params.key_maps.key.MAKE])  && 
            isItemPresent(params.payload.productAttrs.models, "value", keys[params.key_maps.key.MODEL]) && 
            isItemPresent(params.payload.productAttrs.skus, "value", keys[params.key_maps.key.SKU]) &&
            isItemPresent(params.payload.timescale.years, "value", keys[params.key_maps.key.YEAR]) &&
            isItemPresent(params.payload.timescale.quarters, "value", keys[params.key_maps.key.QUARTER]) &&
            isItemPresent(params.payload.timescale.months, "value", keys[params.key_maps.key.MONTH]);
  }
  
  if(params.filter.isFilterCategoryByFamily()) {
    //console.log("Keys : " + JSON.stringify(keys));
    //console.log("Age key id :" + keys[params.key_maps.key.MEMBERS]);
    return  isItemPresent(params.payload.productAttrs.makes, "value", keys[params.key_maps.key.MAKE]) && 
            isItemPresent(params.payload.productAttrs.models, "value", keys[params.key_maps.key.MODEL]) && 
            isItemPresent(params.payload.productAttrs.skus, "value", keys[params.key_maps.key.SKU]) &&
            isItemPresent(params.payload.age, "value", keys[params.key_maps.key.AGE], true, require("../demographics/data/age-ranges").ageRanges) &&
            isItemPresent(params.payload.family_members_count, "value", keys[params.key_maps.key.MEMBERS]) &&
            isItemPresent(params.payload.income, "value", keys[params.key_maps.key.INCOME], true, require("../demographics/data/income-ranges").incomeRanges)
  }
  
  if(params.filter.isFilterCategoryMixed()) {
    return  ( params.payload.productAttrs.makes && isItemPresent(params.payload.productAttrs.makes, "value", keys[params.key_maps.key.MAKE]) ) && 
            isItemPresent(params.payload.productAttrs.models, "value", keys[params.key_maps.key.MODEL]) && 
            isItemPresent(params.payload.productAttrs.skus, "value", keys[params.key_maps.key.SKU]) &&
            isItemPresent(params.payload.region.states, "value", keys[params.key_maps.key.STATE]) && 
            isItemPresent(params.payload.region.cities, "value", keys[params.key_maps.key.CITY]) &&  
            isItemPresent(params.payload.region.zip_codes, "value", keys[params.key_maps.key.ZIP_CODE]) &&
            isItemPresent(params.payload.timescale.years, "value", keys[params.key_maps.key.YEAR]) &&
            isItemPresent(params.payload.timescale.quarters, "value", keys[params.key_maps.key.QUARTER]) &&
            isItemPresent(params.payload.timescale.months, "value", keys[params.key_maps.key.MONTH]) && 
            isItemPresent(params.payload.age, "value", keys[params.key_maps.key.AGE], true, require("../demographics/data/age-ranges").ageRanges) &&
            isItemPresent(params.payload.family_members_count, "value", keys[params.key_maps.key.MEMBERS]) &&
            isItemPresent(params.payload.income, "value", keys[params.key_maps.key.INCOME], true, require("../demographics/data/income-ranges").incomeRanges)
  }          
}

var isItemPresent = function(array, key_name, item, isRange, ranges){  
  if(array == undefined || array.length == 0) return true;
  
  for (var array_item in array) {    
    if (isRange) {
      for (var each_item in ranges) {
        if (ranges[each_item].id == array[array_item][key_name]) {
          //console.log("Age range id : " + array[array_item][key_name]);
          //console.log("Range : " + JSON.stringify(ranges[each_item].range));
          //console.log("Key : " + item + "/" + "Start : " + ranges[each_item].start + "/" + "End : " + ranges[each_item].end);
          //console.log("Falling in rage : " + (item >= ranges[each_item].start && item <= ranges[each_item].end));
          return (item >= ranges[each_item].start && item <= ranges[each_item].end);
        }
      }
    } else {
      if(array[array_item][key_name].toString().toUpperCase() === item.toUpperCase()) return true 
    }      
  }
  
  return false;
};

