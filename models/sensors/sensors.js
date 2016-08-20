'use strict';

var use_default_key;;

exports.getSensors = function(callback) {
  callback(null, require("./sensor_names").sensors);  
};
    
exports.getSensorsAvgUsage = function(sensor_name, group_by_timescale, payload, callback) {
  addMissingData(payload, group_by_timescale, function(err, result) {
    if(sensor_name) {
      getAvgUsageBySensor(sensor_name, group_by_timescale, payload, callback);
    } else {
      getAvgUsage(payload, false, callback);
    }
  });
};

function getAvgUsageBySensor(sensor_name, group_by_timescale, payload, callback) {
  use_default_key = false;
  
  if(sensor_name) {
    var averages = [];    
    var avg_keys = require("./sensor_names").avgKeys;
    
    switch(sensor_name) {
      case avg_keys.water: //Water
        getAvgWaterUsage(payload, group_by_timescale, averages, callback, false); return;
      case avg_keys.power: //Power
        getAvgPowerUsage(payload, group_by_timescale, averages, callback, false); return;
      case avg_keys.washCyclesDuration: //Wash Cycles Duration
        getAvgWashCycleDuration(payload, group_by_timescale, averages, callback, false); return;
      case avg_keys.washCycles: //Wash Cycles
        getAvgWashCycles(payload, group_by_timescale, averages, callback, false); return; 
      case avg_keys.temperature: //Temperature
        getAvgTemperatureUsage(payload, group_by_timescale, averages, callback, false); return;
      case avg_keys.detergent: //Detergent
        getAvgDetergentUsage(payload, group_by_timescale, averages, callback, false); return;   
      case avg_keys.humidity: //Humidity
        getAvgHumidityUsage(payload, group_by_timescale, averages, callback, false); return; 
      case avg_keys.load: //Load
        getAvgLoadUsage(payload, group_by_timescale, averages, callback, false); return;        
      default:
        callback("Invalid sensor attribute", null); return;
    }
  }    
}

function getAvgUsage(payload, group_by_timescale, callback) {  
  use_default_key = true;
  var averages = [];
  
  getAvgWaterUsage(payload, group_by_timescale, averages, callback, true);
}

function getStatsKeyName() {
  return use_default_key ? null : "avgUsage";
}

function getAvgWaterUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./water").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgPowerUsage(payload, group_by_timescale, averages, callback, call_next_function);
    }
  });
}

function getAvgPowerUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./power").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgTemperatureUsage(payload, group_by_timescale, averages, callback, call_next_function);
    }
  });
}

function getAvgTemperatureUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./temperature").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycleDuration(payload, group_by_timescale, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycleDuration(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./wash_cycle_duration").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycles(payload, group_by_timescale, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycles(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./wash_cycles").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgDetergentUsage(payload, group_by_timescale, averages, callback, call_next_function);
    }
  });
}

function getAvgDetergentUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./detergent").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {    
      getAvgHumidityUsage(payload, group_by_timescale, averages, callback, call_next_function);   
    }
  });
}

function getAvgHumidityUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./humidity").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {      
    if(err || !call_next_function) {
      callback(err, result);
    } else {    
     getAvgLoadUsage(payload, group_by_timescale, averages, callback, call_next_function);  
    }  
  });
}

function getAvgLoadUsage(payload, group_by_timescale, averages, callback, call_next_function) {
  require("./load").getAverageUsage(payload, group_by_timescale, averages, getStatsKeyName(), function(err, result) {      
    callback(err, result);  
  });
}

function addMissingData(payload, group_by_timescale, callback) {
  var FilterClass = require("../filters"); 
  
  if (group_by_timescale) {
    var filter = new FilterClass(payload, 16);
  } else {
    var filter = new FilterClass(payload, 1);
  }
   

  
  /*if ( filter.isFilterByNone() ||  
       filter.isFilterByModel() ||
       filter.isFilterCategoryByRegion() ||
       filter.isFilterByYear() ||
       filter.isFilterCategoryByFamily() ||
       filter.isFilterCategoryMixed_(payload)
     ) {
       callback(null, payload);
  }*/
  
  if (filter.isFilterByMake()) {
    //console.log("filter by make");
    var Config = require("../config");
    var makes = [];
    
    makes.push(payload.productAttrs.makes[0].value);
    Config.getAllModelsByMakes(makes, function(err, result) {
      if (result) {
        for (var each_make in result) {
          //console.log("Make : " + JSON.stringify(result[each_make]));
          for (var each_model in result[each_make]) {
            var model = {"value": result[each_make][each_model]["model"]};
            //console.log(JSON.stringify(city));
            payload.productAttrs.models.push( model );
          }
        }
        callback(err, result);
        return;
      }
    });
  } else {
    callback(null, payload);
  }
  
  //console.log("i m here");
  //callback(null, payload);
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
