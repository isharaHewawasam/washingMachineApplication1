//'use strict';
var db = require('../database/faultWashes_db.js');
var COLLECTION_NAME = 'stores';

var DB_NAME = 'washdatafailedwashes';


//most fault recrds models
exports.getMostFaultModels = function(callback) {
  var opts = { q: '*:*', counts: ['Model'], limit:0 };  
  
  db.search('insights', 'mostFaultModels', opts, function(err, result) {
    if(err) {
    	console.log(err);
    	callback(err, null)
    } else {  
   	
	  var all_models = {'models': []};
	  var modelCount_array = [result.counts.Model.Model1, result.counts.Model.Model2, result.counts.Model.Model3,
	  			 result.counts.Model.Model4, result.counts.Model.Model5,result.counts.Model.Model6,
	  			result.counts.Model.Model7,result.counts.Model.Model8,result.counts.Model.Model9];
    console.log(result);
	  	function predicatBy(prop){
   			return function(a,b){
      			if( a[prop] > b[prop]){
          			return 1;
      			}else if( a[prop] < b[prop] ){
          			return -1;
      			}
      			return 0;
   				}
			}

	  var count=0;

	  for(var model in result.counts.Model) {	  	
	    all_models.models.push({'Model': model,'no_of_faults':modelCount_array[count]});
	    count=count+1;
	  }	

	  var sortedArray=all_models.models.sort(predicatBy("no_of_faults"));
	  var leastDataArray=[sortedArray[8],sortedArray[7],sortedArray[6]];

      callback(err, leastDataArray);
    }
  });
};



//get least fault models
exports.getLeastFaultModels = function(callback) {
  var opts = { q: '*:*', counts: ['Model'], limit:0 };  
  
  db.search('insights', 'mostFaultModels', opts, function(err, result) {
    if(err) {
    	console.log(err);
    	callback(err, null)
    } else {  
	  var all_model = {'models': []};
	  
	  

	  var modelCount_array = [result.counts.Model.Model1, result.counts.Model.Model2, result.counts.Model.Model3,
	  			 result.counts.Model.Model4, result.counts.Model.Model5,result.counts.Model.Model6,
	  			result.counts.Model.Model7,result.counts.Model.Model8,result.counts.Model.Model9];
	  
    console.log(result);
	  function predicatBy(prop){
   			return function(a,b){
      			if( a[prop] > b[prop]){
          			return 1;
      			}else if( a[prop] < b[prop] ){
          			return -1;
      			}
      			return 0;
   				}
			}
	  //var modelCount_array=new Array(count_Model1,count_Model2,count_Model3,count_Model4,count_Model5,count_Model6,count_Model7,count_Model8,count_Model9);
	  var count=0;
	  for(var model in result.counts.Model) {	  	
	    all_model.models.push({'Model': model,'no_of_faults':modelCount_array[count]});
	    count=count+1;
	  }		
	  var sortedArray=all_model.models.sort(predicatBy("no_of_faults"));
	  var leastDataArray=[sortedArray[0],sortedArray[1],sortedArray[2]];
      callback(err, leastDataArray);
    }
  });
};


//most commonn fault

exports.getmostFault = function(callback) {
  var opts = { q: '*:*', counts: ['Fault'], limit:0 };  
  
  db.search('insights', 'mostCommonfault', opts, function(err, result) {
    if(err) {
    	console.log(err);
    	callback(err, null)
    } else {  
	  var all_fault = {'faults': []};
	  
	  var faultArray=[result.counts.Fault.Sensor,result.counts.Fault.Software,result.counts.Fault.Water];
	  
	  var count=0;
	  for(var model in result.counts.Fault) {	  	
	    all_fault.faults.push({'Fault': model,'no_of_faults':faultArray[count]});
	    count=count+1;
	  }		
	  
      callback(err, all_fault);
    }
  });
};

//spike in number of specific error by make with real db
exports.getspikeerrorBymake = function(callback) {
      var options = { q: '*:*', group_level:3 };
      var optionsforalldata = { q: '*:*', group_level:3 };
      db.view('insights', 'specific-error-bymake', options, function(err, result) {
            if (err) {
                  console.error(err);
                  return callback(err, null);
            } else {
                  db.view('insights', 'specific-error-bymakeall', optionsforalldata, function(err, resultall) {
                    if(err){
                      console.log(err);
                      return callback(err, null);
                    }
                    else{
                      var arryforData = [];
                      var fourweekBackdataarray=result.rows.length;
                      var allyearData=resultall.rows.length;

                      if(fourweekBackdataarray==allyearData){

                        for (var i = 0; i < resultall.rows.length; i++) {
                          arryforData.push({'make':resultall.rows[i].key[0],'model':resultall.rows[i].key[1],'error_type':resultall.rows[i].key[2],
                            'countAlldata':resultall.rows[i].value,'countfourweekBack':result.rows[i].value});
                        }
                      }              
                      return callback(err, arryforData);
                    }
                  });
                  
            }
      });
}

//Login Authentication
exports.getAuthentication = function(callback) {
  callback(null, "Success");  
};

//twitter notification
exports.getTwitternotificationsentiments = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitternotifications);  
};

exports.getTwitternotificationspike = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitternotificationsspike);  
};
//spike in number of specific error
exports.getTwitternotificationspikeerrors = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitternotificationsspikeerror);  
};
//spike in number of specific error by make
exports.getTwitternotificationspikeerrorsbymake = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitternotificationsspikeerrorbymake);  
};

//Twitter inner page apis

//Twitter insights table api
exports.getTwitterinsightstable = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitterinnerpageTwitterinsights);  
};

//Twitter Sentiments grpah api
exports.getTwittersentiments = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitterinnerpagesentiments);  
};

//Notification APi
exports.getNotificationonload = function(callback) {
  var randomnumber=Math.floor(Math.random() * 4) + 1 ;
  var arrayRandom=[{'notification_count':randomnumber}]
  callback(null, arrayRandom);  
};

//Twitter Handles graph api in single view
exports.getTwitterhandle = function(callback) {
  callback(null, require("./twiiternotification_dummy").twitterhandle);  
}; 

//Notification area chart response api
exports.getNotificationareachart = function(callback) {
  callback(null, "Success");  
}; 