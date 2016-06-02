'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getCharts = function(callback) {
	  var opts = { q: '*:*', counts: ['MfgYear'], limit:0 };  
	  
	  db.search('yearsByMfgDate', 'yearsByMfgDate', opts, function(err, result) {
	    if(err) {
	    	callback(err, null)
	    } else {  
		  var all_mfg_years_XX = {'data': [ { "make": "LG",
                                       "model": "Woo1",
                                       "avgWaterUsed" : 10.5,
                                       "avgEngeryUsed": 4.55,
                                       "avgWashCycleDuration": 2,
                                       "avgWashCycles": 55,
                                       "avgTemperature": 55.66,
                                       "avgDetergentUsed" : 10.55,
                                       "avgMoisture": 70.09,
                                       "avgWeight": 50.66                                        
                                      },
                                      { "make": "Whirlpool",
                                       "model": "Fuzzy",
                                       "avgWaterUsed" : 3.5,
                                       "avgEngeryUsed": 48.55,
                                       "avgWashCycleDuration": 2,
                                       "avgWashCycles": 55,
                                       "avgTemperature": 55.66,
                                       "avgDetergentUsed" : 10.55,
                                       "avgMoisture": 70.09,
                                       "avgWeight": 50.66                                        
                                      },
                                    ]
                          };     
                                
		  	var all_mfg_years = [
                              {
                                "id": "connectedVsSold",
                                "name": "Connectec vs sold.",
                                "chartType": "Pie",
                                "defaults": all_mfg_years_XX
                              }
                            ];
	      callback(err, all_mfg_years);
	    }
	  });
};

exports.getChartById = function(callback) {
	  var opts = { q: '*:*', counts: ['MfgYear'], limit:0 };  
	  
	  db.search('yearsByMfgDate', 'yearsByMfgDate', opts, function(err, result) {
	    if(err) {
	    	callback(err, null)
	    } else {  
		  var all_mfg_years_XX = {'data': [ { "make": "LG",
                                       "model": "Woo1",
                                       "avgWaterUsed" : 10.5,
                                       "avgEngeryUsed": 4.55,
                                       "avgWashCycleDuration": 2,
                                       "avgWashCycles": 55,
                                       "avgTemperature": 55.66,
                                       "avgDetergentUsed" : 10.55,
                                       "avgMoisture": 70.09,
                                       "avgWeight": 50.66                                        
                                      },
                                      { "make": "Whirlpool",
                                       "model": "Fuzzy",
                                       "avgWaterUsed" : 3.5,
                                       "avgEngeryUsed": 48.55,
                                       "avgWashCycleDuration": 2,
                                       "avgWashCycles": 55,
                                       "avgTemperature": 55.66,
                                       "avgDetergentUsed" : 10.55,
                                       "avgMoisture": 70.09,
                                       "avgWeight": 50.66                                        
                                      },
                                    ]
                          };     
                                
		  	var all_mfg_years = [
                              {
                                "id": "connectedVsSold",
                                "name": "Connectec vs sold.",
                                "chartType": "Pie",
                                "defaults": all_mfg_years_XX
                              }
                            ];
	      callback(err, all_mfg_years);
	    }
	  });
	};
  
    
  