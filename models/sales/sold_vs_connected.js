'use strict';
 var db = require('../../database/db');
 var geo_location = require("../../models/region_lat_long");

 //for map
exports.getData = function(payload, drill_down, callback) {
   removeUnwantedKeys(payload);
   var temp = [];
   var response = {};

   if(JSON.stringify(payload) === '{}'){
    require("./sales_map").getData(payload, drill_down, function(err, sales_result) {
      if (sales_result) {
        require("./connected_map").getData(payload, drill_down, temp, function(err, connected_buffer) { 
          mix_res(sales_result, connected_buffer);
          setRegionLocations(sales_result, function() {
            callback(err, sales_result);
          });
        });
      } else {
        callback(err, sales_result);
      }    
    });
   }

   else{
    if(payload.productAttrs.makes[0]!==undefined&&payload.region.states[0]!==undefined&&payload.productAttrs.models[0]==undefined&&
      payload.productAttrs.skus[0]==undefined&&payload.timescale.years[0]==undefined&&payload.timescale.quarters[0]==undefined&&
      payload.timescale.months[0]==undefined&&payload.region.cities[0]==undefined&&payload.region.zip_codes[0]==undefined&&
      payload.income[0]==undefined&&payload.age[0]==undefined&&payload.family_members_count[0]==undefined){
      require("./make_state_filter").getData(payload, drill_down, function(err, sales_result){
        callback(err,sales_result);
      });
    }

    else if(payload.productAttrs.makes[0]==undefined&&payload.region.states[0]!==undefined&&payload.productAttrs.models[0]==undefined&&
      payload.productAttrs.skus[0]==undefined&&payload.timescale.years[0]==undefined&&payload.timescale.quarters[0]==undefined&&
      payload.timescale.months[0]==undefined&&payload.region.cities[0]==undefined&&payload.region.zip_codes[0]==undefined&&
      payload.income[0]==undefined&&payload.age[0]==undefined&&payload.family_members_count[0]==undefined){
      require("./make_state_filter").getDataforstate(payload, drill_down, function(err, sales_result){
        callback(err,sales_result);
      });
    }

    else{
      require("./sales_map").getData(payload, drill_down, function(err, sales_result) {
      if (sales_result) {
        require("./connected_map").getData(payload, drill_down, temp, function(err, connected_buffer) { 
          mix_res(sales_result, connected_buffer);
          setRegionLocations(sales_result, function() {
            callback(err, sales_result);
          });
        });
      } else {
        callback(err, sales_result);
      }    
    });
    }
   }
};
  
function removeUnwantedKeys(payload) {
  var result = payload;
  
  try {
    result.timescale.years = [];
    result.timescale.quarters = [];
    result.timescale.months = [];
  }
  catch(ex) {
    console.log("Exception in sales_map::removeUnwantedKeys");
    console.log(ex);
  }    
    
  return result;
}  



function mix_res(sales_result, connected_buffer) {
  var found = false;
  for (var each_sales_item in sales_result) {
    found = false;
    for (var each_conn_item in connected_buffer) {
      if ( are_same(sales_result[each_sales_item], connected_buffer[each_conn_item]) ) {
        //console.log("same");
        sales_result[each_sales_item].unitsConnected  = connected_buffer[each_sales_item].unitsConnected;
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



