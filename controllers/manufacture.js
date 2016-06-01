"use strict"

var express = require('express');
var manufacture = require('../models/manufacture.js');
var helper = require('./helpers/utility.js');

module.exports.getAllMfgYears = function(req, res, next) {	
	manufacture.getAllMfgYears(function(err, result){  	  
    helper.sendResponse(res, err, result); 
  });
};