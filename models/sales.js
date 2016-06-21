'use strict';

exports.getCharts = function(callback){
  callback(null, require("./sales_charts").charts);
};

exports.getChartDataById = function(chart_id, callback) {
  var chardIds = require("./sales_charts").chartIds;
  
  switch(chart_id) {
    case chardIds.connectedVsSold:
      callback(null, "connectec vs sold"); return;
    case chardIds.top3SellingModels:
      callback(null, "top3SellingModels"); return;  
    default:
      callback("Invaoid chart id", null); return;
  }
  
};
  
    
  