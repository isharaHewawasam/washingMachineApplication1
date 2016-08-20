'use strict';

var ViewKeysMappings = function() {
  this.REPORT_TYPE = {};
  this.REPORT_TYPE.NONE = 0;
  this.REPORT_TYPE.SENSOR = 1;
  this.REPORT_TYPE.TOP_3_SELLING_MODELS = 2;
  this.REPORT_TYPE.SALES = 3;
  this.REPORT_TYPE.CONNECTED = 4;
  this.REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT = 5;
  this.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT = 6;
  this.REPORT_TYPE.SENSOR_BY_YEAR = 7;
  this.REPORT_TYPE.SENSOR_BY_FAMILY = 8;
  this.REPORT_TYPE.MOST_USED_WM = 9;
  this.REPORT_TYPE.INSIGHTS = 10;
  this.REPORT_TYPE_BY_LAST_TIME_SCALE = 11;
  this.key = {};
};

module.exports = ViewKeysMappings;

ViewKeysMappings.prototype.setKeys = function(report_type) {
  switch (report_type) {
    case this.REPORT_TYPE.SENSOR:
      this.key.MAKE = 0; this.key.MODEL = 1; this.key.SKU = 2;
      this.key.STATE = 3; this.key.CITY = 4; this.key.ZIP_CODE = 5;
      this.key.YEAR = 6; this.key.QUARTER = 7; this.key.MONTH = 8;
      this.key.AGE = 9; this.key.MEMBERS = 10; this.key.INCOME = 11;
      break;
    case this.REPORT_TYPE.SENSOR_BY_YEAR:
      this.key.MAKE = 0; this.key.MODEL = 1; this.key.SKU = 2;
      this.key.YEAR = 3; this.key.QUARTER = 4; this.key.MONTH = 5;
      break;  
    case this.REPORT_TYPE.SENSOR_BY_FAMILY:
      this.key.MAKE = 0; this.key.MODEL = 1; this.SKU = 2;
      this.key.AGE = 3; this.key.MEMBERS = 4; this.key.INCOME = 5;
      break;    
    case this.REPORT_TYPE.TOP_3_SELLING_MODELS:
    case this.REPORT_TYPE.SALES:
      this.key.MAKE = 0; this.key.MODEL = 1; this.key.SKU = 2;
      this.key.YEAR = 3; this.key.QUARTER = 4; this.key.MONTH = 5;
      this.key.YEAR_2 = 3; this.key.QUARTER_2 = 4; this.key.MONTH_2 = 5;  
      this.key.STATE = 6; this.key.CITY = 7; this.key.ZIP_CODE = 8;
      this.key.AGE = 9; this.key.MEMBERS = 10; this.key.INCOME = 11;
      this.key.MFG_DATE = 12;
      break;
    case this.REPORT_TYPE.CONNECTED:
      this.key.MAKE = 0; this.key.MODEL = 1; this.key.SKU = 2;
      this.key.YEAR = 3; this.key.QUARTER = 4; this.key.MONTH = 5;
      this.key.STATE = 6; this.key.CITY = 6; this.key.ZIP_CODE = 8;
      this.key.AGE = 9; this.key.MEMBERS = 10; this.key.INCOME = 11;
      this.key.MFG_DATE = 12;
      break;  
    case this.REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT:
    case this.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT:
      this.key.STATE = 0; this.key.CITY = 1; this.key.ZIP_CODE = 2;
      this.key.MAKE = 3; this.key.MODEL = 4; this.key.SKU = 5;
      this.key.YEAR = 6; this.key.QUARTER = 7; this.key.MONTH = 8;
      this.key.AGE = 9; this.key.MEMBERS = 10; this.key.INCOME = 11;
      this.key.MFG_DATE = 12;
      break;
    // consider this.key.QUARTER  as DAY for this view
    case this.REPORT_TYPE.MOST_USED_WM:
      this.key.YEAR = 0; this.key.MONTH = 1; this.key.QUARTER = 2; 
      this.key.MAKE = 3; this.key.MODEL = 4;
      break;   
    case this.REPORT_TYPE.INSIGHTS:
      this.key.STATS_KEY_X = 0;
      this.key.MAKE = 1; this.key.MODEL = 2;
      this.key.STATE = 3; this.key.CITY = 4; this.key.ZIP_CODE = 5;
      this.key.YEAR = 6; this.key.MONTH = 7; this.key.QUARTER = 8; 
      break;  
    case this.REPORT_TYPE.REPORT_TYPE_BY_LAST_TIME_SCALE:
      this.key.STATS_KEY_X = 0;
      this.key.MAKE = 1; this.key.MODEL = 2; this.key.SKU = 3;
      this.key.STATE = 4; this.key.CITY = 5; this.key.ZIP_CODE = 6;
      this.key.YEAR = 7; this.key.MONTH = 8; this.key.QUARTER = 9;
      break;        
    default:
      console.log("Invalid report key");
      break;
  }
};

ViewKeysMappings.prototype.setReportType2MostUsedWM = function() {
  this.setKeys(this.REPORT_TYPE.MOST_USED_WM);
};

ViewKeysMappings.prototype.setReportType2SalesByRegionAndProduct = function() {
  this.setKeys(this.REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT);
};

ViewKeysMappings.prototype.setReportType2ConnectionByRegionAndProduct = function() {
  this.setKeys(this.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT);
};

ViewKeysMappings.prototype.setReportType2Sensor = function() {
  this.setKeys(this.REPORT_TYPE.SENSOR);
};

ViewKeysMappings.prototype.setReportType2SensorByYear = function() {
  this.setKeys(this.REPORT_TYPE.SENSOR_BY_YEAR);
};

ViewKeysMappings.prototype.setReportType2SensorByFamily = function() {
  this.setKeys(this.REPORT_TYPE.SENSOR_BY_FAMILY);
};

var setReportType2TopModels = function() {
  this.setKeys(this.REPORT_TYPE.TOP_3_SELLING_MODELS);
};

ViewKeysMappings.prototype.setReportType2TopModels = setReportType2TopModels;

var setReportType2Insights = function() {
  this.setKeys(this.REPORT_TYPE.INSIGHTS);
};

ViewKeysMappings.prototype.setReportType2Insights = setReportType2Insights;

var setReportType2Sales = function() {
  this.setKeys(this.REPORT_TYPE.SALES);
};

ViewKeysMappings.prototype.setReportType2Sales = setReportType2Sales;

ViewKeysMappings.prototype.setReportType2Connected = function() {
  this.setKeys(this.REPORT_TYPE.CONNECTED);
};

ViewKeysMappings.prototype.setReportType2RelativeTimescale = function() {
  this.setKeys(this.REPORT_TYPE.REPORT_TYPE_BY_LAST_TIME_SCALE);
};

var dumpReportType = function() {
  console.log("Report Type of key maps : " + report_type2);
};

ViewKeysMappings.prototype.dumpReportType = dumpReportType;
//ViewKeysMappings.prototype.setKeys = setKeys;