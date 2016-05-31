"use strict"

var express = require('express');
var config = require('../models/config.js');
var helper = require('./helpers/utility.js');

module.exports.getAllStates = function(req, res, next) {
	config.getAllStates(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

module.exports.getAllSalesYears = function(req, res, next) {
	config.getAllSalesYears(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

module.exports.getAllCitiesByStates = function(req, res, next) {	
	//console.log(req.query.state_names);
	config.getAllCitiesByState(req.query.state_names, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllZipCodesByCities = function(req, res, next) {
	
	config.getAllZipCodesByCities(req.query.cities_names, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllMakes = function(req, res, next) {
	config.getAllMakes(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllModelsByMakes = function(req, res, next) {
	config.getAllModelsByMakes(req.swagger.params.make_names.value, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};

exports.getAllSKUsByModels = function(req, res, next) {
	config.getAllSKUsByModels(req.query.model_names, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};
