"use strict"

var express = require('express');
var insights = require('../models/insights');
var helper = require('./helpers/utility.js');
var config = require('../models/insights.js');
var db = require('../database/notificationConfigDb.js');
var COLLECTION_NAME = 'stores';


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
				helper.sendResponse(res, err, "The username or password you enteered is incorrect");
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

//spike in number of specific error by make with real db
module.exports.getspikeerrorBymake = function(req, res, next) {
	config.getspikeerrorBymake(function(err, result){  	  
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

//Twitter insights table api for requested id

module.exports.getTwittersentimentsforid = function(req, res, next) { 
	insights.getTwittersentimentsforid(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};


//Twitter Sentiments api graph
module.exports.getTwittersentiments = function(req, res, next) { 
	insights.getTwittersentiments(function(err, result){  
		var dataArray={'data':result};
	    helper.sendResponse(res, err, dataArray); 
	});
};

//Notification api
module.exports.getNotificationonload = function(req, res, next) { 
	insights.getNotificationonload(function(err, result){  
	    helper.sendResponse(res, err, result); 
	});
};

//twitter handles graph api in single view
module.exports.getTwitterhandle = function(req, res, next) { 
	insights.getTwitterhandle(function(err, result){  
	    helper.sendResponse(res, err, result); 
	});
};

//Notification configuration settings send response
module.exports.getNotificationconfigsettings = function(req, res, next) { 
	insights.getNotificationconfigsettings(function(err, result){ 
		console.log(req.body);
		var userRole=req.body.Userrole;
		var chartType=req.body.Charttype;

		var responseArray=[];
		if(userRole=="mkt_manager"&&chartType=="twitter_sentiments"){
			responseArray.push({'positive_threshold':10,'positive_tolerance':10,'negative_threshold':10,'negative_tolerance':10});
		}
		else if(userRole=="mkt_manager"&&chartType=="spikes_in_connected_machines"){
			responseArray.push({'increase_tolerance':50,'decrease_tolerance':20});
		}
		else if(userRole=="eng_manager"&&chartType=="spikes_in_specific_errors"){
			responseArray.push({'error_type_increase':"Water","error_type_decrease": "Water"});
		}
		else if(userRole=="eng_manager"&&chartType=="spikes_in_connected_machines_by_make_model"){
			responseArray.push({'error_type_increase':"Water","error_type_decrease": "Water"});
		}
	    helper.sendResponse(res, err, responseArray); 
	});
};

//Notification Configuration setting request from frontend page
module.exports.getNotificationconfigsettingsfrompage = function(req, res, next) { 
	insights.getNotificationconfigsettingsfrompage(function(err, result){

		var Cloudant = require('cloudant');
		var username = "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix";
		var password = "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4";
		var cloudant = Cloudant({account:username, password:password});
    	var alice = cloudant.db.use('notificationconfigdb')

		var userrole=req.body.UserName;

		for(var i=0;i<result.rows.length;i++){

			var docid=result.rows[i].key[0];
			var revid=result.rows[i].key[1];
			var roletype=result.rows[i].key[2];

			if(userrole==roletype){
				if(userrole=="mkt_manager@bluemix.com"){
					var doc = {
  						_id: docid,
  						_rev: revid,
  						UserName:userrole,
  						Make:req.body.Make,
  						Model:req.body.Model,
  						PositiveScore:req.body.PositiveScore,
  						PositiveBaseline:req.body.PositiveBaseline,
  						NegativeScore:req.body.NegativeScore,
  						NegativeBaseline:req.body.NegativeBaseline,
  						PositiveTolerance:req.body.PositiveTolerance,
  						NegativeTolerance:req.body.NegativeTolerance
					}
					alice.insert(doc, function(body, header) { 		
      					console.log('You updated.');    		
    				});
				}
				else if(userrole=="eng_manager@bluemix.com"){
					var doc = {
  						_id: docid,
  						_rev: revid,
  						UserName:userrole,
  						IncreaseErrortype1:req.body.IncreaseErrortype1,
  						DecreaseErrortype1:req.body.DecreaseErrortype1,
  						IncreaseErrortype2:req.body.IncreaseErrortype2,
  						DecreaseErrortype2:req.body.DecreaseErrortype2
					}
					alice.insert(doc, function(body, header) { 		
      					console.log('You updated.');    		
    				});
				}
			}
			
		}
	    helper.sendResponse(res, err, {'message':"Document Updated"}); 


	    


	});
};

