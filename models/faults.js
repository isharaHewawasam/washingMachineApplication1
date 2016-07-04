'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getCommonFaults = function(callback) {
  var opts = { q: '*:*', limit:1 };  
  
  db.search('all-states', 'allStates', opts, function(err, result) {
    if(err) {
    	callback(err, null)
    } else {  
	  var all_states = {'states': []};
		
	  for(var state in result.counts.State) {	  	
	    all_states.states.push({'name': state});
	  }	
	
      callback(err, all_states);
    }
  });
};

//exports.getCommonFaults = function(callback) {
//	  callback(null, require("./commonfaultsdummy").commonFaults);  
//};

