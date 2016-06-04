'use strict';
var db = require('../database/db');
var COLLECTION_NAME = 'stores';

exports.getAllStates = function(callback) {
  var opts = { q: '*:*', counts: ['State'], limit:0 };  
  
  db.search('all-states', 'allStates', opts, function(err, result) {
    if(err) {
    	callback(err, null)
    } else {  
	  var all_states = {'states': []};
		
	  for(var state in result.counts.State) {	  	
	    all_states.states.push({'name': state});
	  }	
	
      callback(err, all_states);
    }
  });
};

exports.getAllSalesYears = function(callback) {
	  var opts = { q: '*:*', counts: ['SoldYear'], limit:0 };  
	  
	  db.search('yearsBySoldDate', 'yearsBySoldDate', opts, function(err, result) {
	    if(err) {
	    	callback(err, null)
	    } else {  
		  var all_sales_years = {'sales_years': []};
			
		  for(var year in result.counts.SoldYear) {	  	
			  all_sales_years.sales_years.push({'year': year});
		  }	
		
	      callback(err, all_sales_years);
	    }
	  });
	};


exports.getAllCitiesByState = function(state_names, callback) {	    
	var opts = { q: 'State:' + state_names, counts: ['CityState'], limit:0 };  
	  
	db.search('CitiesByStates', 'CitiesByStates', opts, function(err, result) {		
		if(err) {
	    	callback(err, null)
	    } else {  
		  var all_cities = {};
		  
		  var arr = [];
		  for(var city in result.counts.CityState) {	  	
			    arr = city.split(",");
			    all_cities[arr[1]] = [];
			  }	
		  		  
		  for(var city in result.counts.CityState) {			    
			  arr = city.split(",");
			  
			  all_cities[arr[1]].push({'city': arr[0]});
		  }	
		
	      callback(err, all_cities);
	    }
	});	  
};

exports.getAllZipCodesByCities = function(cities_names, callback) {
	var opts = { q: 'CityState:' + cities_names, counts: ['CityZip'], limit:0 };  
	  
	db.search('CitiesByStates', 'CitiesByStates', opts, function(err, result) {
		//console.log(result);
		if(err) {
	    	callback(err, null)
	    } else {  
		  var all_zipcodes = {};
		  
		  var arr = [];
		  for(var zip in result.counts.CityZip) {	  	
			    arr = zip.split(",");
			    all_zipcodes[arr[1]] = [];
			  }	
		  
		  //console.log(all_zipcodes);
		  for(var zip in result.counts.CityZip) {	  	
		    //all_cities.cities.push({'name': city});
			  arr = zip.split(",");
			  
			  all_zipcodes[arr[1]].push({'zip_code': arr[0]});
		  }	
		
	      callback(err, all_zipcodes);
	    }
	});	  
};

exports.getAllMakes = function(callback) {
  var opts = { q: '*:*', counts: ['Makes'], limit:0 };
  
  db.search('Makes', 'allMakes', opts, function(err, result) {	
	if(err) {
		callback(err, null);
	} else {
      var all_makes = {'makes': []};
	
	  for(var make in result.counts.Makes) {	  	
	    all_makes.makes.push({'name': make});
	  }	
		
	   callback(err, all_makes);
    } 
  });
};

exports.getAllModelsByMakes = function(make_names, callback) {
	  var opts = { q: 'Makes:' + make_names, counts: ['ModelMake'], limit:0 };	   
	  
		db.search('ModelsByMakes', 'ModelsByMakes', opts, function(err, result) {
			//console.log(result);
			if(err) {
		    	callback(err, null)
		    } else {  
			  var all_models = {};
			  
			  var arr = [];
			  for(var model in result.counts.ModelMake) {	  	
				    arr = model.split(",");
				    all_models[arr[1]] = [];
				  }	
			  
			  //console.log(all_cities);
			  for(var model in result.counts.ModelMake) {	  	
			    //all_cities.cities.push({'name': city});
				  arr = model.split(",");
				  
				  all_models[arr[1]].push({'model': arr[0]});
			  }	
			
		      callback(err, all_models);
		    }
		});	  
};

exports.getAllSKUsByModels = function(model_names, callback) {
	var opts = { q: 'ModelMake:' + model_names, counts: ['Modelsku'], limit:0 };	   
	  
	db.search('ModelsByMakes', 'ModelsByMakes', opts, function(err, result) {
		//console.log(result);
		if(err) {
	    	callback(err, null)
	    } else {  
		  var all_skus = {};
		  
		  var arr = [];
		  for(var sku in result.counts.Modelsku) {	  	
			    arr = sku.split(",");
			    all_skus[arr[1]] = [];
			  }	
		  
		  //console.log(all_cities);
		  for(var sku in result.counts.Modelsku) {	  	
		    //all_cities.cities.push({'name': city});
			  arr = sku.split(",");
			  
			  all_skus[arr[1]].push({'sku': arr[0]});
		  }	
		
	      callback(err, all_skus);
	    }
	});	  
};
	