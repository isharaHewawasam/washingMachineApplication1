"use strict"

var express = require('express');
var sales = require('../models/sales.js');
var helper = require('./helpers/utility.js');

module.exports.getCharts = function(req, res, next) {
	sales.getCharts(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

module.exports.getChartById = function(req, res, next) {
  var chart_id = req.swagger.params.chart_id === undefined ? null : req.swagger.params.chart_id.value;  
	console.log("Chart Id " + chart_id);
  
	sales.getChartDataById(chart_id, function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
