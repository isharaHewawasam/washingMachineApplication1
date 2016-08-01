"use strict"

var express = require('express');
var income_ranges = require('../models/demographics/income_ranges.js');
var helper = require('./helpers/utility.js');

module.exports.getDemographicIncomeRangesData = function(req, res, next) {
	income_ranges.getData(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
