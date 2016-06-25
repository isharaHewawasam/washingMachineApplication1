'use strict';

var REPORT_TYPE = {
  "NONE": 0,
  "SENSOR": 1,
  "TOP_3_SELLING_MODELS": 2,
  "SALES": 3
};

var key = {};

exports.setReportType2Sensor = function() {
  setKeys(REPORT_TYPE.SENSOR);
};

exports.setReportType2TopModels = function() {
  setKeys(REPORT_TYPE.TOP_3_SELLING_MODELS);
};

exports.setReportType2Sales = function() {
  setKeys(REPORT_TYPE.SALES);
};

function setKeys(report_type) {
  switch (report_type) {
    case REPORT_TYPE.SENSOR:
      key.MAKE = 0; key.MODEL = 1; 
      key.STATE = 2; key.CITY = 3; key.ZIP_CODE = 4;
      key.YEAR = 5; key.QUARTER = 6; key.MONTH = 7;
      key.YEAR_2 = 2; key.QUARTER_2 = 3; key.MONTH_2 = 4
      break;
    case REPORT_TYPE.TOP_3_SELLING_MODELS:
    case REPORT_TYPE.SALES:
      key.MAKE = 0; key.MODEL = 1;
      key.YEAR = 2; key.QUARTER = 3; key.MONTH = 4;
      key.YEAR_2 = 2; key.QUARTER_2 = 3; key.MONTH_2 = 4  
      key.STATE = 5; key.CITY = 6; key.ZIP_CODE = 7;
      break;
    default:
      console.log("Invalid report key");
      break;
  }
}

exports.key = key;