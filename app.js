/**
 * Module dependencies.
 */

// node modules
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

// app modules
var db = require('./database/db');

var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
	dbName : 'erpsalesdata'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


// all environments
app.set('port', process.env.PORT || 3000);
//app.set('port', 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));




var config = require('./controllers/config');
//app.use('/api/v1/config/', config);

app.get('/name', function(request, response) {
	response.statusCode = 200;      
    response.end("JSON.stringify(result || {}, null, 2)");
});




initDBConnection();

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});

function initDBConnection() {
	is_running_locally = true;
	
	if(!is_running_locally) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		if(vcapServices.cloudantNoSQLDB) {
			dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
			dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
			dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
			dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
			dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;

			cloudant = require('cloudant')(dbCredentials.url);
			
			// check if DB exists if not create
			cloudant.db.create(dbCredentials.dbName, function (err, res) {
				if (err) { console.log('could not create db ', err); }
		    });
			
			db = cloudant.use(dbCredentials.dbName);
			
		} else {
			console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
		}
	} else{
		//console.warn("fsdfds");
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
		// For running this app locally you can get your Cloudant credentials 
		// from Bluemix (VCAP_SERVICES in "cf env" output or the Environment 
		// Variables section for an app in the Bluemix console dashboard).
		// Alternately you could point to a local database here instead of a 
		// Bluemix service.
		dbCredentials.host = "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com";
		dbCredentials.port = 443;
		dbCredentials.user = "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix";
		dbCredentials.password = "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4";
		dbCredentials.url = "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com";
	    
		cloudant = require('cloudant')(dbCredentials.url);
	   
		db = cloudant.use(dbCredentials.dbName);
		
		//db.search('all-states', 'allStates', {q:"*:*&counts=['State']&limit=0"}, function(er, result) {
		
		db.view('uniqStates', 'uniqStates', function(er, result) {	
			 console.log("inside eeee");
			if (er) {
			    //throw er;
				  console.log(er);
			  }

			console.log(result);
			  console.log('Showing %d out of a total %d books by Dickens', result.rows.length, result.total_rows);
			  for (var i = 0; i < result.rows.length; i++) {
			    //console.log('Document id: %s', result.rows[i].key);
			  }
			});
	}
}




