/*
 * Author : Atul Shimpi
 * Time Stamp : 05/25/2016 11:20
 * Purpose : Contains database connection and query code
 * Project : iot Dashboard for Washing Machines
 */

var cloudant = require('cloudant');

var state = {
  db: null
};

// open database
exports.open = function(url, next) {
	
};


// close database		
exports.close = function(url, next) {
	
};

//Generic function for getting documents : Start
exports.getDocuments = function(collection_name, callback) {
	//state.db.collection(collection_name);	
	  /*collections.find().toArray(function(err, collection_name) {
	    callback(err, collection_name);
	  });*/

  if(collection_name == 'states') {	
	  var collections = [{name:'California'},
	                     {name:'Hawaii'},
	                     {name:'Texas'} ];
  } else {
	  var collections = [{name:'Los Angeles'},
	                     {name:'San Diego'},
	                     {name:'San Jose'} ];
  }

  callback(null, collections);
  
  
};

// Get by id(primary key)
module.exports.findDocument = function findCollection(collection_name, id, callback) {
  var collections = state.db.collection(collection_name);
	var criteria = {};
	
  criteria['id'] = id;  
  collections.find(criteria).toArray(function(err, result) {    
    if(result === ""){
      callback('Record not found for id ' + id);
    } else {  
      callback(err, result[0]);
    }
 });
};
 
// get by passed key (other then primary key)
exports.findDocumentsBy = function(collection_name, key, value,  callback) {
  var collections = state.db.collection(collection_name);
  
  var criteria = {};
  criteria[key] = value;  
  
  collections.find(criteria).toArray(function(err, collection_name) {
    callback(err, collection_name);
 });
};

//Generic function for getting documents : End

