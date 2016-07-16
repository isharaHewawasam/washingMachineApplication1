//Dont modify this file
//Copy this file as config and modify when deployed to new server and then start the app
//also dont chk modifed file in repo
module.exports = {
  "host": "ibm-iot.mybluemix.net",
  "local_host": "localhost:3000",
  "cloud-host": "ibm-iot.mybluemix.net",
  "SalesDatabase": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	  "dbNameOld": "erpsalesdata",
    "dbName": "changeddataerp"
    
   },
   "WashDailyAggregateDatabase": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "changeddevicedata1000",
     "dbName_1lac": "devicedatanew",
     "dbName_1k": "newupdate1000data"
   },
   "RegionLatituesLongitudes": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "dbgeocode"
   },
   "DeviceData1000": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "washdatafailedwashes"
   },
   "NotificationConfig": {
     "provider": "Cloudant",
	   "host": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "port": 443,
	   "user": "b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix",
	   "Password": "e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4",
	   "url": "https://b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix:e0cddb23f5b90a6f590053fb3504e18dd3d6081354d53b6ec0a1c9afcc1054d4@b1611753-b3bf-47ce-95f7-0c67cc1a61a7-bluemix.cloudant.com",
	   "dbName": "notificationconfigdb"
   } 
};