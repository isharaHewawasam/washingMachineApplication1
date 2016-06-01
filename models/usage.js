'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getUsage = function(callback) {
	  var opts = { q: '*:*', counts: ['MfgYear'], limit:0 };  
	  
	  db.search('yearsByMfgDate', 'yearsByMfgDate', opts, function(err, result) {
	    if(err) {
	    	callback(err, null)
	    } else {  
		  var all_mfg_years = {'data': [ {"make": "LG",
                                       "model": "Woo1",
                                       "totalLoads" : 10,
                                       "popularDay": "Monday",
                                       "popularTime": "12:00 - 13:00"                                     
                                      },
                                      {"make": "Whirlpool",
                                       "model": "Fuzzy - 10",
                                       "totalLoads" : 15,
                                       "popularDay": "Monday",
                                       "popularTime": "14:00 - 15:00"                                     
                                      },
                                    ]
                          };        
		  	
	      callback(err, all_mfg_years);
	    }
	  });
	};