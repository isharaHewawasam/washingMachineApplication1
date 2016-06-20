/*
 * Author : Atul Shimpi
 * Time Stamp : 05/25/2016 11:20
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
  if(state.db == undefined) return callaback('Not connected to database connected');  
  
  state.db.search(index, query, options, function(err, result)  {	
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



