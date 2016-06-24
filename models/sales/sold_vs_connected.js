'use strict';

//for map
exports.getGroupedData = function getUngroupedData(payload, callback) {
  callback(null, require("../../database/dummy_data/map").data);
  /*require("./sales_map").getData(payload, function(err, sales_result) {
    callback(err, sales_result);
    /*if (sales_result) {
      require("./connected_map").getData(payload, function(err, connected_result) {    
        callback(err, response);
      });
    } else {
      callback(err, sales_result);
    } */   
  //});
  
};

//for pie chart
exports.getUngroupedData = function getUngroupedData(payload, callback) {
  require("./sales_pie").getData(payload, function(err, sales_result) {
    if (sales_result) {
      require("./connected_pie").getData(payload, function(err, connected_result) {
        var response = {};
    
        response.description = "Sold vs Connected";
        response.soldCount = sales_result.rows[0].value;
        response.connectedCount = connected_result.rows[0].value;
    
        callback(err, response);
      });
    } else {
      callback(err, sales_result);
    }    
  });
};