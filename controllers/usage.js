"use strict"

var express = require('express');
var usage = require('../models/usage.js');
var helper = require('./helpers/utility.js');

module.exports.getUsage = function(req, res, next) {
	usage.getUsage(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
