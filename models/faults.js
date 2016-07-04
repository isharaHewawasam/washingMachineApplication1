'use strict';
var db = require('../database/dbWashDataFailedWashes');
var COLLECTION_NAME = 'stores';

exports.getCommonFaults = function(callback) {
  var opts = { q: '*:*', limit:1 };  
  
  db.view('Faults', 'MostCommonFaults', opts, function(err, result) {
    if(err) {
    	callback(err, null)
    } else {  
      callback(err, result);
    }
  });
};

//exports.getCommonFaults = function(callback) {
//	  callback(null, require("./commonfaultsdummy").commonFaults);  
//};

