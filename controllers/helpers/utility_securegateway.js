'use strict';

module.exports.sendResponse = function sendResponse(response, err, result) { 
  response.setHeader('Content-Type', 'application/json'); 
  
  if (err) { 
    console.log("Sending Failed Response.........................");
    response.statusCode = 404;      
    response.end(JSON.stringify(err || {}, null, 2));
  } else {    
    console.log("Sending Response");
    response.statusCode = 200;      
    response.end();
  }  
}