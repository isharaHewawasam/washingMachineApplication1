'use strict';


var FILTER_CATEGORY = {
  'NONE': 0,
  'BY_PRODUCT': 1,
  'BY_REGION': 2,
  'BY_YEAR': 3
};

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

var filter_category = FILTER_CATEGORY.NONE;
var filter_type = FILTER.NONE;

exports.setPayload = function(payload) { 
  filter_category = FILTER_CATEGORY.NONE;
  filter_type = FILTER.NONE; 
 
  if((payload === null) || (payload === undefined)) return;  
 
  if(payload.region.states.length > 0) filter_type = FILTER.BY_STATE;  
  if(payload.region.cities.length > 0) filter_type = FILTER.BY_CITY;  
  if(payload.region.zip_codes.length > 0) filter_type = FILTER.BY_ZIP_CODE;  
  
  if(payload.timescale.years.length > 0) filter_type = FILTER.BY_YEAR;
  if(payload.timescale.quarters.length > 0) filter_type = FILTER.BY_QUARTER;  
  if(payload.timescale.months.length > 0) filter_type = FILTER.BY_MONTH; 

  switch(filter_type){
    case FILTER.BY_STATE:
    case FILTER.BY_CITY:
    case FILTER.BY_ZIP_CODE:
      filter_category = FILTER_CATEGORY.BY_REGION;
      break;
    case FILTER.BY_YEAR:
    case FILTER.BY_QUARTER:
    case FILTER.BY_MONTH:
      filter_category = FILTER_CATEGORY.BY_YEAR;
      break;
    default:
      filter_category = FILTER.NONE;
      break;
  }    
};

exports.groupLevel = function(){
  if(isFilterByNone()) return 2;
  if(isFilterByMake()) return 1; 
  if(isFilterByModel()) return 2;
  
  if( (isFilterByState()) || (isFilterByYear()) ) return 3;  
  if( (isFilterByCity()) || (isFilterByQuarter()) ) return 4;
  if( (isFilterByZipCode()) || (isFilterByMonth()) ) return 5
  
  return 2;
};

// {"key":["LG","WD100CW","Arizona","Chandler","85225","2015","1","1"]
exports.filterType = function() {  
  if(isFilterByNone()) return 2;
   
  if(isFilterByMake()) return 1; 
  if(isFilterByModel()) return 2;
  
  if(isFilterByState()) return 3;
  if(isFilterByCity()) return 4;
  if(isFilterByZipCode()) return 4;
  
  if(isFilterByYear()) return 2;
  if(isFilterByQuarter()) return 3;
  if(isFilterByMonth()) return 4;
};

exports.isFilterCategoryNone = function(){
  return filter_category === FILTER_CATEGORY.NONE;
};

exports.isFilterCategoryByRegion = function(){
  return filter_category === FILTER_CATEGORY.BY_REGION;
};

exports.isFilterCategoryByYear = function(){
  return filter_category === FILTER_CATEGORY.BY_YEAR;
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