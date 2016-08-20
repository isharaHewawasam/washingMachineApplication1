"use strict"

var express = require('express');
var sensors = require('../models/sensors/sensors');
var helper = require('./helpers/utility.js');

//get all sensors details
module.exports.getSensors = function(req, res, next) { 
  sensors.getSensors(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//get all sensors data
module.exports.getSensorsAvgUsage = function(req, res, next) { 
  sanitizeRequest(req);
  
  var sensor_name = req.swagger.params.sensor_name === undefined ? null : req.swagger.params.sensor_name.value;  
	var group_by_timescale = req.swagger.params.group_by_timescale === undefined ? false : req.swagger.params.group_by_timescale.value; ;
  
  console.log("After sanitizing " + JSON.stringify(req.body));
  sensors.getSensorsAvgUsage(sensor_name, group_by_timescale, req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result);
	});
};

function sanitizeRequest(req) {
  if (req.swagger.params.group_by_timescale === undefined ||
      req.swagger.params.group_by_timescale.value == false ) {
      console.log("Sanitize");  
      if (req.body.timescale.relative) {
        req.body.timescale.relative = {};  
      }
  }
}
