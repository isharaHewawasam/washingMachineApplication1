"use strict"

var express = require('express');
var membersCountRanges = require('../models/demographics/income_ranges.js');
var helper = require('./helpers/utility.js');

module.exports.getData = function(req, res, next) {
	membersCountRanges.getData(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
