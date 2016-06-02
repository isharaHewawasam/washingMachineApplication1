"use strict"

var express = require('express');
var sensor = require('../models/sensor.js');
var helper = require('./helpers/utility.js');

module.exports.getUsage = function(req, res, next) {
	sensor.getUsage(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getUsageByAttribute = function(req, res, next) {
	sensor.getUsage(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};