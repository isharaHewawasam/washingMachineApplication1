"use strict"

var express = require('express');
var insights = require('../models/insights');
var helper = require('./helpers/utility.js');
var config = require('../models/insights.js');

//Login Authentication
module.exports.getAuthentication = function(req, res, next) { 
	insights.getAuthentication(function(err, result){  
		var username=req.body.username;
		var password=req.body.password;
	

		if(username=="mkt_manager@bluemix.com"||username=="eng_manager@bluemix.com"){
			if(password=="test123"){
				if(username=="mkt_manager@bluemix.com"){
					var array={"name":"John Smith","username":username,"role":"mkt_manager","rolename":"Marketing Manager","response":"Success"}
					helper.sendResponse(res, err, array);
				}
				else if(username=="eng_manager@bluemix.com"){
					var array={"name":"John Smith","username":username,"role":"eng_manager","rolename":"Engineer Manager","response":"Success"}
					helper.sendResponse(res, err, array);
				}
				
			}
			else{
				helper.sendResponse(res, err, "Unsuccess");
			}
		}
	     
	});
};

//get most fault models  
module.exports.getMostFaultModels = function(req, res, next) { 
	config.getMostFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};
//get least fault models 
module.exports.getLeastFaultModels = function(req, res, next) { 
	config.getLeastFaultModels(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//most fault

module.exports.getmostFault = function(req, res, next) {
	config.getmostFault(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	  });
};


//Under that comment app apis are dummy apis
//twitter notifications

module.exports.getTwitternotificationsentiments = function(req, res, next) { 
	insights.getTwitternotificationsentiments(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//twitter notifications spike
module.exports.getTwitternotificationspike = function(req, res, next) { 
	insights.getTwitternotificationspike(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//spike in number of specific error
module.exports.getTwitternotificationspikeerrors = function(req, res, next) { 
	insights.getTwitternotificationspikeerrors(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//spike in number of specific error by make
module.exports.getTwitternotificationspikeerrorsbymake = function(req, res, next) { 
	insights.getTwitternotificationspikeerrorsbymake(function(err, result){  	  
	    helper.sendResponse(res, err, result); 
	});
};

//Twitter Inner page apis 

//Twitter insights table api
module.exports.getTwitterinsightstable = function(req, res, next) { 
	insights.getTwitterinsightstable(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

/*
// Tweets graph api
module.exports.getTweets = function(req, res, next) { 
	insights.getTweets(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

//Tweets impressions graph api
module.exports.getTweetsimpressions = function(req, res, next) { 
	insights.getTweetsimpressions(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

//Profile visits graph api
module.exports.getProfilevisits = function(req, res, next) { 
	insights.getProfilevisits(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

//Mentions graph api
module.exports.getMentions = function(req, res, next) { 
	insights.getMentions(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

//Twitter graph api
module.exports.getTwitter = function(req, res, next) { 
	insights.getTwitter(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};
*/
//Twitter Sentiments api positive graph
module.exports.getTwittersentiments = function(req, res, next) { 
	insights.getTwittersentiments(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};