//Dont modify this file
//Copy this file as config and modify when deployed to new server and then start the app
//also dont chk modifed file in repo
module.exports = {
  "host": "ibm-iot.mybluemix.net",
  "local_host": "localhost:3000",
  "cloud-host": "ibm-iot.mybluemix.net",
  "SalesDatabase": {
     "provider": "Cloudant",
	   "host": "9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix.cloudant.com",
	   "port": 443,
	   "user": "9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix",
	   "Password":  "829646b74b4d31bb4719ff5de13cfd765db6750a567d526282a5a30263c57cd8",
	   "url": "https://9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix:829646b74b4d31bb4719ff5de13cfd765db6750a567d526282a5a30263c57cd8@9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix.cloudant.com",
	   "dbName": "erpsalesdata"
   },
   "WashDailyAggregateDatabase": {
     "provider": "Cloudant",
	   "host": "9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix.cloudant.com",
	   "port": 443,
	   "user": "9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix",
	   "Password": "829646b74b4d31bb4719ff5de13cfd765db6750a567d526282a5a30263c57cd8",
	   "url": "https://9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix:829646b74b4d31bb4719ff5de13cfd765db6750a567d526282a5a30263c57cd8@9aba8573-52a8-43f0-9b18-cab8a0b35343-bluemix.cloudant.com",
	   "dbName": "washdatadailyaggregation2",
     "dbName_1lac": "washdatadailyaggregation2",
     "dbName_1k": "washdatadailyaggregation2"
   },
   "RegionLatituesLongitudes": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "dbgeocode"
   }   
};