"use strict"

var express = require('express');
var sensors = require('../models/sensors/sensors');
var helper = require('./helpers/utility.js');

module.exports.getSensorsByFilter = function(req, res, next) {
	sensors.getSensorsByFilter(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
