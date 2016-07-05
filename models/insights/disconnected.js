'use strict';

exports.getData = function(payload, callback) {
  //require("../sales/sold_vs_connected").getData(payload, false, callback)
  
  require("../sales/sold_vs_connected").getData(payload, false, function(err, result) {
    var response = [];
    
    
    for (var each_item in result) {
      var response_item = {};
      
      response_item.state = result[each_item].state;
      response_item.unitsDisconnected = result[each_item].unitsSold - result[each_item].unitsConnected;
      
      response.push(response_item);
    }
    callback(err, response);
  });
};



