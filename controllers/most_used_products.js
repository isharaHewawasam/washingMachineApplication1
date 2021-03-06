"use strict"

var express = require('express');
var most_used = require('../models/insights/most_used_products.js');
var helper = require('./helpers/utility.js');

module.exports.getMostUsedProducts = function(req, res, next) {
	most_used.getData(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
