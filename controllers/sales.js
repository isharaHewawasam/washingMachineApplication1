"use strict"

var express = require('express');
var sales = require('../models/sales/sales.js');
var helper = require('./helpers/utility.js');

module.exports.getCharts = function(req, res, next) {
	sales.getCharts(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getReportData = function(req, res, next) {
  var report_name = req.swagger.params.report_name === undefined ? null : req.swagger.params.report_name.value;
  var group = req.swagger.params.group === undefined ? true : req.swagger.params.group.value;  
  
	sales.getReportData(report_name, group, req.body, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
