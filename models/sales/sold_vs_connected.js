'use strict';

exports.getData = function(payload, callback) {
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