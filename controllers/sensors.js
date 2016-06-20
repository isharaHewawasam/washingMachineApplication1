"use strict"

var express = require('express');
var sensors = require('../models/sensors/sensors');
var helper = require('./helpers/utility.js');

//get all sensors data
module.exports.getSensorsAvgDataByFilter = function(req, res, next) { 
  var sensor_name = req.swagger.params.sensor_name === undefined ? null : req.swagger.params.sensor_name.value;  
	console.log("controller sensor name : " + sensor_name);
  sensors.getSensorsAvgDataByFilter(sensor_name, req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

