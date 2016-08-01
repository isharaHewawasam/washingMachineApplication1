"use strict"

var express = require('express');
var disconnected = require('../models/insights/disconnected.js');
var helper = require('./helpers/utility.js');

module.exports.getDisconnectedData = function(req, res, next) {
	disconnected.getData(req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	    
	});
};
