'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getAllStates = function(callback) {
  var opts = { q: '*:*', counts: ['State'], limit:0 };
	
  db.search('all-states', 'allStates', opts, function(err, result) {	
	var all_states = {'states': []};
		
	for(var state in result.counts.State) {	  	
	 all_states.states.push({'name': state});
	}	
	
    callback(err, all_states);
  });
};

exports.getAllCities = function(callback) {
  db.getDocuments('cities', function(err, result) {
    callback(err, result);
  });
};

exports.getAllZipCodes = function(callback) {
  db.getDocuments('zip_codes', function(err, result) {
    callback(err, result);
  });
};

