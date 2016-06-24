'use strict';
exports.getCharts = function(callback){
  callback(null, require("./charts").charts);
};

exports.getReportData = function(report_name, group, payload, callback) {
  var reportName = require("./charts").reportNames;
  
  switch(report_name) {
    case reportName.soldVsConnected:
      //to be shown on map
      if (group) {
        require("./sold_vs_connected").getGroupedData(payload, callback); return;
      //to be shown as pie chart  
      } else {
        require("./sold_vs_connected").getUngroupedData(payload, callback); return;
      }
    case reportName.top3SellingModels:
      require("./top_selling_models").getData(payload, callback); return;
    case reportName.salesVolume:
      require("./sales_volume").getData(payload, callback); return;    
    default:
      callback("Invaoid chart id", null); return;
  }  
};