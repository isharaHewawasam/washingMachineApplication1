'use strict';

var db = require('../database/region_lat_long');
var config = require('../config/config');

var lat_long = null;
//var connecting = false;

function getAll(callback) {
  db.open(config.RegionLatituesLongitudes, function(err) {
    //connecting = true;
   
    if (!err) {
      db.read_all(function(err, data) {
        //lat_long =  JSON.stringify(data);
        lat_long =  data;
        //console.log(lat_long);
         console.log("db opened");
        callback();
      });
    } else {
      console.log("Error while connecting to coordinates database");
      console.log(err);
    }      
  });
}

exports.getAll = getAll;

exports.getStateLocation = function(state_name, callback) {
  var result = null;
  var err = "not found";
  
    for (var each_state in lat_long.rows) {
      //console.log(lat_long.rows[each_state].doc.states.name);
      if (lat_long.rows[each_state].doc.states.name == state_name) {
        result = {};
        result.latitude =  lat_long.rows[each_state].doc.states.latitude;
        result.longitude = lat_long.rows[each_state].doc.states.longitude;
        //console.log("found");
        err = null;
       
        callback(null, result); 
         break;       
      }
    }
  
};


exports.getCityLocation = function(state_name, city_name, callback) {
  var result = null;
  var err = "not found";
  
    for (var each_state in lat_long.rows) {
      //console.log(lat_long.rows[each_state].doc.states.name);
      if (lat_long.rows[each_state].doc.states.name == state_name) {
        for (var each_city in lat_long.rows[each_state].doc.states.cities) {
          if (lat_long.rows[each_state].doc.states.cities[each_city].name == city_name) {
            result = {};
            result.latitude =  lat_long.rows[each_state].doc.states.cities[each_city].latitude;
            result.longitude = lat_long.rows[each_state].doc.states.cities[each_city].longitude;
            //console.log("found");
            err = null;
       
        callback(null, result); 
         break;  
          }
        }        
      }
    }
  //});
};

exports.getZipcodeLocation = function(state_name, city_name, zip_code, callback) {
  var result = null;
  var err = "not found";
  
    for (var each_state in lat_long.rows) {
      if (lat_long.rows[each_state].doc.states.name == state_name) {
        for (var each_city in lat_long.rows[each_state].doc.states.cities) {
          if (lat_long.rows[each_state].doc.states.cities[each_city].name == city_name) { 
            for (var each_zip_code in lat_long.rows[each_state].doc.states.cities[each_city].zipCodes) {
               //console.log("1 : " + lat_long.rows[each_state].doc.states.cities[each_city].zipCodes[each_zip_code].zipCode.toString().toUpperCase());
               //console.log("2 : " + zip_code.toString().toUpperCase());
              if (lat_long.rows[each_state].doc.states.cities[each_city].zipCodes[each_zip_code].zipCode.toString().toUpperCase() == zip_code.toString().toUpperCase()) {
                result = {};
                result.latitude =  lat_long.rows[each_state].doc.states.cities[each_city].zipCodes[each_zip_code].latitude;
                result.longitude = lat_long.rows[each_state].doc.states.cities[each_city].zipCodes[each_zip_code].longitude;
                //console.log("found zip code");
                err = null;
                callback(null, result); 
                break; 
              }
            }
          }
        }        
      }
    }
  //});
};