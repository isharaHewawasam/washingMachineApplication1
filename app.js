'use strict';

var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var config = require('./config/config');
var db = require('./database/db')
var Database = require('./database/db_')
var WashDailyAggregateDb = require('./database/dbWashDailyAggregate');
var faultWashesDb=require('./database/faultWashes_db');
var notifcationConfigsettings=require('./database/notificationConfigDb');
var serverPort = process.env.PORT || 3000;
var serveStatic = require('serve-static');
var cors = require('cors');
var bodyParser = require('body-parser');
var utility = require("./middle_ware/utility");

app.use(serveStatic("./UI/WebContent"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(logErrors);

/*function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}*/
// swaggerRouter configuration
var options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./swagger.json');
                  
function exitHandler(reason) {	
  if(reason) {
    console.log("*********APP CRASHED****************************************");
	  console.trace(reason.stack);
    console.log("Reason : " + reason);
    
  }
  
  process.exit(0);
  
  if(db !== undefined) {
    db.close(function(){	
      process.exit(0);
    }); 
  }
}



function LogExcpetion(reason) {	
  if(reason) {
    console.log("*********APP CRASHED****************************************");
	  console.trace(reason.stack);
    console.log("Reason : " + reason);
    
  }
}



process.on('SIGINT', exitHandler);
process.on('exit', exitHandler);
process.on('uncaughtException', LogExcpetion);

app.use(function(req, res, next){
  console.log("URL : " + req.originalUrl);
  console.log("Request Body : " + JSON.stringify(req.body));
  
  
  require('./middle_ware/sanitize_request').sanitize(req.body);
  console.log("Request after sanitizing: " + JSON.stringify(req.body));
  
  next();
});



var salesDb = new Database();
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  
  if((config.host == undefined) || (config.host == null)) {
    console.log("Error : Host name is not set in config.");
    process.exit(1);
  }
    
  swaggerDoc.host = config.host;
  // Interpret Swagger resources and attach metadata to request - must be first .in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());
  app.use(cors());
 
  /*app.use(function (req, res, next) {
    console.log("Request : " + req.toString());
    next();
  });*/
  
  
  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
  
  ///////start logging in text
var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'w' });
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;
 
  //app.use(sanitizeRequest());
   
  /*salesDb.open(config.WashDailyAggregateDatabase, function(err){
    if(err) {
      console.log("Error in database connection : " + err);
      return;
    }
    
    console.log("Connection successfull");
    salesDb.use(config.SalesDatabase.dbName, function(err){      
      if(err) {
        return;
      }
    
      var params = { reduce: true, group_level: 2 };
    
      salesDb.view('averages', "averages", params, function(err, result) {
       
        console.log(JSON.stringify(result));
      });
    
    });
  });*/
  
  
  //connect to database
  db.open(config.SalesDatabase, function(err) {
	  if(err) {	  	
	    console.log("Sales Database connection failed");
	    console.log(err);
	  } else {
      WashDailyAggregateDb.open(config.WashDailyAggregateDatabase, function(err) {        
        if(err) {
          console.log("Wash daily aggregate Database connection failed");
	        console.log(err);
        } else {
          faultWashesDb.open(config.DeviceData1000, function(err) {        
            if(err) {
              console.log("Wash daily aggregate Database connection failed");
              console.log(err);
            } else {
                notifcationConfigsettings.open(config.NotificationConfig, function(err) {        
                  if(err) {
                    console.log("Wash daily aggregate Database connection failed");
                    console.log(err);
                  } else {
                      http.createServer(app).listen(serverPort, '0.0.0.0', function() {   
                      //getAllLatLong();          
                      console.log('Express server listening on port ' + serverPort);
                   });
                
                  }  
        });
                
          }  
        });
        }  
      });
	  }
  });
  
  
  // Start the server
  /*http.createServer(app).listen(serverPort, function () {
    
  });*/
});


var getAllLatLong = function(){
  require("./models/region_lat_long").getStateLocation("Washington", function(loc) {
   
  });
  
  require("./models/region_lat_long").getCityLocation("Florida", "Miami", function(loc) {
   
  });
};


