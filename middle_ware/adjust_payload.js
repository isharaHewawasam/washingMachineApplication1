'use strict';

//add missing schema keys to payload
exports.setPayload = function(par_payload){
  //Product attributes
  par_payload.productAttrs = (par_payload.productAttrs === undefined) ? {} : par_payload.productAttrs;  
  par_payload.productAttrs.makes = (par_payload.productAttrs.makes == undefined) ? [] : par_payload.productAttrs.makes;
  par_payload.productAttrs.models = (par_payload.productAttrs.models == undefined) ? [] : par_payload.productAttrs.models;
  
  //time scale
  par_payload.timescale = (par_payload.timescale === undefined) ? {} : par_payload.timescale;  
  par_payload.timescale.years = (par_payload.timescale.years == undefined) ? [] : par_payload.timescale.years;
  par_payload.timescale.quarters = (par_payload.timescale.quarters == undefined) ? [] : par_payload.timescale.quarters;
  par_payload.timescale.months = (par_payload.timescale.months == undefined) ? [] : par_payload.timescale.months;
  
  //region
  par_payload.region = (par_payload.region === undefined) ? {} : par_payload.region;  
  par_payload.region.states = (par_payload.region.states === undefined) ? [] : par_payload.region.states;
  par_payload.region.cities = (par_payload.region.cities === undefined) ? [] : par_payload.region.cities;
  par_payload.region.zip_codes = (par_payload.region.zip_codes === undefined) ? [] : par_payload.region.zip_codes;
};