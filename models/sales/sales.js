'use strict';
exports.getCharts = function(callback){
  callback(null, require("./charts").charts);
};

exports.getReportData = function(report_name, payload, callback) {
  var reportName = require("./charts").reportNames;
  
  switch(report_name) {
    case reportName.soldVsConnected:
      require("./sold_vs_connected").getData(payload, callback); return;
    case reportName.top3SellingModels:
      require("./top_selling_models").getData(payload, callback); return;  
    default:
      callback("Invaoid chart id", null); return;
  }  
};