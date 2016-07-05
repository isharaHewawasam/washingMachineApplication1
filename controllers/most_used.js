"use strict"

var express = require('express');
var most_used = require('../models/insights/most_used.js');
var helper = require('./helpers/utility.js');

module.exports.getData = function(req, res, next) {
	most_used.getData(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
