"use strict"

var express = require('express');
var insights = require('../models/insights');
var helper = require('./helpers/utility.js');


//get most fault models  details
module.exports.getMostFaultModels = function(req, res, next) { 
	insights.getMostFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getLeastFaultModels = function(req, res, next) { 
	insights.getLeastFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};