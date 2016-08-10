'use strict'
var express = require('express');
var vibrations = require("../models/vibrations.js");
var helper = require('./helpers/utility.js');

module.exports.getAvgUsage = function(req, res, next) { 
  vibrations.getAvgUsage(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};