var express = require('express');
var config = require('../models/config.js');
var helper = require('./helpers/utility.js');

var router = express.Router();

router.get('/states', function(req, res) {
  config.getAllStates(function(err, result){  	  
    helper.sendResponse(res, err, result); 
  });
});

router.get('/states/:name/cities', function(req, res) {
	  config.getAllCities(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
	});

module.exports = router;