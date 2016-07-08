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
  "SOLD_UNGROUPED": 2,
  "CONNECTED_UNGROUPED": 3,
  "SALES": 4,
  "CONNECTED": 5,
  "FAVOURITE": 6,
  "SALES_BY_REGION_AND_PRODUCT": 7,
  "CONNECTED_BY_REGION_AND_PRODUCT": 8,
  "SALES_VOLUME": 9,
  "SALES_BY_STATE": 10,
  "CONNECTED_BY_STATE": 11,
  "INSIGHTS": 12,
};

module.exports.REPORT_TYPE = REPORT_TYPE;

var Filter = function Filter(payload, view_name){
  require("../middle_ware/adjust_payload").setPayload(payload);
  
  this.filter_category = FILTER_CATEGORY.NONE;
  this.filter_type = FILTER.NONE;
  this.report_type = view_name;    

  if((payload === null) || (payload === undefined)) return;  
  if((payload.region === undefined) && (payload.timescale === undefined)) return;
 
   // Region
  if (payload.region) {
    if ((payload.region.states) && (payload.region.states.length)) {
       this.filter_type = FILTER.BY_STATE;
    }
    
    if ((payload.region.cities) && (payload.region.cities.length)) {
       this.filter_type = FILTER.BY_CITY;  
    }
    
    if ((payload.region.zip_codes) && (payload.region.zip_codes.length)) {
       this.filter_type = FILTER.BY_ZIP_CODE;
    }
  }
  
  //Timescale
  if (payload.timescale) {
    if ((payload.timescale.years) && (payload.timescale.years.length)) {
       this.filter_type = FILTER.BY_YEAR;
       this.years = payload.timescale.years;
    }
    
    if ((payload.timescale.quarters) && (payload.timescale.quarters.length)) {
       this.filter_type = FILTER.BY_QUARTER;  
       this.years = payload.timescale.years;
       this.quarters = payload.timescale.quarters
    }
    
    if ((payload.timescale.months) && (payload.timescale.months.length)) {
       this.filter_type = FILTER.BY_MONTH; 
       this.years = payload.timescale.years;
       this.quarters = payload.timescale.quarters
       this.months = payload.timescale.months;
    }
  }
  
  //Mixed
  this.filter_type = isFilterCategoryMixed_(payload) ? FILTER.MIXED : this.filter_type;
  //If no filter is applied set to by state
  
  
  switch(this.filter_type){
    case FILTER.BY_STATE:
    case FILTER.BY_CITY:
    case FILTER.BY_ZIP_CODE:
      this.filter_category = FILTER_CATEGORY.BY_REGION;
      break;
    case FILTER.BY_YEAR:
    case FILTER.BY_QUARTER:
    case FILTER.BY_MONTH:
      this.filter_category = FILTER_CATEGORY.BY_YEAR;
      break;
    case FILTER.MIXED:
      this.filter_category = FILTER_CATEGORY.MIXED;
      break;
    default:
      this.filter_category = FILTER.NONE;
      break;
  }    
};

module.exports = Filter;

var isFilterCategoryMixed_ = function(payload) {
  // Region 
  var is_filter_by_region = false;
    
  if (payload.region) {  
    if ( ((payload.region.states) && (payload.region.states.length > 0)) ||  
       (payload.region.cities.length > 0) ||   
       (payload.region.zip_codes.length > 0) ) {
       is_filter_by_region = true;
    }
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

Filter.prototype.isFilterCategoryMixed_ = isFilterCategoryMixed_;

Filter.prototype.filterDescription = function() {
  if (this.isFilterByYear()) {
    return JSON.stringify(this.years[0].value);
  }
  
  if (this.isFilterByQuarter()) {
    if (this.quarters[0].length == 1) {
      return this.years[0].value + " - Q" + this.quarters[0].value;
    } else {
      return this.years[0].value;
    }
  }
  
  if (this.isFilterByMonth()) {
    return this.years[0].value + " - " + this.months[0].value;
  }
  
  if (this.isFilterCategoryMixed()) {
    var desc = this.years[0].value; 
    
    if ( (this.quarters !== undefined) && (this.quarters.length == 1)) {
      desc = desc + " Q" + this.quarters[0].value;
    }
    return desc;
  }
};



Filter.prototype.groupLevel = function(){
  if(this.filter_category === FILTER_CATEGORY.MIXED) return 8;
  
  if (this.isFilterByNone()) {
    switch(this.report_type) {
      case REPORT_TYPE.NONE:
      case REPORT_TYPE.SENSOR:
        return 2;
      case REPORT_TYPE.FAVOURITE:
        return 3;  
      case REPORT_TYPE.SALES_VOLUME:
        return 2;  
      case REPORT_TYPE.SALES:
        return 2;        
      case REPORT_TYPE.TOP_3_SELLING_MODELS:
        return 4;
      case REPORT_TYPE.SOLD_UNGROUPED:
        return 7;
      case REPORT_TYPE.CONNECTED_UNGROUPED:
        return 4;  
      case REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT:
        return 2;  
      case REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT:
        return 2;    
      case REPORT_TYPE.SALES_BY_STATE:
      case REPORT_TYPE.CONNECTED_BY_STATE:
      case REPORT_TYPE.INSIGHTS:
        return 1;        
      default:
        console.log("filters::groupLevel() : Invalid Report or View Name");
        return -1;      
    }    
  }
  
  switch (this.report_type) {
    case  REPORT_TYPE.SOLD_UNGROUPED:
      if ( this.isFilterByYear() ) return 3;  
      if ( this.isFilterByQuarter() ) return 4;
      if ( this.isFilterByMonth() ) return 5;
      
      if ( this.isFilterByState() ) return 6;  
      if ( this.isFilterByCity() ) return 7;
      if ( this.isFilterByZipCode() ) return 8;
      break;
    case  REPORT_TYPE.CONNECTED_UNGROUPED:
      if ( this.isFilterByYear() ) return 3;  
      if ( this.isFilterByQuarter() ) return 4;
      if ( this.isFilterByMonth() ) return 5;
      
      if ( this.isFilterByState() ) return 6;  
      if ( this.isFilterByCity() ) return 7;
      if ( this.isFilterByZipCode() ) return 8;  
       break;
    case  REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT:
    case  REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT:
      if ( this.isFilterByState() ) return 1;  
      if ( this.isFilterByCity() ) return 2;
      if ( this.isFilterByZipCode() ) return 3; 
      
      if ( this.isFilterByMake() ) return 4; 
      if ( this.isFilterByModel() ) return 5;

      if ( this.isFilterByYear() ) return 6;  
      if ( this.isFilterByQuarter() ) return 7;
      if ( this.isFilterByMonth() ) return 8;       
      break;     
   case  REPORT_TYPE.SALES_VOLUME:
   case  REPORT_TYPE.SALES:
      if ( this.isFilterByMake() ) return 1; 
      if ( this.isFilterByModel() ) return 2;   
      
      if ( this.isFilterByYear() ) return 3;  
      if ( this.isFilterByQuarter() ) return 4;
      if ( this.isFilterByMonth() ) return 5;   
      
      if ( this.isFilterByState() ) return 6;  
      if ( this.isFilterByCity() ) return 7;
      if ( this.isFilterByZipCode() ) return 8; 
      break;         
    default:  
      if ( this.isFilterByMake() ) return 1; 
      if ( this.isFilterByModel() ) return 2;
  
      if ( (this.isFilterByState() ) || ( this.isFilterByYear() ) ) return 3;  
      if ( (this.isFilterByCity() ) || ( this.isFilterByQuarter() ) ) return 4;
      if ( (this.isFilterByZipCode() ) || (this.isFilterByMonth() ) ) return 5;
      
      return 2;
  }
};

// {"key":["LG","WD100CW","Arizona","Chandler","85225","2015","1","1"]
var filterType  = function() {  
  if(this.isFilterByNone()) return 2;
   
  if(this.isFilterByMake()) return 1; 
  if(this.isFilterByModel()) return 2;
  
  if(this.isFilterByState()) return 3;
  if(this.isFilterByCity()) return 4;
  if(this.isFilterByZipCode()) return 4;
  
  if(this.isFilterByYear()) return 2;
  if(this.isFilterByQuarter()) return 3;
  if(this.isFilterByMonth()) return 4;
};

Filter.prototype.filterType = filterType;

Filter.prototype.isFilterCategoryNone = function(){
  return this.filter_category === FILTER_CATEGORY.NONE;
};

Filter.prototype.isFilterCategoryByRegion = function(){
  return this.filter_category === FILTER_CATEGORY.BY_REGION;
};

Filter.prototype.isFilterCategoryByYear = function(){
  return this.filter_category === FILTER_CATEGORY.BY_YEAR;
};

Filter.prototype.isFilterCategoryMixed = function(){
  return this.filter_category === FILTER_CATEGORY.MIXED;
};

Filter.prototype.isFilterByNone = function(){
  return this.filter_type === FILTER.NONE;
};

var isFilterByMake = function(){
  return this.filter_type === FILTER.BY_MAKE;
};

Filter.prototype.isFilterByMake = isFilterByMake;

var isFilterByModel = function(){
  return this.filter_type === FILTER.BY_MODEL;
};

Filter.prototype.isFilterByModel = isFilterByModel;

var isFilterByState = function(){  
  return this.filter_type === FILTER.BY_STATE;
};

Filter.prototype.isFilterByState = isFilterByState;

var isFilterByCity = function(){
  return this.filter_type === FILTER.BY_CITY;
};

Filter.prototype.isFilterByCity = isFilterByCity;

var isFilterByZipCode = function(){
  return this.filter_type === FILTER.BY_ZIP_CODE;
};

Filter.prototype.isFilterByZipCode = isFilterByZipCode;

var isFilterByYear = function(){
  return this.filter_type === FILTER.BY_YEAR;;
};

Filter.prototype.isFilterByYear = isFilterByYear;

var isFilterByQuarter = function(){
  return this.filter_type === FILTER.BY_QUARTER;
};

Filter.prototype.isFilterByQuarter = isFilterByQuarter;

var isFilterByMonth = function(){
  return this.filter_type === FILTER.BY_MONTH;
};

Filter.prototype.isFilterByMonth = isFilterByMonth;