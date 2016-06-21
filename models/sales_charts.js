'use strict';

var chartIds = { 
    "connectedVsSold": "connectedVsSold",
    "top3SellingModels": "top3SellingModels"
};

exports.chartIds = chartIds;

exports.charts = [
  {
    "id": chartIds.connectedVsSold,
    "name": "Connected Vs Sold",
    "description": "Connect Vs Sold",
    "chartTypes": ["Pie"]
  },
  {
    "id": chartIds.top3SellingModels,
    "name": "Top 3 selling models",
    "description": "Top 3 selling models",
    "chartTypes": ["Multi Line", "Bar"]
  }
];