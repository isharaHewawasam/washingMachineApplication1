'use strict';

var use_default_key;;

exports.getSensors = function(callback) {
  callback(null, require("./sensor_names").sensors);  
};
    
exports.getSensorsAvgUsage = function(sensor_name, payload, callback) {
  if(sensor_name) {
    getAvgUsageBySensor(sensor_name, payload, callback);
  } else {
    getAvgUsage(payload, callback);
  }
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