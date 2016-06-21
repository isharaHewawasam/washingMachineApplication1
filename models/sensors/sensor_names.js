'use strict';
var API_URL = "/api/v1/sensors/data/";

var avgKeys = {
    "water": "avg-water-usage",
    "power": "avg-power-usage",
    "washCyclesDuration": "avg-wash-cycle-duration",
    "washCycles": "avg-wash-cycles",
    "temperature": "avg-temperature",
    "detergent": "avg-detergent-usage"
};

module.exports.avgKeys = avgKeys;

var defaults = {
  "timescale": 
    {
      "relative":
        {
          "unit": "month",
          "value": 1
        }        
    }
};

module.exports.sensors = [
  {
    "displayName": "Average Water Usage",
    "key": avgKeys.water,
    "api": API_URL + avgKeys.water,
    "defaults": defaults
  },
  {
    "displayName": "Average Power",
    "key": avgKeys.power,
    "api": API_URL + avgKeys.power
  },
  {
    "displayName": "Average Wash Cycle Duration",
    "key": avgKeys.washCyclesDuration,
    "api": API_URL + avgKeys.washCyclesDuration,
    "defaults": defaults
  },
  {
    "displayName": "Average Wash Cycles",
    "key": avgKeys.washCycles,
    "api": API_URL + avgKeys.washCycles,
    "defaults": defaults
  },
  {
    "displayName": "Average Temperature",
    "key": avgKeys.temperature,
    "api": API_URL + avgKeys.temperature,
    "defaults": defaults
  },
  {
    "displayName": "Average Detergent Used",
    "key": avgKeys.detergent,
    "api": API_URL + avgKeys.detergent,
    "defaults": defaults
  }
];

