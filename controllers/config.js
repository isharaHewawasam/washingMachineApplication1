"use strict"

var express = require('express');
var config = require('../models/config.js');
var helper = require('./helpers/utility.js');

module.exports.getAllStates = function(req, res, next) {
	config.getAllStates(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

module.exports.getAllCitiesByState = function(req, res, next) {	
	config.getAllCitiesByState(req.swagger.params.state_name.value, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllZipCodesByCity = function(req, res, next) {
	config.getAllZipCodesByCity(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllMakes = function(req, res, next) {
	config.getAllMakes(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllModelsByMake = function(req, res, next) {
	config.getAllModelsByMake(req.swagger.params.make_name.value, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllSKUsByMakeAndModel = function(req, res, next) {
	config.getAllZipCodesByCity(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};
