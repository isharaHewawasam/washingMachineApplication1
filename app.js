'use strict';

var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var config = require('./config/config');
var db = require('./database/db')
var serverPort = process.env.PORT || 3000;

// swaggerRouter configuration
var options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./swagger.json');

function exitHandler(reason) {	
  if(reason)
	console.log(reason);
  process.exit(0);
  
  if(db !== undefined) {
    db.close(function(){	
      process.exit(0);
    }); 
  }
}

process.on('SIGINT', exitHandler);
process.on('exit', exitHandler);
process.on('uncaughtException', exitHandler);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  //connect to database
  db.open(config.SalesDatabase, function(err) {
	if(err) {	  	
	  console.log("Database connection failed");
	  console.log(err);
	} else {
      http.createServer(app).listen(serverPort, '0.0.0.0', function() {   			
	    console.log('Express server listening on port ' + serverPort);
      });
	}
  });
  
  // Start the server
  /*http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });*/
});