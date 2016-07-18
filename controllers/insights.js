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



  var tweets_count=Math.floor(Math.random() * 15)+5;
  var tweetsimpress_count=Math.floor(Math.random() * 3900)+2500;
  var profilevisits_count=Math.floor(Math.random() * 1000)+500;
  var mentions_count=Math.floor(Math.random() * 20)+10;
  var twitter_count=Math.floor(Math.random() * 300)+200;
  var twitter_percentage=Math.floor(Math.random() * 90)+50;
  var sentimate_positive=Math.floor(Math.random() * 90)+50;
  var sentimate_neutral=Math.floor(Math.random() * 90)+50;
  var sentimate_negative=Math.floor(Math.random() * 90)+50;

  var randomDataarry=[{'id':req.swagger.params.twitterid.value,'tweets_count':tweets_count,'tweetsimpress_count':tweetsimpress_count,
  						'profilevisits_count':profilevisits_count,
                        'mentions_count':mentions_count,'twitter_count':twitter_count,"tweets_percentage":78.3,"tweetsimpress_percentage":68.8,
                        "profilevisits_percentage":34.6,"mentions_percentage":23.1,'twitter_percentage':twitter_percentage,
                        'sentimate_positive':sentimate_positive,'sentimate_neutral':sentimate_neutral,'sentimate_negative':sentimate_negative}];



		var dataArray={'data':randomDataarry};
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
		var userName=req.body.Username;
		
		var responseArray=[];
		console.log(result);
		for(var i=0;i<result.rows.length;i++){
			var usernamedb=result.rows[i].key[0].UserName;

			if(userName==usernamedb){

				if(userName=="mkt_manager@bluemix.com"){
					responseArray.push({'Make':result.rows[i].key[0].Make,'Model':result.rows[i].key[0].Model,
									'PositiveScore':result.rows[i].key[0].PositiveScore,
									'PositiveBaseline':result.rows[i].key[0].PositiveBaseline,'NegativeScore':result.rows[i].key[0].NegativeScore,
									'NegativeBaseline':result.rows[i].key[0].NegativeBaseline,'PositiveTolerance':result.rows[i].key[0].PositiveTolerance,
									'NegativeTolerance':result.rows[i].key[0].NegativeTolerance});

				}
				else if(userName=="eng_manager@bluemix.com"){
					responseArray.push({'IncreaseErrortype1':result.rows[i].key[0].IncreaseErrortype1,
						'DecreaseErrortype1':result.rows[i].key[0].DecreaseErrortype1,'IncreaseErrortype2':result.rows[i].key[0].IncreaseErrortype2,
						'DecreaseErrortype2':result.rows[i].key[0].DecreaseErrortype2});
				}
				
			}
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

