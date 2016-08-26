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
  require('../middle_ware/sanitize_request').removeRelativeFilters(req);
  
  var sensor_name = req.swagger.params.sensor_name === undefined ? null : req.swagger.params.sensor_name.value;  
	var group_by_timescale = req.swagger.params.group_by_timescale === undefined ? false : req.swagger.params.group_by_timescale.value;
  
  sensors.getSensorsAvgUsage(sensor_name, group_by_timescale, req.body, function(err, result){  
  		for(var i=0;i<result.length;i++){
  			for(var j=0;j<result[i].avgUsage.length;j++){
  				if(result[i].avgUsage[j]>0){
  					result[i].avgUsage[j]=Math.round(result[i].avgUsage[j] * 100) / 100;
  				}
  			}
  		}	  
	    helper.sendResponse(res, err, result);
	});
};


