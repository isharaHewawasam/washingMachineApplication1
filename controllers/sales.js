"use strict"

var express = require('express');
var usage = require('../models/sales.js');
var helper = require('./helpers/utility.js');

module.exports.getCharts = function(req, res, next) {
	usage.getCharts(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getChartById = function(req, res, next) {
	usage.getChartById(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
