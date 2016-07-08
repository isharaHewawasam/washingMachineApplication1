"use strict"

var express = require('express');
var product_score = require('../models/insights/product_score.js');
var helper = require('./helpers/utility.js');

module.exports.getData = function(req, res, next) {
	product_score.getData(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
