var payload = {
  "productAttrs": {
    "makes": [],
    "models": [],
    "skus": [],
    "mfg_date": {
      "start_date": "string",
      "end_date": "string"
    }
  },
  "timescale": {
  "years": [],
    "quarters": [],
    "months": [],
    "date": {
      "start_date": "string",
      "end_date": "string"
    },
    "relative": {
      "unit": "string",
      "value": 0
    }
  },
  "region": {
    "states": [{"value": "arizona"}],
  "cities": [{"value": "chandler"}],
    "zip_codes": [{"value": 85226}]
  }
};

module.exports.payload = payload;