'use strict';

var FILTER = {
  'NONE': 0,
  'BY_MAKE': 1,
  'BY_MODEL': 2,
  'BY_STATE': 3,
  'BY_CITY': 4,
  'BY_ZIP_CODE': 5,
  'BY_YEAR': 6,
  'BY_QUARTER': 7,
  'BY_MONTH': 8,
  'MIXED': 9
};

var filter_type = FILTER.NONE;
var group_level = 0;

exports.setPayload = function(payload) { 
  filter_type = FILTER.NONE; 
 
  if((payload === null) || (payload === undefined)) return;
  
 
  if(payload.region.states.length > 0) filter_type = FILTER.BY_STATE;  
  if(payload.region.cities.length > 0) filter_type = FILTER.BY_CITY;  
  if(payload.region.zip_codes.length > 0) filter_type = FILTER.BY_ZIP_CDE;  
  
  if(payload.timescale.years.length > 0) filter_type = FILTER.BY_YEAR;
  if(payload.timescale.quarters.length > 0) filter_type = FILTER.BY_QUARTER;  
  if(payload.timescale.months.length > 0) filter_type = FILTER.BY_MONTH;    
};

// {"key":["LG","WD100CW","Arizona","Chandler","85225","2015","1","1"]
exports.groupLevel = function() {  
  if(isFilterByNone()) return 2;
   
  if(isFilterByMake()) return 1; 
  if(isFilterByModel()) return 2;
  if(isFilterByState()) return 3;
  if(isFilterByCity()) return 4;
  
  if(isFilterByYear()) return 2;
  if(isFilterByQuarter()) return 3;
  if(isFilterByMonth()) return 4;
};

exports.setGroupLevel = function(param_group_level) {  
  group_level = param_group_level;  
};

var isFilterByNone = function(){
  return (filter_type === FILTER.NONE);
};

var isFilterByMake = function(){
  return filter_type === FILTER.BY_MAKE;
};

var isFilterByModel = function(){
  return filter_type === FILTER.BY_MODEL;
};

var isFilterByState = function(){  
  return filter_type === FILTER.BY_STATE;
};

var isFilterByCity = function(){
  return filter_type === FILTER.BY_CITY;
};

var isFilterByZipCode = function(){
  return filter_type === FILTER.BY_ZIP_CODE;
};

var isFilterByYear = function(){
  return filter_type === FILTER.BY_YEAR;
};

var isFilterByQuarter = function(){
  return filter_type === FILTER.BY_QUARTER;
};

var isFilterByMonth = function(){
  return filter_type === FILTER.BY_MONTH;
};