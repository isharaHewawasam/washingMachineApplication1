'use strict'

exports.sanitize = function(request) {
  if (request === undefined) return;
  
  var keys = [request.productAttrs, request.timescale, request.relative, request.region,
             request.income, request.age, request.family_members_count];
  var idx = 0;
  
  while (idx < keys.length) {
    if (sanitizeNode(keys[idx] === undefined) return;
    sanitizeNode(keys[idx]);
    idx++;
  }
};

var sanitizeNode = function(node) {
  if (node === undefined) return;
  
  for (var each_key in node) {
    if (node[each_key] instanceof Array) {
      sanitizeArray(node[each_key]);
    } else {
      //console.log("Not array " + JSON.stringify(each_key));
    }
  }
};

var sanitizeArray = function(array) {
  for (var idx in array) {
    //sanitizeKey([array][idx]);
    //console.log([array][idx]);
    if (array[idx].value == null || array[idx].value == "") {
      console.log("Deleting : " + array[idx]);
      delete array[idx];
    }
  }
};

var sanitizeKey = function(node, key){
  //if (node[key].value == null || node[key].value == "") delete node[key];
}