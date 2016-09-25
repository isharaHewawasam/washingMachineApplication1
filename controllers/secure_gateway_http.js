"use strict"

var express = require('express');
var secure_gateway = require('../models/secure_gateway_http.js');
var helper = require('./helpers/utility_securegateway.js');

module.exports.getApis = function(req, res, next) {
	secure_gateway.getApis(req.swagger.params,function(err, result){
	    helper.sendResponse(res, err, result); 
	  });
};