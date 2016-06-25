'use strict';


var FILTER_CATEGORY = {
  'NONE': 0,
  'BY_PRODUCT': 1,
  'BY_REGION': 2,
  'BY_YEAR': 3,
  'MIXED': 4
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

var REPORT_TYPE = {
  "NONE": 0,
  "SENSOR": 1,
  "SOLD_VS_CONNECTED": 2,
  "SALES": 3,
  "CONNECTED": 4,
  "FAVOURITE": 5
};


var filter_category = FILTER_CATEGORY.NONE;
var filter_type = FILTER.NONE;
var report_type = REPORT_TYPE.NONE;

var isFilterSelected = function(items){
  return (items.length > 0)
}

exports.setReportType2Favourite = function() {
  report_type =  REPORT_TYPE.FAVOURITE;
};

exports.setReportType2Sensor = function() {
  report_type =  REPORT_TYPE.SENSOR;
};

//sales vs connected report
exports.setReportType2SoldVsConnected = function() {
  report_type =  REPORT_TYPE.SOLD_VS_CONNECTED;
}

//Sales report
exports.setReportType2Sales = function() {
  report_type =  REPORT_TYPE.SALES;
}

//Connected report
exports.setReportType2Connected = function() {
  report_type =  REPORT_TYPE.CONNECTED;
}

function isDataTypeSensor() {
  return report_type ===  REPORT_TYPE.SENSOR;
}

function isDataTypeSales() {
  return report_type ===  REPORT_TYPE.SALES;
}

exports.setPayload = function(payload) { 
  filter_category = FILTER_CATEGORY.NONE;
  filter_type = FILTER.NONE; 
 
  if((payload === null) || (payload === undefined)) return;  
  if((payload.region === undefined) && (payload.timescale === undefined)) return;
  
  // Region 
  if(payload.region.states.length > 0) filter_type = FILTER.BY_STATE;  
  if(payload.region.cities.length > 0) filter_type = FILTER.BY_CITY;  
  if(payload.region.zip_codes.length > 0) filter_type = FILTER.BY_ZIP_CODE;  
  
  //Year
  if(payload.timescale.years.length > 0) filter_type = FILTER.BY_YEAR;
  if(payload.timescale.quarters.length > 0) filter_type = FILTER.BY_QUARTER;  
  if(payload.timescale.months.length > 0) filter_type = FILTER.BY_MONTH; 

  //Mixed
  filter_type = isFilterCategoryMixed_(payload) ? FILTER.MIXED : filter_type;
  //If no filter is applied set to by state
  
  
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
    case FILTER.MIXED:
      filter_category = FILTER_CATEGORY.MIXED;
      break;
    default:
      filter_category = FILTER.NONE;
      break;
  }    
};
 
var isFilterCategoryMixed_ = function(payload) {
  // Region 
  var is_filter_by_region = false;
    
  if( (payload.region.states.length > 0) ||  
      (payload.region.cities.length > 0) ||   
      (payload.region.zip_codes.length > 0) ) {
      is_filter_by_region = true;
  }
  
  // year
  var is_filter_by_year = false;
  
  if( (payload.timescale.years.length > 0) ||
      (payload.timescale.quarters.length > 0) ||   
      (payload.timescale.months.length > 0) ) {
      is_filter_by_year = true;  
  }        
  
  return (is_filter_by_region && is_filter_by_year);
};

exports.groupLevel = function(){
  if(filter_category === FILTER_CATEGORY.MIXED)
    return 8;
  
  if (isFilterByNone()) {
    switch(report_type) {
      case REPORT_TYPE.NONE:
      case REPORT_TYPE.SENSOR:
        return 2;
      case REPORT_TYPE.FAVOURITE:
        return 3;  
      case REPORT_TYPE.SALES:
        return 2;        
      case REPORT_TYPE.TOP_3_SELLING_MODELS:
        return 4;
      case REPORT_TYPE.SOLD_VS_CONNECTED:
        return 0;
      default:
        return -1;      
    }    
  }
  
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

exports.isFilterCategoryMixed = function(){
  return filter_category === FILTER_CATEGORY.MIXED;
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