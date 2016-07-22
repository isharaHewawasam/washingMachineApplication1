'use strict';
var db = require('../database/dbWashDailyAggregate');
var fav_days = require('./favourite_day');
var fav_times = require('./favourite_time');
var Filter = require("./filters");
var filter;

exports.getAllUsage = function(payload, callback) {  
  addMissingData(payload, function(err, result_) {
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
            //console.log(JSON.stringify(payload));   
            //console.log(JSON.stringify(result.rows[row].key));
            //console.log("****************************");               
            if(doesRecordFallsInFilter(payload, result.rows[row].key)) {   
              console.log("adding");             
              addOrUpdateUsages(payload, usage.data, fillRecord(result.rows[row]));
            }                    
          }   
        }      
        
        console.log("Completed processing total water load records " + Date()); 
        //console.log(JSON.stringify(usage));
        fillFavourites(payload, usage, function(err, result_) {   
          //console.log("Response : " + JSON.stringify(result_)); 
          console.log("Sending response");            
          //callback(err, "ddgfdgdfgresult_");          
	        callback(err, result_);
        });  
	    }
	  });
  });
};

var getData = function(payload, callback) { 

  filter  = new Filter(payload, 1);
  //console.log("Payload for usage : " + JSON.stringify(payload));
  //filter.setReportType2Sensor();
  console.log("grop level : " + filter.groupLevel());
  //var params = { reduce: true, group: true, group_level: filter.groupLevel() };
  var params = { reduce: true, group_level: filter.groupLevel() };
  //-------------
  var view_name;  
  
  //if (filter.isFilterCategoryByProduct()) console.log("isFilterCategoryByProduct()");
  
  if( (filter.isFilterCategoryByRegion()) || 
      (filter.isFilterCategoryByProduct()) ||
      (filter.isFilterCategoryByFamily()) ||
      (filter.isFilterCategoryNone()) ||
      (filter.isFilterCategoryMixed())      
    )
    view_name = "averages";
  
  if(filter.isFilterCategoryByYear()) 
    view_name = "averagesByYear";
  
  if(filter.isFilterCategoryByFamily()) {
    view_name = "averagesByFamily";
  }
  
   
  //-----------
  console.log("Sending usage query request to Usage " + Date());
  db.view('averages', view_name, params, function(err, result) {
    if (err) {
       console.log(JSON.stringify(err));
    }
    console.log("Received usage query response " + Date());
    console.log("Time : " + Date());
    console.log("Usage view name " + view_name);    
    console.log("Usage view params " + JSON.stringify(params));
    //console.log("Usage records form cloudant " + JSON.stringify(result.rows));
    console.log("Usage records form cloudant " + result.rows.length);
    console.log("============================================");
    callback(err, result);
  });
};  

var addOrUpdateUsages = function(payload, usages, new_usage) {
  if(usageExists(payload, usages, new_usage)) {    
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

var usageExists = function(payload, usages, usage_to_find) {  
  for(var each_usage in usages) {   
   console.log(usage_to_find);  
    if(!do_make_and_model_match(usages[each_usage], usage_to_find)) continue; 
    
    var all_match = true;
    
    if ((payload.productAttrs.skus !== undefined) && (payload.productAttrs.skus.length > 0)) {
      all_match = (usages[each_usage].sku == usage_to_find.sku);
      if(!all_match) return;
    }
    
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
  record.sku = result.key[2];

  //product
  if( (filter.isFilterCategoryNone()) || 
      (filter.isFilterCategoryByRegion()) ||
      (filter.isFilterCategoryMixed())
    ) { 
      record.state = result.key[3];
      record.city = result.key[4];
      record.zip_code = result.key[5]; 
  } 
  
  if(filter.isFilterCategoryByFamily()){
    //age  
    //if (filter.isFilterByUserAge()) {
      record.age = result.key[3];
    //}
    
    //members count  
    //if (filter.isFilterByUserFamilyMembersCount()) {
      record.family_members_count = result.key[4];
    //}
    
    //income  
    //if (filter.isFilterByUserIncome()) {
      record.user_income = result.key[5];
    //}
  }
  
  //mixed
  if(filter.isFilterCategoryMixed()) {    
    record.sold.year = result.key[6]; 
    record.sold.quarter = result.key[7];
    record.sold.month = result.key[8];
    
    //age  
    //if (filter.isFilterByUserAge()) {
      record.age = result.key[9];
    //}
    
    //members count  
    //if (filter.isFilterByUserFamilyMembersCount()) {
      record.family_members_count = result.key[10];
    //}
    
    //income  
    //if (filter.isFilterByUserIncome()) {
      record.user_income = result.key[11];
    //}
  }
  
  record.totalLoad = (result.value[0].sum / result.value[0].count).toFixed(2);
  record.popularDay = "";
  record.popularTime = "";
  
  //console.log("keys : " + JSON.stringify(result.key));
  console.log("record : " + JSON.stringify(record));  
  return record;
};

var doesRecordFallsInFilter = function(payload, keys) {
  if(filter.isFilterCategoryNone())
    return true;
  
  if ( filter.isFilterCategoryByProduct() ) {
    //console.log("Keys : " + JSON.stringify(keys));
    //console.log("Companing " + JSON.stringify(payload.productAttrs.models));
    //console.log(isItemPresent(payload.productAttrs.models, "value", keys[1]));
    
       var result = isItemPresent(payload.productAttrs.makes, "value", keys[0]) && 
              isItemPresent(payload.productAttrs.models, "value", keys[1]) &&
              isItemPresent(payload.productAttrs.sku, "value", keys[2]);
       console.log("Recore falling in filter : " + result);
       return result;       
  }
  
  if(filter.isFilterCategoryByRegion()) {
    return  isItemPresent(payload.productAttrs.makes, "value", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "value", keys[1]) && 
            isItemPresent(payload.productAttrs.skus, "value", keys[2]) &&
            isItemPresent(payload.region.states, "value", keys[3]) && 
            isItemPresent(payload.region.cities, "value", keys[4]) &&  
            isItemPresent(payload.region.zip_codes, "value", keys[5]);
  }
  
  if(filter.isFilterCategoryByYear()) {
    return  isItemPresent(payload.productAttrs.makes, "value", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "value", keys[1]) && 
            isItemPresent(payload.productAttrs.skus, "value", keys[2]) &&
            isItemPresent(payload.timescale.years, "value", keys[3]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[4]) &&
            isItemPresent(payload.timescale.months, "value", keys[5]);
  }
  
  if(filter.isFilterCategoryByFamily()) {
    return  isItemPresent(payload.productAttrs.makes, "value", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "value", keys[1]) && 
            isItemPresent(payload.productAttrs.skus, "value", keys[2]) && 
            isItemPresent(payload.age, "value", keys[3], true, require("./demographics/data/age-ranges").ageRanges) &&
            isItemPresent(payload.family_members_count, "value", keys[4]) &&
            isItemPresent(payload.income, "value", keys[5], true, require("./demographics/data/income-ranges").incomeRanges);
  }
  
  if(filter.isFilterCategoryMixed()) {
    return  isItemPresent(payload.productAttrs.makes, "value", keys[0]) && 
            isItemPresent(payload.productAttrs.models, "value", keys[1]) && 
            isItemPresent(payload.productAttrs.skus, "value", keys[2]) && 
            isItemPresent(payload.region.states, "value", keys[3]) && 
            isItemPresent(payload.region.cities, "value", keys[4]) &&  
            isItemPresent(payload.region.zip_codes, "value", keys[5]) &&
            isItemPresent(payload.timescale.years, "value", keys[6]) &&
            isItemPresent(payload.timescale.quarters, "value", keys[7]) &&
            isItemPresent(payload.timescale.months, "value", keys[8]) &&
            isItemPresent(payload.age, "value", keys[9], true, require("./demographics/data/age-ranges").ageRanges) &&
            isItemPresent(payload.family_members_count, "value", keys[10]) &&
            isItemPresent(payload.income, "value", keys[11], true, require("./demographics/data/income-ranges").incomeRanges);
  }          
}

/*
"age": [{
		"value": 1
	}]
*/  
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
      //console.log("x3 " + array[array_item][key_name].toString().toUpperCase() + "/" + item.toString().toUpperCase());
      if(array[array_item][key_name].toString().toUpperCase() === item.toString().toUpperCase()) return true 
    }      
  }
  
  //console.log("Not existing " + JSON.stringify(array) + "/" + item);
  return false;
};

function addMissingData(payload, callback) {
  var FilterClass = require("./filters"); 
  var filter = new FilterClass(payload, 1)
  
  if (!filter.isFilterByMake()) return callback(null, payload);
  
 //console.log("Hell1 " + JSON.stringify(payload));  
  if (filter.isFilterByMake()) {
    var Config = require("./config");
    var makes = [];
    
    makes.push(payload.productAttrs.makes[0].value);
    Config.getAllModelsByMakes(makes, function(err, result) {
      //console.log("Result : " + JSON.stringify(result));
      if (result) {
        //console.log(JSON.stringify(result));
        for (var each_make in result) {
          //console.log("Make : " + JSON.stringify(result[each_make]));
          for (var each_model in result[each_make]) {
            var model = {"value": result[each_make][each_model]["model"]};
            //console.log(JSON.stringify(model));
            payload.productAttrs.models.push( model );
          }
        }
         console.log("Hell2 " + JSON.stringify(payload));
        callback(err, result);
        return;
      }
    });
    
    //console.log("end");
  }
  
  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");
  //console.log("Hell3 " + JSON.stringify(payload));
  //callback(null, payload);
  
}

