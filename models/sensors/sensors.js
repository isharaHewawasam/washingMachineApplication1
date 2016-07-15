'use strict';

var use_default_key;;

exports.getSensors = function(callback) {
  callback(null, require("./sensor_names").sensors);  
};
    
exports.getSensorsAvgUsage = function(sensor_name, payload, callback) {
  addMissingData(payload, function(err, result) {
    if(sensor_name) {
      getAvgUsageBySensor(sensor_name, payload, callback);
    } else {
      getAvgUsage(payload, callback);
    }
  });
};

function getAvgUsageBySensor(sensor_name, payload, callback) {
  use_default_key = false;
  
  if(sensor_name) {
    var averages = [];    
    var avg_keys = require("./sensor_names").avgKeys;
    
    switch(sensor_name) {
      case avg_keys.water: //Water
        getAvgWaterUsage(payload, averages, callback, false); return;
      case avg_keys.power: //Power
        getAvgPowerUsage(payload, averages, callback, false); return;
      case avg_keys.washCyclesDuration: //Wash Cycles Duration
        getAvgWashCycleDuration(payload, averages, callback, false); return;
      case avg_keys.washCycles: //Wash Cycles
        getAvgWashCycles(payload, averages, callback, false); return; 
      case avg_keys.temperature: //Temperature
        getAvgTemperatureUsage(payload, averages, callback, false); return;
      case avg_keys.detergent: //Detergent
        getAvgDetergentUsage(payload, averages, callback, false); return;   
      case avg_keys.humidity: //Humidity
        getAvgHumidityUsage(payload, averages, callback, false); return; 
      case avg_keys.load: //Load
        getAvgLoadUsage(payload, averages, callback, false); return;        
      default:
        callback("Invalid sensor attribute", null); return;
    }
  }    
}

function getAvgUsage(payload, callback) {  
  use_default_key = true;
  var averages = [];
  
  getAvgWaterUsage(payload, averages, callback, true);
}

function getStatsKeyName() {
  return use_default_key ? null : "avgUsage";
}

function getAvgWaterUsage(payload, averages, callback, call_next_function) {
  require("./water").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgPowerUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgPowerUsage(payload, averages, callback, call_next_function) {
  require("./power").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgTemperatureUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgTemperatureUsage(payload, averages, callback, call_next_function) {
  require("./temperature").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycleDuration(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycleDuration(payload, averages, callback, call_next_function) {
  require("./wash_cycle_duration").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycles(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycles(payload, averages, callback, call_next_function) {
  require("./wash_cycles").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgDetergentUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgDetergentUsage(payload, averages, callback, call_next_function) {
  require("./detergent").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {    
      getAvgHumidityUsage(payload, averages, callback, call_next_function);   
    }
  });
}

function getAvgHumidityUsage(payload, averages, callback, call_next_function) {
  require("./humidity").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {      
    if(err || !call_next_function) {
      callback(err, result);
    } else {    
     getAvgLoadUsage(payload, averages, callback, call_next_function);  
    }  
  });
}

function getAvgLoadUsage(payload, averages, callback, call_next_function) {
  require("./load").getAverageUsage(payload, averages, getStatsKeyName(), function(err, result) {      
    callback(err, result);  
  });
}

function addMissingData(payload, callback) {
  var FilterClass = require("../filters"); 
  var filter = new FilterClass(payload, 1)
   
  if ( filter.isFilterByNone() || filter.isFilterCategoryByRegion() || filter.isFilterByModel())  callback(null, payload);
  
  //callback(null, payload)
  
  if (filter.isFilterByMake()) {
    var Config = require("../config");
    var makes = [];
    
    makes.push(payload.productAttrs.makes[0].value);
    Config.getAllModelsByMakes(makes, function(err, result) {
      //console.log("Result : " + JSON.stringify(result));
      if (result) {
        //console.log(JSON.stringify(result));
        for (var each_make in result) {
          //console.log("Make : " + JSON.stringify(result[each_make]));
          for (var each_model in result[each_make]) {
            var model = {"value": result[each_make][each_model]["model"]};
            //console.log(JSON.stringify(city));
            payload.productAttrs.models.push( model );
          }
        }
        callback(err, result);
      }
    });
  }
  
  /*if (filter.isFilterByCity()) {
    var Config = require("../config");
    var states_names = [];
    
    states_names.push(payload.region.cities[0].value);
    Config.getAllZipCodesByCities(states_names, function(err, result) {
      //console.log("Result : " + JSON.stringify(result));
      if (result) {
        //console.log(JSON.stringify(result));
        for (var each_city in result) {
          //console.log("State : " + JSON.stringify(result[each_state]));
          for (var each_zip in result[each_city]) {
            var zip = {"value": result[each_city][each_zip]["zip_code"]};
            //console.log(JSON.stringify(city));
            payload.region.zip_codes.push( zip );
          }
        }
        callback(err, result);
      }
    });
  }*/
}
