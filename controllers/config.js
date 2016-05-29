"use strict"

var express = require('express');
var config = require('../models/config.js');
var helper = require('./helpers/utility.js');

module.exports.getAllStates = function(req, res, next) {
	config.getAllStates(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

module.exports.getAllCities = function(req, res, next) {	
	config.getAllCities(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllZipCodes = function(req, res, next) {
	config.getAllZipCodes(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};