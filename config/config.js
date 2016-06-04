//Dont modify this file
//Copy this file as config and modify when deployed to new server and then start the app
//also dont chk modifed file in repo
module.exports = {
  "host": "washing-machines-api.mybluemix.net",
  "SalesDatabase": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	  "dbName": "erpsalesdata"
   },
   "WashDailyAggregateDatabase": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "washdatadailyaggregation"
   }   
};