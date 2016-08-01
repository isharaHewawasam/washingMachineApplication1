"use strict"

var express = require('express');
var usage = require('../models/usage.js');
var helper = require('./helpers/utility.js');

// For the wega API connect , it should not have same operationID. 

// get the usage data with GET method. 
module.exports.getAllUsage = function(req, res, next) {  
  usage.getAllUsage(req.body, function(err, result){  	  
	  helper.sendResponse(res, err, result); 
	  //console.log(req);
	});
};

// get the usage data with POST method. 
module.exports.postAllUsage = function(req, res, next) {  
  usage.getAllUsage(req.body, function(err, result){  	  
	  helper.sendResponse(res, err, result); 
	  //console.log(req);
	});
};