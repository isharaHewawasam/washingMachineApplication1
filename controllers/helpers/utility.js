'use strict';

module.exports.sendResponse = function sendResponse(response, err, result) { 
  response.setHeader('Content-Type', 'text/plain'); 
  
  if (err) { 
    response.statusCode = 404;      
    response.end(JSON.stringify(err || {}, null, 2));
  } else {    
    response.statusCode = 200;      
    response.end(JSON.stringify(result || {}, null, 2));
  }  
}