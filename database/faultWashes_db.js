/*
 * Author : Yasitha Dehigama
 * Time Stamp : 07/08/2016 11:20
 * Purpose : Contains database connection and query code
 * Project : iot Dashboard for Washing Machines
 */
//===============================================================================

var Cloudant = require('cloudant');

var state = {
  db: null
};

// open database
exports.open = function(conn_info, callback) {
  if (state.db) return callbak(null);
  
  Cloudant(conn_info, function(err, cloudant) {    	  
    if (err)  return callback('Failed to initialize Cloudant: ' + err.message);
    
    cloudant.db.list(function(err, allDbs) {
      for(var each_db in allDbs) {
        if(allDbs[each_db] === conn_info.dbName) {            
           state.db = cloudant.db.use(conn_info.dbName); 
           callback();
           return;           
        }          
      }
      
      if(err)
        callback(err);
      
      //we reached here means database does not exists    
      callback(conn_info.dbName + " not found on " + JSON.stringify(conn_info));      
    });    
  });
};

  
exports.search = function(index, query, options, callback) {
  if(state.db == undefined) return callabck('Not connected to database connected');  
  
  state.db.search(index, query, options, function(err, result)  {	
    if(err) return callback(err, null);    
	if(result) return callback(err, result);
  });
};

exports.view = function(design_doc_name, view_name, params, callback) {
  if(state.db == undefined) return callabck('Not connected to database connected');  
  
  state.db.view(design_doc_name, view_name, params, function(err, result) {
    if(err) return callback(err, null);
    if(result) return callback(err, result);    
  });  
};
 
// close database		
exports.close = function(url, next) {
  if (state.db) {
	 //state.db.close(function(err, result) {      
	      state.db = null
	      //state.mode = null     
	      done(err)
	    //})
  }
}

//Generic function for getting documents : Start
exports.getDocuments = function(collection_name, callback) {
	//state.db.collection(collection_name);	
	  /*collections.find().toArray(function(err, collection_name) {
	    callback(err, collection_name);
	  });*/

  var collection;
  
  if(collection_name == 'states') {	
	  collection = [{"state": "California"},
	                {"state": "Hawaii"},
	                {"state": "Texas"}
	               ];
  } else if (collection_name == 'cities') {
	  collection = [ {"California": [{"city": "Los Angeles"},
	                                 {"city": "San Diego"}, 
	                                 {"city": "San Jose"} 
	                                ]
	                 }
	               ];	  
  } else if (collection_name == 'zip_codes') {
	  collection = [ {"California": [{"Los Angeles": [{"zip": 1001}] },
	                                 {"San Diego": [{"zip": 1001}]}, 
	                                 {"San Jose": [{"zip": 1001}]} 
	                                ]
	                 }
	               ];	 	  
  }
  
  else if (collection_name == 'zip_codes') {
	  collection = [ {"California": [{"Los Angeles": [{"zip": 1001}] },
	                                 {"San Diego": [{"zip": 1001}]}, 
	                                 {"San Jose": [{"zip": 1001}]} 
	                                ]
	                 }
	               ];	 	  
  }
  
  callback(null, collection);
  
  
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

