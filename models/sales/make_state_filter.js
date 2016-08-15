'use strict';
var db = require('../../database/db');
var geo_location = require("../../models/region_lat_long");
var db_geocode = require('../../database/region_lat_long');
var config = require('../../config/config');




exports.getData = function(payload, drilldown, callback) {

	var optionsAlldata = { q: '*:*', group_level:3 };
    var optionsforConnected = { q: '*:*', group_level:3 };
      db.view('sales', 'salesByMake_Product', optionsAlldata, function(err, resultall) {
            if (err) {
                  console.error(err);
                  return err
            } else {
                  db.view('sales', 'connectedByMakeandState', optionsforConnected, function(err, result) {
                    if(err){
                      console.log(err);
                      return err;
                    }
                    else{ 
                      var alldataArray=[];
                      var connectedArray=[];
                      var aggregateArray=[];
                      var aggregateArraynew=[];
                      for(var i=0;i<resultall.rows.length;i++){
                        if(payload.productAttrs.makes[0].value==resultall.rows[i].key[2]&&payload.region.states[0].value==resultall.rows[i].key[0]){
                
                          alldataArray.push({'make':resultall.rows[i].key[2],'state':resultall.rows[i].key[0],
                                            'city':resultall.rows[i].key[1],'unitsSold':resultall.rows[i].value});

                        }
                      }
                      for(var i=0;i<result.rows.length;i++){
                        if(payload.productAttrs.makes[0].value==result.rows[i].key[2]&&payload.region.states[0].value==result.rows[i].key[0]){
                
                          connectedArray.push({'make':result.rows[i].key[2],'state':result.rows[i].key[0],
                                            'city':result.rows[i].key[1],'unitsConnected':result.rows[i].value});

                        }
                      }
                      for(var i=0;i<connectedArray.length;i++){
                        for(var j=0;j<alldataArray.length;j++){
                          if(connectedArray[i].make==alldataArray[j].make&&connectedArray[i].state==alldataArray[j].state&&
                            connectedArray[i].city==alldataArray[j].city){
                            
                            aggregateArray.push({'make':connectedArray[i].make,'state':connectedArray[i].state,'city':connectedArray[i].city,
                            'unitsSold':alldataArray[i].unitsSold,'unitsConnected':connectedArray[i].unitsConnected});
                          }
                        }
                      }
                      
                      var lat_long=null;
                      db_geocode.open(config.RegionLatituesLongitudes, function(err) {
   
    					if (!err) {
      						db_geocode.read_all(function(err, data) {
        					lat_long =  data;
        					//console.log(lat_long.rows[0].doc.states.name);
        					//for(var k=0;k<lat_long.rows.length;k++){

        					for(var i=0;i<lat_long.rows.length;i++ ){
        						for(var j=0;j<aggregateArray.length;j++){
        							if(lat_long.rows[i].doc.states.name==aggregateArray[j].state){
        								for(var k=0;k<lat_long.rows[i].doc.states.cities.length;k++){
        									if(lat_long.rows[i].doc.states.cities[k].name==aggregateArray[j].city){
        										var lat=lat_long.rows[i].doc.states.cities[k].latitude;
        										var longi=lat_long.rows[i].doc.states.cities[k].longitude;
        										aggregateArraynew.push({'make':connectedArray[j].make,'state':connectedArray[j].state,
        											'city':connectedArray[j].city,'unitsSold':alldataArray[j].unitsSold,
        											'unitsConnected':connectedArray[j].unitsConnected,'latitude':lat,'longitude':longi});
        									}
        								}
        							}
        							
        						}
        						
        					}
        					return callback(err, aggregateArraynew);
        					//console.log(aggregateArraynew);
        					console.log("db opened");
        					
      					});
    					} else {
      						console.log("Error while connecting to coordinates database");
      						console.log(err);
    						}      
  					 });
                              
                                          }
                  });
                  
            }
      });

};


