"use strict"

var express = require('express');
var usage = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getUsageByFilter = function(req, res, next) {
	usage.getUsageByFilter(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getAllUsage = function(req, res, next) {  
	usage.getAllUsage(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};