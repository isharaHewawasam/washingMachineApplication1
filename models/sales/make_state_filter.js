'use strict';
var db = require('../../database/db');
var geo_location = require("../../models/region_lat_long");
var db_geocode = require('../../database/region_lat_long');
var config = require('../../config/config');




exports.getData = function(payload, drilldown, callback) {

    var optionsAlldata = {
        q: '*:*',
        group_level: 3
    };
    var optionsforConnected = {
        q: '*:*',
        group_level: 3
    };
    db.view('sales', 'salesByMake_Product', optionsAlldata, function(err, resultall) {
        if (err) {
            console.error(err);
            return err
        } else {
            db.view('sales', 'connectedByMakeandState', optionsforConnected, function(err, result) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    var alldataArray = [];
                    var connectedArray = [];
                    var aggregateArray = [];
                    var aggregateArraynew = [];
                    for (var i = 0; i < resultall.rows.length; i++) {
                        if (payload.productAttrs.makes[0].value == resultall.rows[i].key[2] && payload.region.states[0].value == resultall.rows[i].key[0]) {

                            alldataArray.push({
                                'make': resultall.rows[i].key[2],
                                'state': resultall.rows[i].key[0],
                                'city': resultall.rows[i].key[1],
                                'unitsSold': resultall.rows[i].value
                            });

                        }
                    }
                    for (var i = 0; i < result.rows.length; i++) {
                        if (payload.productAttrs.makes[0].value == result.rows[i].key[2] && payload.region.states[0].value == result.rows[i].key[0]) {

                            connectedArray.push({
                                'make': result.rows[i].key[2],
                                'state': result.rows[i].key[0],
                                'city': result.rows[i].key[1],
                                'unitsConnected': result.rows[i].value
                            });

                        }
                    }
                    for (var i = 0; i < connectedArray.length; i++) {
                        for (var j = 0; j < alldataArray.length; j++) {
                            if (connectedArray[i].make == alldataArray[j].make && connectedArray[i].state == alldataArray[j].state &&
                                connectedArray[i].city == alldataArray[j].city) {

                                aggregateArray.push({
                                    'make': connectedArray[i].make,
                                    'state': connectedArray[i].state,
                                    'city': connectedArray[i].city,
                                    'unitsSold': alldataArray[i].unitsSold,
                                    'unitsConnected': connectedArray[i].unitsConnected
                                });
                            }
                        }
                    }

                    var lat_long = null;
                    db_geocode.open(config.RegionLatituesLongitudes, function(err) {

                        if (!err) {
                            db_geocode.read_all(function(err, data) {
                                lat_long = data;
                                //console.log(lat_long.rows[0].doc.states.name);
                                //for(var k=0;k<lat_long.rows.length;k++){

                                for (var i = 0; i < lat_long.rows.length; i++) {
                                    for (var j = 0; j < aggregateArray.length; j++) {
                                        if (lat_long.rows[i].doc.states.name == aggregateArray[j].state) {
                                            for (var k = 0; k < lat_long.rows[i].doc.states.cities.length; k++) {
                                                if (lat_long.rows[i].doc.states.cities[k].name == aggregateArray[j].city) {
                                                    var lat = lat_long.rows[i].doc.states.cities[k].latitude;
                                                    var longi = lat_long.rows[i].doc.states.cities[k].longitude;
                                                    aggregateArraynew.push({
                                                        'make': connectedArray[j].make,
                                                        'state': connectedArray[j].state,
                                                        'city': connectedArray[j].city,
                                                        'unitsSold': alldataArray[j].unitsSold,
                                                        'unitsConnected': connectedArray[j].unitsConnected,
                                                        'latitude': lat,
                                                        'longitude': longi
                                                    });
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

//get data for only state
exports.getDataforstate = function(payload, drilldown, callback) {
    var optionsAlldata = {
        q: '*:*',
        group_level: 2
    };
    var optionsforConnected = {
        q: '*:*',
        group_level: 2
    };
    db.view('sales', 'salesByMake_Product', optionsAlldata, function(err, resultall) {
        if (err) {
            console.error(err);
            return err
        } else {
            db.view('sales', 'connectedByMakeandState', optionsforConnected, function(err, resultConnected) {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    var alldataArray = [];
                    var allConnectedarray = [];
                    var aggregateArray=[];
                    var aggregateArraynew=[];
                    for (var i = 0; i < resultall.rows.length; i++) {
                      if (payload.region.states[0].value == resultall.rows[i].key[0]) {
                        alldataArray.push({
                            'state': resultall.rows[i].key[0],
                            'city': resultall.rows[i].key[1],
                            'unitsSold':resultall.rows[i].value
                        });
                      }
                    }

                    for (var i = 0; i < resultConnected.rows.length; i++) {
                      if (payload.region.states[0].value == resultConnected.rows[i].key[0]) {
                        allConnectedarray.push({
                            'state': resultall.rows[i].key[0],
                            'city': resultall.rows[i].key[1],
                            'unitsConnected':resultConnected.rows[i].value
                        });
                      }
                    }
                      console.log(allConnectedarray);
                  
                    for(var i=0;i<allConnectedarray.length;i++){
                      if(alldataArray[i].state==allConnectedarray[i].state){
                        aggregateArray.push({
                            'state': allConnectedarray[i].state,
                            'city': allConnectedarray[i].city,
                            'unitsSold':alldataArray[i].unitsSold,
                            'unitsConnected':allConnectedarray[i].unitsConnected
                        });
                      }                   
                    }
          
                }

                var lat_long = null;
                db_geocode.open(config.RegionLatituesLongitudes, function(err) {

                    if (!err) {
                        db_geocode.read_all(function(err, data) {
                            lat_long = data;
                            for (var i = 0; i < lat_long.rows.length; i++) {
                              for(var j=0;j<aggregateArray.length;j++){
                                if(lat_long.rows[i].doc.states.name==aggregateArray[j].state){
                                  for (var k = 0; k < lat_long.rows[i].doc.states.cities.length; k++) {
                                    if (lat_long.rows[i].doc.states.cities[k].name == aggregateArray[j].city) {
                                      var lat = lat_long.rows[i].doc.states.cities[k].latitude;
                                      var longi = lat_long.rows[i].doc.states.cities[k].longitude;
                                                aggregateArraynew.push({
                                                    'state': aggregateArray[j].state,
                                                    'city': aggregateArray[j].city,
                                                    'unitsSold': aggregateArray[j].unitsSold,
                                                    'unitsConnected': aggregateArray[j].unitsConnected,
                                                    'latitude': lat,
                                                    'longitude': longi
                                                });
                                            }
                                        }
                                }
                              }
                            }
                            return callback(err, aggregateArraynew);
                            console.log("db opened");

                        });
                    } else {
                        console.log("Error while connecting to coordinates database");
                        console.log(err);
                    }
                });

            });

        }
    });
};

//get data for state and city
exports.getDataforstateandCity = function(payload, drilldown, callback) {
    var optionsAlldata = {q: '*:*',group_level: 3};
    var optionsforConnected = {q: '*:*',group_level: 3};

    db.view('sales', 'salesByStateandCity', optionsAlldata, function(err, resultall) {
            if (err) {
                  console.error(err);
                  return callback(err, null);
            } else {
                  db.view('sales', 'connectedByStateandCity', optionsforConnected, function(err, result) {
                    if(err){
                      console.log(err);
                      return callback(err, null);
                    }
                    else{
                      var payloadState=payload.region.states[0].value;
                      var payloadCity=payload.region.cities[0].value;
                
                      var soldArray=[];
                      var connectedArray=[];
                      var aggregateArray=[];
                      var aggregateArraynew=[];

                      for(var i=0;i<resultall.rows.length;i++){
                        if(payloadState==resultall.rows[i].key[0]&&payloadCity==resultall.rows[i].key[1]){
                            soldArray.push({'state':resultall.rows[i].key[0],'city':resultall.rows[i].key[1],'zipcode':resultall.rows[i].key[2],
                                        'unitsSold':resultall.rows[i].value});
                        }
                        
                      }

                      for(var i=0;i<result.rows.length;i++){
                        if(payloadState==result.rows[i].key[0]&&payloadCity==result.rows[i].key[1]){
                            connectedArray.push({'state':result.rows[i].key[0],'city':result.rows[i].key[1],'zipcode':result.rows[i].key[2],
                                        'unitsConnected':result.rows[i].value});
                        }                    
                      }   

                      for(var i=0;i<soldArray.length;i++){
                        for(var j=0;j<connectedArray.length;j++){
                            if(soldArray[i].state==connectedArray[j].state&&soldArray[i].city==connectedArray[j].city
                                &&soldArray[i].zipcode==connectedArray[j].zipcode){
                                aggregateArray.push({'state':soldArray[i].state,'city':soldArray[i].city,
                                                            'zipcode':soldArray[i].zipcode,'unitsSold':soldArray[i].unitsSold,
                                                            'unitsConnected':connectedArray[j].unitsConnected});
                            }
                        }
                      }
                      var lat_long = null;
                      db_geocode.open(config.RegionLatituesLongitudes, function(err) {

                        if (!err) {
                            db_geocode.read_all(function(err, data) {
                                lat_long = data;
                                for (var i = 0; i < lat_long.rows.length; i++) {
                                for(var j=0;j<aggregateArray.length;j++){
                                    if(lat_long.rows[i].doc.states.name==aggregateArray[j].state){
                                    for (var k = 0; k < lat_long.rows[i].doc.states.cities.length; k++) {
                                        //console.log(lat_long.rows[i].doc.states.cities[k].zipCodes.length);
                                        if (lat_long.rows[i].doc.states.cities[k].name == aggregateArray[j].city) {
                                            for(var l=0;l<lat_long.rows[i].doc.states.cities[k].zipCodes.length;l++){
                                                if(lat_long.rows[i].doc.states.cities[k].zipCodes[l].zipCode==aggregateArray[j].zipcode){
                                                    //console.log(lat_long.rows[i].doc.states.cities[k].zipCodes[l]);
                                                    var lat = lat_long.rows[i].doc.states.cities[k].zipCodes[l].latitude;
                                                    var longi = lat_long.rows[i].doc.states.cities[k].zipCodes[l].longitude;
                                                    var zipcode=lat_long.rows[i].doc.states.cities[k].zipCodes[l].zipCode;
                                                    aggregateArraynew.push({
                                                        'state': aggregateArray[j].state,
                                                        'city': aggregateArray[j].city,
                                                        'unitsSold': aggregateArray[j].unitsSold,
                                                        'unitsConnected': aggregateArray[j].unitsConnected,
                                                        'zip_code':zipcode,
                                                        'latitude': lat,
                                                        'longitude': longi
                                                        });
                                                    }
                                                
                                                    
                                                    }
                                        
                                                    }
                                                }
                                            }
                                        }
                                    }
                                return callback(err, aggregateArraynew);
                                console.log("db opened");

                            });
                        } 
                        else {
                            console.log("Error while connecting to coordinates database");
                            console.log(err);
                        }
                        });
                    }

                  });
                  
            }
      });


};