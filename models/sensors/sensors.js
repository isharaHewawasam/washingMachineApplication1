'use strict';

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
  if(sensor_name) {
    var averages = [];    
    var avg_keys = require("./sensor_names").avgKeys;
    
    switch(sensor_name) {
      case avg_keys.water:
        getAvgWaterUsage(payload, averages, callback, false); return;
      case avg_keys.power:
        getAvgPowerUsage(payload, averages, callback, false); return;
      case avg_keys.washCyclesDuration:
        getAvgWashCycleDuration(payload, averages, callback, false); return;
      case avg_keys.washCycles:
        getAvgWashCycles(payload, averages, callback, false); return; 
      case avg_keys.temperature:
        getAvgTemperatureUsage(payload, averages, callback, false); return;
      case avg_keys.detergent:
        getAvgDetergentUsage(payload, averages, callback, false); return;   
      default:
        callback("Invalid sensor attribute", null); return;
    }
    
  }    
}

function getAvgUsage(payload, callback) {  
  var averages = [];
  
  getAvgWaterUsage(payload, averages, callback, true);
}

function getAvgWaterUsage(payload, averages, callback, call_next_function) {
  require("./water").getAverageUsage(payload, averages, function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgPowerUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgPowerUsage(payload, averages, callback, call_next_function) {
  require("./power").getAverageUsage(payload, averages, function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgTemperatureUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgTemperatureUsage(payload, averages, callback, call_next_function) {
  require("./temperature").getAverageUsage(payload, averages, function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycleDuration(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycleDuration(payload, averages, callback, call_next_function) {
  require("./wash_cycle_duration").getAverageUsage(payload, averages, function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgWashCycles(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgWashCycles(payload, averages, callback, call_next_function) {
  require("./wash_cycles").getAverageUsage(payload, averages, function(err, result) {
    if(err || !call_next_function) {
      callback(err, result);
    } else {
      getAvgDetergentUsage(payload, averages, callback, call_next_function);
    }
  });
}

function getAvgDetergentUsage(payload, averages, callback) {
  require("./detergent").getAverageUsage(payload, averages, function(err, result) {    
    callback(err, result);    
  });
}