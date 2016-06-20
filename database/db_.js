/*
 * Author : Atul Shimpi
 * Time Stamp : 05/25/2016 11:20
 * Purpose : Contains database connection and query code
 * Project : iot Dashboard for Washing Machines
 */
//===============================================================================

var Cloudant = require('cloudant');

function Database() {
  this.conn_info = null;
  this.cloudant = null;
  this.db = null; 
}

// open database
Database.prototype.open = function(conn_info, callback) {  
  if (this.db) return callback(null);
  
  this.conn_info = conn_info;
  var db_instance =  this;
  Cloudant(conn_info, function(err, cloudant) {    	  
    if (err)  return callback('Failed to initialize Cloudant: ' + err.message);
    
    db_instance.cloudant = cloudant;
    
    cloudant.db.list(function(err, allDbs) {
      for(var each_db in allDbs) {
        if(allDbs[each_db] === conn_info.dbName) {       
           db_instance.db = cloudant.db.use(conn_info.dbName);
                      
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
}

Database.prototype.use = function(db_name, callback) { 
  this_obj =  this; 
  this.cloudant.db.list(function(err, allDbs) {
      for(var each_db in allDbs) {
        if(allDbs[each_db] === db_name) {       
           this_obj.db = this_obj.cloudant.db.use(db_name);  
           callback();  
           return;           
        }          
      }     
         
      //we reached here means database does not exists 
      callback(db_name + " not found on " + JSON.stringify(this_obj.conn_info));      
    });    
}

Database.prototype.view = function(design_doc_name, view_name, options, callback) {
  if(this.db == undefined) return callback('Not connected to database');  
  
  this.db.view(design_doc_name, view_name, options, function(err, result)  {	
    if(err) return callback(err, null);    
	  if(result) return callback(err, result);
  });
}

Database.prototype.search = function(index, query, options, callback) {
  if(this.db == undefined) return callabck('Not connected to database connected');  
  
  this.db.search(index, query, options, function(err, result)  {	
    if(err) return callback(err, null);    
	if(result) return callback(err, result);
  });
}
 
// close database		
Database.prototype.close = function(url, next) {
  if (this.db) {
	 //state.db.close(function(err, result) {      
	      state.db = null
	      //state.mode = null     
	      done(err)
	    //})
  }
}

module.exports = Database;