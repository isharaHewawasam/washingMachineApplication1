"use strict"

var express = require('express');
var usage = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getAllUsage = function(req, res, next) {  
  usage.getAllUsage(req.body, function(err, result){  	  
	  helper.sendResponse(res, err, result); 
	  //console.log(req);
	});
};

// Added duplicate method to fix Swagger validation issue with duplicate method names
module.exports.postAllUsage = function(req, res, next) {  
  usage.getAllUsage(req.body, function(err, result){  	  
	  helper.sendResponse(res, err, result); 
	  //console.log(req);
	});
};