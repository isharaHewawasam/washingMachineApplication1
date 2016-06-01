'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getAllMfgYears = function(callback) {
	  var opts = { q: '*:*', counts: ['MfgYear'], limit:0 };  
	  
	  db.search('yearsByMfgDate', 'yearsByMfgDate', opts, function(err, result) {
	    if(err) {
	    	callback(err, null)
	    } else {  
		  var all_mfg_years = {'years': []};
			
		  for(var year in result.counts.MfgYear) {	  	
			  all_mfg_years.years.push({'year': year});
		  }	
		
	      callback(err, all_mfg_years);
	    }
	  });
	};