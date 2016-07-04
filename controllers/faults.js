"use strict"

var express = require('express');
var faults = require('../models/faults');
var helper = require('./helpers/utility.js');


//get most fault models  details
module.exports.getCommonFaults = function(req, res, next) { 
	faults.getCommonFaults(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};