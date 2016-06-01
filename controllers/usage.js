"use strict"

var express = require('express');
var config = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getUsage = function(req, res, next) {
	config.getUsage(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
