"use strict"

var express = require('express');
var membersCountRanges = require('../models/demographics/members_count_ranges.js');
var helper = require('./helpers/utility.js');

module.exports.getMembersCount = function(req, res, next) {
	membersCountRanges.getData(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
