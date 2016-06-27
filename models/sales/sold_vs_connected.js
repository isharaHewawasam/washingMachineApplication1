'use strict';
 var geo_location = require("../../models/region_lat_long");

 //for map
exports.getData = function getUngroupedData(payload, callback) {
  
  require("./sales_map").getData(payload, function(err, sales_result) {
    //console.log(JSON.stringify(sales_result));
    if (sales_result) {
      require("./connected_map").getData(payload, sales_result, function(err, connected_buffer) {
        var response = {};
        
        setRegionLocations(connected_buffer, function() {
          callback(err, connected_buffer);
        });
      });
    } else {
      callback(err, sales_result);
    }    
  });
  
};

/*require("./models/region_lat_long").getStateLocation("Washington", function(loc) {
    console.log("Washington " + JSON.stringify(loc));
  });
  
  require("./models/region_lat_long").getCityLocation("Florida", "Miami", function(loc) {
    console.log("Miami " + JSON.stringify(loc));
  });*/

/*
function setRegionLocations(response, callback) {
  for (var each_item in response) {
    geo_location.getStateLocation(response[each_item].state, function(loc) {
      console.log("found");
      response.latitude = loc.latitude;
      response.longitude = loc.longitude;
      callback();
    });
  }
}
*/

function setRegionLocations(response, callback) {
  geo_location.getAll(function(){
    for (var each_item in response) {
      //state
      if (filterType(response[each_item]) == 1) {
        geo_location.getStateLocation(response[each_item].state, function(err, loc) {
          if (!err) {
            //console.log("State : " + response[each_item].state + " " + loc);
            response[each_item].latitude = loc.latitude;
            response[each_item].longitude = loc.longitude;
          }
        });
      }  
      
      //city
      if (filterType(response[each_item]) == 2){
        geo_location.getCityLocation(response[each_item].state, response[each_item].city, function(err, loc) {
          if (!err) {
            //console.log("City : " + response[each_item].city + " " + loc);
            response[each_item].latitude = loc.latitude;
            response[each_item].longitude = loc.longitude;
          }
        });
      }
      
      //zip code
      if (filterType(response[each_item]) == 3){
        geo_location.getZipcodeLocation(response[each_item].state, response[each_item].city, response[each_item].zip_code, function(err, loc) {
          if (!err) {
            //console.log("Zipe ode : " + response[each_item].city + " " + JSON.stringify(loc));
            response[each_item].latitude = loc.latitude;
            response[each_item].longitude = loc.longitude;
          }
        });
      }
    }
    callback();
  });
}

function filterType(response) {
  var filter = 0;
  
  if (response.state !== undefined) filter  = 1;
  if (response.city !== undefined) filter  = 2;
  if (response.zip_code !== undefined) filter = 3;
  
  return filter;
}

//for pie chart
exports.getUngroupedData = function getUngroupedData(payload, callback) {
  require("./sales_pie").getData(payload, function(err, sales_result) {
    if (sales_result) {
      require("./connected_pie").getData(payload, function(err, connected_result) {
        var response = {};
        
        response.description = "Sold vs Connected";
        response.unitsSold = parseInt(getSum(sales_result, "unitsSold"));
        response.unitsConnected = parseInt(getSum(connected_result, "unitsConnected"));
    
        callback(err, response);
      });
    } else {
      callback(err, sales_result);
    }    
  });
};



function getSum(result, key) {
  var sum = 0;
  
  for (var each_row in result) {
    console.log(result[each_row][key]);
    sum = sum + result[each_row][key];
  }
  //console.log("sum = " + sum);
  
  return sum;
}