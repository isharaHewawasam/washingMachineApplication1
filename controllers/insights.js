"use strict"

var express = require('express');
var insights = require('../models/insights');
var helper = require('./helpers/utility.js');
var config = require('../models/insights.js');

//get most fault models  
module.exports.getMostFaultModels = function(req, res, next) { 
	config.getMostFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
//get least fault models 
module.exports.getLeastFaultModels = function(req, res, next) { 
	config.getLeastFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//most fault

module.exports.getmostFault = function(req, res, next) {
	config.getmostFault(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};


//Under that comment app apis are dummy apis
//twitter notifications

module.exports.getTwitternotificationsentiments = function(req, res, next) { 
	insights.getTwitternotificationsentiments(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//twitter notifications spike
module.exports.getTwitternotificationspike = function(req, res, next) { 
	insights.getTwitternotificationspike(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//spike in number of specific error
module.exports.getTwitternotificationspikeerrors = function(req, res, next) { 
	insights.getTwitternotificationspikeerrors(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
