'use strict';
exports.getCharts = function(callback){
  callback(null, require("./charts").charts);
};

exports.getReportData = function(report_name, group, payload, callback) {
  var reportName = require("./charts").reportNames;
  
  switch(report_name) {
    case reportName.soldVsConnected:
      if (group) {
        console.log("Grouped = true");
        require("./sold_vs_connected").getGroupedData(payload, callback); return;
      } else {
        console.log("Grouped = false");
        require("./sold_vs_connected").getUngroupedData(payload, callback); return;
      }
    case reportName.top3SellingModels:
      require("./top_selling_models").getData(payload, callback); return;  
    default:
      callback("Invaoid chart id", null); return;
  }  
};