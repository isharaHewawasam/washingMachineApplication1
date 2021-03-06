'use strict';

exports.getData = function(payload, drilldown, callback) {
  var VIEW_NAME = "salesByRegionAndProduct";
  var buffer = [];
  var Filter = require("../filters");
  var KeyMap = require("../view_keys_mapping");
  //var payload = require("../../payloads/top_3_models").payload;  
  
  //filter.setReportType2SalesByRegionAndProduct();
  var key_map = new KeyMap();
  key_map.setReportType2SalesByRegionAndProduct();
  
   addMissingData(payload, function(err, result) {
  var params = { 
                 "description": "Sold Washing Machines by Region",
                 "payload": payload,
                 "buffer": buffer,
                 "view": {
                           "designDocName": "sales",
                           "default": VIEW_NAME,
                           "byYear": VIEW_NAME,
                           "byFamily": VIEW_NAME,
                         },
                  "statsKeyName": "unitsSold",
                  "databaseType": "sales",
                  "filter": drilldown ? new Filter(payload, 7) : new Filter(payload, 10),
                  "key_maps": key_map,
                  "xxx_007": true
               };
               
               
   //"xxx_007": true
              // };
    
    require('../sensors/avg_calculator').getSum(params, function(err, result) {
      callback(err, result);    
    });      
  });
};

function addMissingData(payload, callback) {
  var FilterClass = require("../filters"); 
  var filter = new FilterClass(payload, 7);
   
  if (filter.isFilterByState()) {
    var Config = require("../config");
    var states_names = [];
    
    states_names.push(payload.region.states[0].value);
    Config.getAllCitiesByState(states_names, function(err, result) {
      //console.log("Result : " + JSON.stringify(result));
      if (result) {
        //console.log(JSON.stringify(result));
        for (var each_state in result) {
          for (var each_city in result[each_state]) {
            var city = {"value": result[each_state][each_city]["city"]};
            //console.log(JSON.stringify(city));
            payload.region.cities.push( city );
          }
        }
        callback(err, result);
      }
    });
  }
  
  if (filter.isFilterByCity()) {
    var Config = require("../config");
    var states_names = [];
    
    states_names.push(payload.region.cities[0].value);
    Config.getAllZipCodesByCities(states_names, function(err, result) {
//      console.log("Result : " + JSON.stringify(result));
      if (result) {
        //console.log(JSON.stringify(result));
        for (var each_city in result) {
          //console.log("State : " + JSON.stringify(result[each_city]));
          for (var each_zip in result[each_city]) {
            var zip = {"value": result[each_city][each_zip]["zip_code"]};
            //console.log(JSON.stringify(zip));
            payload.region.zip_codes.push( zip );
          }
        }
        callback(err, result);
      }
    });
  }
  
  callback(null, payload);
}
