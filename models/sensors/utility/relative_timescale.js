'use strict'

exports.processResultForRelativeTimeScale = function processResultForRelativeTimeScale(relative, result) {
  var final_result = [];
  var key = null;
  
  for (var each_row in result) {
    var product = result[each_row].make + "-" + result[each_row].model;
    
    if (doesProductExists(product, final_result)) {
    
    } else {
      var record = {};
      record.product = product;
      record.avgUsage = [0, 0, 0, 0, 0, 0, 0];
      
      //split into day, month and year
      //var date_parts = (result[each_row].Date).split("/");
      
      //console.log("Date : " + result[each_row].Date);
      //console.log("Parts : " + JSON.stringify(date_parts));
      
      //var date = new Date(date_parts[2], date_parts[1], date_parts[0]);
      //date_partsj[0] = day
      
      //record.avgUsage[new Date(result[each_row].Date).getDay()] = result[each_row].avgUsage;
      record.avgUsage[new Date(result[each_row].Date).getMonth()] = result[each_row].avgUsage;
      //record.avgUsage[date.getDay()] = result[each_row].avgUsage;
      final_result.push(record);
    }
  }
  
  //console.log(JSON.stringify(final_result));
  return final_result;
}

function doesProductExists(product_name, buffer) {
  for(var each_row in buffer) {
    if (buffer[each_row].product == product_name) {
      return true;
    }
  }
  
  return false;
}


function setStartEndKeysFromRelativeTimeScale(relative, params) {
  if (relative.unit == "d") {
    console.log("hello");
    //start date
    var today = new Date();    
    var month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth();
    var day = today.getDate() < 10 ? "0" + (today.getDate() + 1) : today.getDate();    
    
    //params.end_key = [today.getFullYear() + "-" + month + "-" + day];
    
    params.end_key = [day + "/" + month + "/" + today.getFullYear()];
    
    //end date
    var relative_date = new Date();    
    relative_date.setDate(today.getDate() - relative.value);
    var month = relative_date.getMonth() < 10 ? "0" + (relative_date.getMonth() + 1) : relative_date.getMonth();
    var day = relative_date.getDate() < 10 ? "0" + (relative_date.getDate() + 1) : relative_date.getDate();    
    
    //params.start_key = [relative_date.getFullYear() + "-" + month + "-" + day];
    
    params.start_key = [day + "/" + month + "/" + relative_date.getFullYear()];
  }
}

exports.setStartEndKeysFromRelativeTimeScale = function setStartEndKeysFromRelativeTimeScale(relative, params) {
  if (relative.unit == "d") {
    //start date
    var today = new Date();    
    var month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth();
    var day = today.getDate() < 10 ? "0" + (today.getDate() + 1) : today.getDate();    
    
    params.end_key = [today.getFullYear() + "-" + month + "-" + day];
    
    //end date
    var relative_date = new Date();    
    relative_date.setDate(today.getDate() - relative.value);
    var month = relative_date.getMonth() < 10 ? "0" + (relative_date.getMonth() + 1) : relative_date.getMonth();
    var day = relative_date.getDate() < 10 ? "0" + (relative_date.getDate() + 1) : relative_date.getDate();    
    
    params.start_key = [relative_date.getFullYear() + "-" + month + "-" + day];
  }
}