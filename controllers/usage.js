"use strict"

var express = require('express');
var usage = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getAllUsage = function(req, res, next) {  
  usage.getAllUsage(req.body, function(err, result){  	  
	  helper.sendResponse(res, err, result); 
	});
};
//get most used models  details
module.exports.getmostUsedModels = function(req, res, next) { 
	usage.getmostUsedModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};