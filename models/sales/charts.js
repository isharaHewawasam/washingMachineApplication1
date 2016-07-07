'use strict';

var reportNames = { 
    "soldVsConnected": "soldVsConnected",
    "top3SellingModels": "top3SellingModels",
    "salesVolume": "salesVolume"
};

exports.reportNames = reportNames;

exports.charts = [
  {
    "id": reportNames.soldVsConnected,
    "name": "Sold Vs Connected",
    "description": "Sold Vs Connected",
    "chartTypes": ["Pie"]
  },
  {
    "id": reportNames.top3SellingModels,
    "name": "Top 3 selling models",
    "description": "Top 3 selling models",
    "chartTypes": ["Bar"]
  },
  {
    "id": reportNames.salesVolume,
    "name": "Sales Volumes",
    "description": "Sales Volume",
    "chartTypes": ["Multiline"]
  }
];