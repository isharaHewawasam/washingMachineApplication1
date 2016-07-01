'use strict';
 var geo_location = require("../../models/region_lat_long");

 //for map
exports.getData = function(payload, callback) {
  //console.log("12321");
  require("./sales_map").getData(payload, function(err, sales_result) {
    //console.log(JSON.stringify(sales_result));
    if (sales_result) {
      var temp = [];
      //console.log("12321");
      //require("./connected_map").getData(payload, sales_result, function(err, connected_buffer) {
      require("./connected_map").getData(payload, temp, function(err, connected_buffer) {  
        //console.log("12321");
        var response = {};
        
        mix_res(sales_result, connected_buffer);
        
        //console.log("Started getting locations : sales connected");
        setRegionLocations(sales_result, function() {
          //console.log("completed getting locations : sales connected");
          callback(err, sales_result);
        });
      });
    } else {
      callback(err, sales_result);
    }    
  });
  
};

function mix_res(sales_result, connected_buffer) {
  var found = false;
  
  for (var each_sales_item in sales_result) {
    found = false;
    for (var each_conn_item in connected_buffer) {
      if ( are_same(sales_result[each_sales_item], connected_buffer[each_conn_item]) ) {
        //console.log("same");
        sales_result[each_sales_item].unitsConnected  = connected_buffer[each_conn_item].unitsConnected;
      }
    }
  }
}

function are_same(item1, item2) {
  var state_match = true;
  var city_match = true;
  var zip_match = true;
  
  if ( (item1.state !== undefined) && (item2.state !== undefined) ) {
    state_match = (item1.state === item2.state);  
  }
  
  if ( (item1.city !== undefined) && (item2.city !== undefined) ) {
    city_match = (item1.city === item2.city);  
  }
  
  if ( (item1.state !== undefined) && (item2.state !== undefined) ) {
    zip_match = (item1.zip_code === item2.zip_code);  
  }
  
  return state_match && city_match && zip_match;
}
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

exports.getUngroupedData = function(payload, callback) {
  
  require("./sales_pie").getData(payload, function(err, sales_result) {
    //console.log("sales pie...");
    if (sales_result) {
      require("./connected_pie").getData(payload, function(err, connected_result) {
        //console.log("connected pie...");
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
    //console.log(result[each_row][key]);
    sum = sum + result[each_row][key];
  }
  //console.log("sum = " + sum);
  
  return sum;
}