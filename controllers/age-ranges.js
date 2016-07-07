"use strict"

var express = require('express');
var age_ranges = require('../models/demographics/age_ranges.js');
var helper = require('./helpers/utility.js');

module.exports.getData = function(req, res, next) {
	age_ranges.getData(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
