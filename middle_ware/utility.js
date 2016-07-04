var isParamValid = function(param, msg) {
  var isValid = !((param === undefined) ||
                 (param === null) ||
                 (param === "") 
                );
  
  if(!isValid) {
    console.log(msg);
  }    
  
  return isValid;
};

exports.isParamValid = isParamValid;

exports.isParamInvalid = function(param, msg) {
  return !(isParamValid(param, msg));  
};

