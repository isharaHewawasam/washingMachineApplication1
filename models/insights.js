'use strict';

exports.getMostFaultModels = function(callback) {
  callback(null, require("./insights_dummy").mostFaults);  
};

exports.getLeastFaultModels = function(callback) {
	  callback(null, require("./insights_dummy").leastFaults);  
	};