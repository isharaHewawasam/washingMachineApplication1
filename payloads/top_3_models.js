var payload = {
  "productAttrs": {
    "makes": [],
    "models": [],
    "skus": [],
    "mfg_date": {
      "start_date":"",
      "end_date": ""
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
      "unit": "d",
      "value": 30
    }
  },
  "region": {
    "states": [],
  "cities": [],
    "zip_codes": []
  },
  "age": [],
  "family_members_count": [],
  "income": []
};

module.exports.payload = payload;