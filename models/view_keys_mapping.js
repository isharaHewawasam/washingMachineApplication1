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
  this.REPORT_TYPE.MOST_USED_WM = 8;
  this.key = {};
};

module.exports = ViewKeysMappings;

ViewKeysMappings.prototype.setKeys = function(report_type) {
  switch (report_type) {
    case this.REPORT_TYPE.SENSOR:
      this.key.MAKE = 0; this.key.MODEL = 1; 
      this.key.STATE = 2; this.key.CITY = 3; this.key.ZIP_CODE = 4;
      this.key.YEAR = 5; this.key.QUARTER = 6; this.key.MONTH = 7;
      break;
    case this.REPORT_TYPE.SENSOR_BY_YEAR:
      this.key.MAKE = 0; this.key.MODEL = 1; 
      this.key.YEAR = 2; this.key.QUARTER = 3; this.key.MONTH = 4;
      break;  
    case this.REPORT_TYPE.TOP_3_SELLING_MODELS:
    case this.REPORT_TYPE.SALES:
      this.key.MAKE = 0; this.key.MODEL = 1;
      this.key.YEAR = 2; this.key.QUARTER = 3; this.key.MONTH = 4;
      this.key.YEAR_2 = 2; this.key.QUARTER_2 = 3; this.key.MONTH_2 = 4;  
      this.key.STATE = 5; this.key.CITY = 6; this.key.ZIP_CODE = 7;
      break;
    case this.REPORT_TYPE.CONNECTED:
      this.key.MAKE = 0; this.key.MODEL = 1;
      this.key.YEAR = 2; this.key.QUARTER = 3; this.key.MONTH = 4;
      this.key.STATE = 5; this.key.CITY = 6; this.key.ZIP_CODE = 7;
      break;  
    case this.REPORT_TYPE.SALES_BY_REGION_AND_PRODUCT:
    case this.REPORT_TYPE.CONNECTED_BY_REGION_AND_PRODUCT:
      this.key.STATE = 0; this.key.CITY = 1; this.key.ZIP_CODE = 2;
      this.key.MAKE = 3; this.key.MODEL = 4;
      this.key.YEAR = 5; this.key.QUARTER = 6; this.key.MONTH = 7;
      break;
    // consider this.key.QUARTER  as DAY for this view
    case this.REPORT_TYPE.MOST_USED_WM:
      this.key.YEAR = 0; this.key.MONTH = 1; this.key.QUARTER = 2; 
      this.key.MAKE = 3; this.key.MODEL = 4;
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

var setReportType2TopModels = function() {
  this.setKeys(this.REPORT_TYPE.TOP_3_SELLING_MODELS);
};

ViewKeysMappings.prototype.setReportType2TopModels = setReportType2TopModels;

var setReportType2Sales = function() {
  this.setKeys(this.REPORT_TYPE.SALES);
};

ViewKeysMappings.prototype.setReportType2Sales = setReportType2Sales;

ViewKeysMappings.prototype.setReportType2Connected = function() {
  this.setKeys(this.REPORT_TYPE.CONNECTED);
};

var dumpReportType = function() {
  console.log("Report Type of key maps : " + report_type2);
};

ViewKeysMappings.prototype.dumpReportType = dumpReportType;
//ViewKeysMappings.prototype.setKeys = setKeys;