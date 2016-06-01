"use strict"

var express = require('express');
var config = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getUsageParams = function(req, res, next) {
	config.getUsageParams(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
