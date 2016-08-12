//Dont modify this file
//Copy this file as config and modify when deployed to new server and then start the app
//also dont chk modifed file in repo
module.exports = {
  "host": "ibm-iot.mybluemix.net",
  "local_host": "localhost:3000",
  "cloud-host": "ibm-iot.mybluemix.net",
  "SalesDatabase": {
     "provider": "Cloudant",
     "host": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "port": 443,
     "user": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix",
     "Password": "70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c",
     "url": "https://23b3f093-46be-46a3-ac08-0b760b233787-bluemix:70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c@23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
	 "dbNameOld": "erpsalesdata",
     "dbName": "erpsaleswithstatecode_qa"
   },
   
   "WashDailyAggregateDatabase": {
     "provider": "Cloudant",
     "host": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "port": 443,
     "user": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix",
     "Password": "70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c",
     "url": "https://23b3f093-46be-46a3-ac08-0b760b233787-bluemix:70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c@23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "dbName":"devicedata_v1_qa",
     "dbName_1000": "changeddevicedata1000",
     "dbName_1lac": "devicedatanew",
     "dbName_1k": "newupdate1000data"
   },
   "RegionLatituesLongitudes": {
     "provider": "Cloudant",
     "host": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "port": 443,
     "user": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix",
     "Password": "70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c",
     "url": "https://23b3f093-46be-46a3-ac08-0b760b233787-bluemix:70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c@23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
	 "dbName": "dbgeocode_qa"
   },
   "DeviceData1000": {
     "provider": "Cloudant",
     "host": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "port": 443,
     "user": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix",
     "Password": "70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c",
     "url": "https://23b3f093-46be-46a3-ac08-0b760b233787-bluemix:70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c@23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
	 "dbName": "washdatafailedwashes_qa"
   },
   "NotificationConfig": {
     "provider": "Cloudant",
     "host": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
     "port": 443,
     "user": "23b3f093-46be-46a3-ac08-0b760b233787-bluemix",
     "Password": "70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c",
     "url": "https://23b3f093-46be-46a3-ac08-0b760b233787-bluemix:70bd627ec1408f506068735bc3c0e98830034981a8b19899cb8640f35dd9813c@23b3f093-46be-46a3-ac08-0b760b233787-bluemix.cloudant.com",
	 "dbName": "notificationconfigdb_qa"
   } 
};