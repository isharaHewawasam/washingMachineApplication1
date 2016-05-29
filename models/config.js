'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getAllStates = function(callback) {
  db.getDocuments('states', function(err, result) {
    callback(err, result);
  });
};


exports.getAllZipCodes = function(callback) {
	  db.getDocuments('zip_codes', function(err, result) {
	    callback(err, result);
	  });
};

exports.getAllCities = function(callback) {
	  db.getDocuments('cities', function(err, result) {
	    callback(err, result);
	  });
	};