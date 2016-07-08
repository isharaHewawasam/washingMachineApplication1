'use strict';

exports.getData = function(payload, callback) {
  var response = [];
  var item = {};
  
  item.product = "Make 1 - Model A";
  item.likes = 145;
  item.dislikes = 22;
  item.totalComments = 200;
  response.push(item);
  
  item.product = "Make 1 - Model B";
  item.likes = 14;
  item.dislikes = 3;
  item.totalComments = 23;
  response.push(item);
  
  item.product = "Make 1 - Model C";
  item.likes = 47;
  item.dislikes = 10;
  item.totalComments = 66;
  response.push(item);
  
  callback(null, response);
  
};



