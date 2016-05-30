'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getAllStates = function(callback) {
  var opts = { q: '*:*', counts: ['State'], limit:0 };  
  
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

exports.getAllCitiesByState = function(state_name, callback) {	
	var opts = { q: 'State:' + state_name, counts: ['City'], limit:0 };  
	  
	db.search('all-states', 'allStates', opts, function(err, result) {
		if(err) {
	    	callback(err, null)
	    } else {  
		  var all_cities = {'cities': []};
			
		  for(var city in result.counts.City) {	  	
		    all_cities.cities.push({'name': city});
		  }	
		
	      callback(err, all_cities);
	    }
	});	  
};

exports.getAllZipCodesByCity = function(callback) {
  db.getDocuments('zip_codes', function(err, result) {
    callback(err, result);
  });
};

exports.getAllMakes = function(callback) {
  var opts = { q: '*:*', counts: ['Makes'], limit:0 };
  
  db.search('Makes', 'allMakes', opts, function(err, result) {	
	if(err) {
		callback(err, null);
	} else {
      var all_makes = {'makes': []};
	
	  for(var make in result.counts.Makes) {	  	
	    all_makes.makes.push({'name': make});
	  }	
		
	   callback(err, all_makes);
    } 
  });
};

exports.getAllModelsByMake = function(make_name, callback) {
	  var opts = { q: 'Makes:' + make_name, counts: ['Models'], limit:0 };
	  
	  db.search('Makes', 'allMakes', opts, function(err, result) {	
		if(err) {
			callback(err, null);
		} else {
	      var all_models = {'models': []};
		
		  for(var model in result.counts.Models) {	  	
			  all_models.models.push({'name': model});
		  }	
			
		   callback(err, all_models);
	    } 
	  });
	};
